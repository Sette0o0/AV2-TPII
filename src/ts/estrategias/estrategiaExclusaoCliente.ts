import IEstrategiaCliente from "../interfaces/estrategiaCliente";
import Armazem from "../dominio/armazem";
import Entrada from "../io/entrada";

export default class EstrategiaExclusaoCliente implements IEstrategiaCliente {
    private entrada = new Entrada()

    executar(): void {
        let armazem = Armazem.InstanciaUnica
        let clientes = armazem.Clientes

        if (clientes.length === 0) {
            console.log('Nenhum cliente cadastrado.')
            return
        }

        console.log('\nClientes cadastrados:')
        clientes.forEach((c, i) => {
            let tipo = c.Titular === undefined ? 'Titular' : `Dependente de ${c.Titular.Nome}`
            console.log(`| ${i + 1} - ${c.Nome} (${tipo})`)
        })

        let indice = this.entrada.receberNumero('Selecione o número do cliente a excluir:') - 1

        if (indice < 0 || indice >= clientes.length) {
            console.log('Opção inválida.')
            return
        }

        let cliente = clientes[indice]

        // Se for titular, remove também os dependentes da lista geral
        if (cliente.Titular === undefined && cliente.Dependentes.length > 0) {
            console.log(`Atenção: o titular ${cliente.Nome} possui ${cliente.Dependentes.length} dependente(s).`)
            console.log('Todos os dependentes também serão excluídos.')
            console.log('Confirma a exclusão? (1 - Sim / 0 - Não)')
            let confirma = this.entrada.receberNumero('Opção:')
            if (confirma !== 1) {
                console.log('Exclusão cancelada.')
                return
            }

            // Remove dependentes da lista geral
            cliente.Dependentes.forEach(dep => {
                let depIdx = armazem.Clientes.indexOf(dep)
                if (depIdx !== -1) armazem.Clientes.splice(depIdx, 1)
            })
        }

        // Se for dependente, remove da lista de dependentes do titular
        if (cliente.Titular !== undefined) {
            let depIdx = cliente.Titular.Dependentes.indexOf(cliente)
            if (depIdx !== -1) cliente.Titular.Dependentes.splice(depIdx, 1)
        }

        armazem.Clientes.splice(indice, 1)
        console.log(`Cliente ${cliente.Nome} excluído com sucesso!`)
    }
}
