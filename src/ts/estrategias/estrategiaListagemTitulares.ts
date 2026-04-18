import IEstrategiaCliente from "../interfaces/estrategiaCliente";
import Armazem from "../dominio/armazem";
import ImpressaorCliente from "../impressores/impressorCliente";

export default class EstrategiaListagemTitulares implements IEstrategiaCliente {
    executar(): void {
        let armazem = Armazem.InstanciaUnica
        let titulares = armazem.Clientes.filter(c => c.Titular === undefined)

        console.log('\nListagem de todos os clientes titulares:')
        console.log('----------------------------')

        if (titulares.length === 0) {
            console.log('Nenhum titular cadastrado.')
            return
        }

        titulares.forEach(titular => {
            let impressor = new ImpressaorCliente(titular)
            console.log(impressor.imprimir())
        })
    }
}
