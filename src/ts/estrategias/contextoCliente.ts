import IEstrategiaCliente from "../interfaces/estrategiaCliente";
import Cliente from "../modelos/cliente";

export default class ContextoCliente {
    private estrategia: IEstrategiaCliente

    constructor(estrategia: IEstrategiaCliente) {
        this.estrategia = estrategia
    }

    public definirEstrategia(estrategia: IEstrategiaCliente): void {
        this.estrategia = estrategia
    }

    public executar(cliente?: Cliente): void {
        this.estrategia.executar(cliente)
    }
}
