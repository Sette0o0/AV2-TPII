import IEstrategiaCliente from "../interfaces/estrategiaCliente";
import Armazem from "../dominio/armazem";
import ImpressaorCliente from "../impressores/impressorCliente";
import Entrada from "../io/entrada";

export default class EstrategiaListagemDependentes implements IEstrategiaCliente {
    private entrada = new Entrada()

    executar(): void {
        let armazem = Armazem.InstanciaUnica
        let titulares = armazem.Clientes.filter(c => c.Titular === undefined)

        if (titulares.length === 0) {
            console.log('Nenhum titular cadastrado.')
            return
        }

        console.log('\nTitulares disponíveis:')
        titulares.forEach((t, i) => {
            console.log(`| ${i + 1} - ${t.Nome}`)
        })

        let indice = this.entrada.receberNumero('Selecione o número do titular:') - 1

        if (indice < 0 || indice >= titulares.length) {
            console.log('Opção inválida.')
            return
        }

        let titular = titulares[indice]

        console.log(`\nDependentes do titular: ${titular.Nome}`)
        console.log('----------------------------')

        if (titular.Dependentes.length === 0) {
            console.log('Este titular não possui dependentes.')
            return
        }

        titular.Dependentes.forEach(dep => {
            let impressor = new ImpressaorCliente(dep)
            console.log(impressor.imprimir())
        })
    }
}
