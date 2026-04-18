import Processo from "../abstracoes/processo";
import ContextoCliente from "../estrategias/contextoCliente";
import EstrategiaListagemDependentes from "../estrategias/estrategiaListagemDependentes";
import EstrategiaListagemTitularDoDependente from "../estrategias/estrategiaListagemTitularDoDependente";
import EstrategiaListagemTitulares from "../estrategias/estrategiaListagemTitulares";
import MenuTipoListagemClientes from "../menus/menuTipoListagemClientes";

export default class TipoListagemClientes extends Processo {
    constructor() {
        super()
        this.menu = new MenuTipoListagemClientes()
    }

    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual a opção desejada?')

        let contexto: ContextoCliente

        switch (this.opcao) {
            case 1:
                contexto = new ContextoCliente(new EstrategiaListagemTitulares())
                contexto.executar()
                break
            case 2:
                contexto = new ContextoCliente(new EstrategiaListagemDependentes())
                contexto.executar()
                break
            case 3:
                contexto = new ContextoCliente(new EstrategiaListagemTitularDoDependente())
                contexto.executar()
                break
            default:
                console.log('Opção não entendida... :(')
        }
    }
}
