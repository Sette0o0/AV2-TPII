import IEstrategiaCliente from "../interfaces/estrategiaCliente";
import Armazem from "../dominio/armazem";
import Entrada from "../io/entrada";
import Cliente from "../modelos/cliente";
import Endereco from "../modelos/endereco";
import CadastrarDocumentosCliente from "../processos/cadastrarDocumentosCliente";
import CadastroEnderecoTitular from "../processos/cadastroEnderecoTitular";

export default class EstrategiaCadastroTitular implements IEstrategiaCliente {
    private entrada = new Entrada()

    executar(): void {
        console.log('Iniciando o cadastro de um novo cliente titular...')
        let nome = this.entrada.receberTexto('Qual o nome do novo cliente?')
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo cliente?')
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento?')
        let cliente = new Cliente(nome, nomeSocial, dataNascimento)

        let enderecoProcesso = new CadastroEnderecoTitular(cliente)
        enderecoProcesso.processar()

        let documentosProcesso = new CadastrarDocumentosCliente(cliente)
        documentosProcesso.processar()

        Armazem.InstanciaUnica.Clientes.push(cliente)
        console.log('Cliente titular cadastrado com sucesso!')
    }
}
