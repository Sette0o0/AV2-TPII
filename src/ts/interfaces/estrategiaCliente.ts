import Cliente from "../modelos/cliente";

export default interface IEstrategiaCliente {
    executar(cliente?: Cliente): void
}
