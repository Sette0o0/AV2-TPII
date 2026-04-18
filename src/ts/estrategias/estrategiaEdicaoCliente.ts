import IEstrategiaCliente from "../interfaces/estrategiaCliente";
import Armazem from "../dominio/armazem";
import Entrada from "../io/entrada";
import Cliente from "../modelos/cliente";
import Endereco from "../modelos/endereco";

export default class EstrategiaEdicaoCliente implements IEstrategiaCliente {
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

        let indice = this.entrada.receberNumero('Selecione o número do cliente a editar:') - 1

        if (indice < 0 || indice >= clientes.length) {
            console.log('Opção inválida.')
            return
        }

        let cliente = clientes[indice]
        console.log(`\nEditando cliente: ${cliente.Nome}`)
        console.log('Deixe em branco para manter o valor atual.')

        let nome = this.entrada.receberTexto(`Nome atual (${cliente.Nome}), novo nome:`)
        let nomeSocial = this.entrada.receberTexto(`Nome social atual (${cliente.NomeSocial}), novo nome social:`)

        if (nome && nome.trim() !== '') cliente.Nome = nome
        if (nomeSocial && nomeSocial.trim() !== '') cliente.NomeSocial = nomeSocial

        console.log('\nDeseja atualizar o endereço? (1 - Sim / 0 - Não)')
        let atualizarEndereco = this.entrada.receberNumero('Opção:')

        if (atualizarEndereco === 1) {
            let rua = this.entrada.receberTexto('Nova rua:')
            let bairro = this.entrada.receberTexto('Novo bairro:')
            let cidade = this.entrada.receberTexto('Nova cidade:')
            let estado = this.entrada.receberTexto('Novo estado:')
            let pais = this.entrada.receberTexto('Novo país:')
            let codigoPostal = this.entrada.receberTexto('Novo código postal:')
            cliente.Endereco = new Endereco(rua, bairro, cidade, estado, pais, codigoPostal)
        }

        console.log('Cliente atualizado com sucesso!')
    }
}
