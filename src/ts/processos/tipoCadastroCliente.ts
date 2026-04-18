import Processo from "../abstracoes/processo";
import ContextoCliente from "../estrategias/contextoCliente";
import EstrategiaCadastroDependente from "../estrategias/estrategiaCadastroDependente";
import EstrategiaCadastroTitular from "../estrategias/estrategiaCadastroTitular";
import MenuTipoCadastroCliente from "../menus/menuTipoCadastroCliente";

export default class TipoCadastroCliente extends Processo {
    constructor() {
        super()
        this.menu = new MenuTipoCadastroCliente()
    }
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual opção desejada?')

        let contexto: ContextoCliente

        switch (this.opcao) {
            case 1:
                contexto = new ContextoCliente(new EstrategiaCadastroTitular())
                contexto.executar()
                break
            case 2:
                contexto = new ContextoCliente(new EstrategiaCadastroDependente())
                contexto.executar()
                break
            default:
                console.log('Opção não entendida :(')
        }
    }
}
