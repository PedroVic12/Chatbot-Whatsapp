const Excel = require('exceljs');
const Estabelicimento = require('./Estabelicimento');


class ServicoCliente {
    constructor(nome_servico) {
        this.nome_servico = nome_servico;
    }

    get getNomeServico() {
        return this.nome_servico;
    }


    async getServicosPreco(_categoriaEscolhida) {
        const caminhoPlanilha = '/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Agendamento de Clientes/Chatbot-JS/Chatbot/Banco de Dados - EXCEL/Base de Dados Produtos/servicos-salao.xlsx';
        const salaoDeBeleza = new Estabelicimento();
        await salaoDeBeleza.carregarServicos(caminhoPlanilha);


        this.nome_servico = _categoriaEscolhida;

        // Itera sobre as categorias de serviços
        for (const categoria in salaoDeBeleza.servicosPorCategoria) {

            if (categoria === _categoriaEscolhida) {

                this.nome_servico = categoria;

                console.log(`\nCategoria escolhida: ${categoria}`);

                // Itera sobre os serviços associados a cada categoria
                const servicos = salaoDeBeleza.servicosPorCategoria[categoria];
                for (const servico of servicos) {


                    console.log(`- ${servico.nome} (R$ ${servico.preco} reais)`);

                }
            }
        }
    }


    async pegarDadosServico(_categoriaEscolhida) {
        const caminhoPlanilha = '/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Agendamento de Clientes/Chatbot-JS/Chatbot/Banco de Dados - EXCEL/Base de Dados Produtos/servicos-salao.xlsx';
        const salaoDeBeleza = new Estabelicimento();
        await salaoDeBeleza.carregarServicos(caminhoPlanilha);
        salaoDeBeleza.nome_servico = _categoriaEscolhida;

        const servicosEncontrados = [];

        // Itera sobre as categorias de serviços
        for (const categoria in salaoDeBeleza.servicosPorCategoria) {
            if (categoria === _categoriaEscolhida) {
                // Itera sobre os serviços associados a cada categoria
                const servicos = salaoDeBeleza.servicosPorCategoria[categoria];
                for (const servico of servicos) {
                    console.log(`- ${servico.nome} (R$ ${servico.preco} reais)`);
                    servicosEncontrados.push({ nome: servico.nome, preco: servico.preco });
                }
            }
        }

        return servicosEncontrados;
    }



}


async function main() {
    const cabeloServices = new ServicoCliente();

    const escolha_cliente = 'Cabelo'

    const teste_objeto = await cabeloServices.pegarDadosServico(escolha_cliente);
    console.log(teste_objeto);
}

//main();

module.exports = ServicoCliente;