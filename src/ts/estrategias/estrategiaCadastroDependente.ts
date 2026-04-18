import IEstrategiaCliente from "../interfaces/estrategiaCliente";
import Armazem from "../dominio/armazem";
import Entrada from "../io/entrada";
import Cliente from "../modelos/cliente";
import CadastrarDocumentosCliente from "../processos/cadastrarDocumentosCliente";
import CadastroEnderecoTitular from "../processos/cadastroEnderecoTitular";

export default class EstrategiaCadastroDependente implements IEstrategiaCliente {
    private entrada = new Entrada()

    executar(): void {
        let armazem = Armazem.InstanciaUnica
        let titulares = armazem.Clientes.filter(c => c.Titular === undefined)

        if (titulares.length === 0) {
            console.log('Nenhum titular cadastrado. Cadastre um titular primeiro.')
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

        console.log(`\nCadastrando dependente para o titular: ${titular.Nome}`)
        let nome = this.entrada.receberTexto('Qual o nome do dependente?')
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do dependente?')
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento?')
        let dependente = new Cliente(nome, nomeSocial, dataNascimento)
        dependente.Titular = titular

        let enderecoProcesso = new CadastroEnderecoTitular(dependente)
        enderecoProcesso.processar()

        let documentosProcesso = new CadastrarDocumentosCliente(dependente)
        documentosProcesso.processar()

        titular.Dependentes.push(dependente)
        armazem.Clientes.push(dependente)
        console.log('Dependente cadastrado com sucesso!')
    }
}
