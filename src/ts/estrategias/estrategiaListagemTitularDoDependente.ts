import IEstrategiaCliente from "../interfaces/estrategiaCliente";
import Armazem from "../dominio/armazem";
import ImpressaorCliente from "../impressores/impressorCliente";
import Entrada from "../io/entrada";

export default class EstrategiaListagemTitularDoDependente implements IEstrategiaCliente {
    private entrada = new Entrada()

    executar(): void {
        let armazem = Armazem.InstanciaUnica
        let dependentes = armazem.Clientes.filter(c => c.Titular !== undefined)

        if (dependentes.length === 0) {
            console.log('Nenhum dependente cadastrado.')
            return
        }

        console.log('\nDependentes disponíveis:')
        dependentes.forEach((d, i) => {
            console.log(`| ${i + 1} - ${d.Nome} (Dependente de ${d.Titular!.Nome})`)
        })

        let indice = this.entrada.receberNumero('Selecione o número do dependente:') - 1

        if (indice < 0 || indice >= dependentes.length) {
            console.log('Opção inválida.')
            return
        }

        let dependente = dependentes[indice]
        let titular = dependente.Titular!

        console.log(`\nTitular do dependente ${dependente.Nome}:`)
        console.log('----------------------------')
        let impressor = new ImpressaorCliente(titular)
        console.log(impressor.imprimir())
    }
}
