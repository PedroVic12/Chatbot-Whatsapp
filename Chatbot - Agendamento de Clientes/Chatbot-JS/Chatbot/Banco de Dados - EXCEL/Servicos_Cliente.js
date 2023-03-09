const Excel = require('exceljs');
const Estabelicimento = require('./Estabelicimento');
const Servico = require('./Servico')

class ServicoCliente {
    constructor(nome_servico) {
        this.nome_servico = nome_servico;
        this.preco_servico = null;
    }

    get getNomeServico() {
        return this.nome_servico;
    }

    getPedidoServiceByName(nomeServico, array_obj_service) {
        const servico = array_obj_service.find(servico => servico.nome === nomeServico);

        if (servico) {
            return { nome: servico.nome, preco: servico.preco };
        } else {
            return null;
        }
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


    async carregarPlanilhaServicos(_categoriaEscolhida) {
        const caminhoPlanilhaServicos = '/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Agendamento de Clientes/Chatbot-JS/Chatbot/Banco de Dados - EXCEL/Base de Dados Produtos/servicos-salao.xlsx';
        const salaoDeBeleza = new Estabelicimento();
        await salaoDeBeleza.carregarServicos(caminhoPlanilhaServicos);
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
    const databaseServices = new ServicoCliente();

    //Cliente escolhe o Serviço
    const escolha_cliente = 'Cabelo'
    const categoriaEscolhidaObject = await databaseServices.carregarPlanilhaServicos(escolha_cliente); // Vai carregar toda planilha!
    console.log(categoriaEscolhidaObject);

    //Cliente escolhe o Trabalho e a gente pega o preço correspondente
    const servicoEscolhaCliente = 'Corte de Cabelo'
    const pedido = databaseServices.getPedidoServiceByName(servicoEscolhaCliente, categoriaEscolhidaObject)
    console.log(`\nPedido do Cliente --> ${pedido.nome} | ${pedido.preco} Reais`)
}

//main();

module.exports = ServicoCliente;