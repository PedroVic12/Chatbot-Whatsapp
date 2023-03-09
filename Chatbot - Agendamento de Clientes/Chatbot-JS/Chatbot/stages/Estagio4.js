const Chatbot = require("../chatbot");
const Estagio2 = require("./Estagio2");
const Cliente = require("../Cliente/Cliente");
const Estabelicimento = require("../Banco de Dados - EXCEL/Estabelicimento");
const ServicoCliente = require("../Banco de Dados - EXCEL/Servicos_Cliente");


class Estagio4 {
    constructor(Chatbot) {
        this.chatbot = Chatbot;
    }



    async pegarDadosServico(_categoriaEscolhida) {
        const caminhoPlanilha = '/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Agendamento de Clientes/Chatbot-JS/Chatbot/Banco de Dados - EXCEL/Base de Dados Produtos/servicos-salao.xlsx';
        const salaoDeBeleza = new Estabelicimento();
        await salaoDeBeleza.carregarServicos(caminhoPlanilha);
        salaoDeBeleza.nome_servico = _categoriaEscolhida;

        // Itera sobre as categorias de serviços
        for (const categoria in salaoDeBeleza.servicosPorCategoria) {
            if (categoria === _categoriaEscolhida) {
                // Itera sobre os serviços associados a cada categoria
                const servicos = salaoDeBeleza.servicosPorCategoria[categoria];
                for (const servico of servicos) {
                    console.log(`- ${servico.nome} (R$ ${servico.preco} reais)`);
                    return { nome: servico.nome, preco: servico.preco };
                }
            }
        }

    }


    enviarListaServicoEscolhido(message, objetoServicoEscolhido) {
        const servicos = JSON.parse(objetoServicoEscolhido);


        const itensListaWpp = [{
            title: "==> Aqui estão nossos serviços <==",
            rows: []
        }];

        servicos.forEach(servico => {
            itensListaWpp[0].rows.push({
                title: servico.nome,
                description: `Preço: R$ ${servico.preco} reais`
            });
        });

        return this.chatbot.enviarLista(message, "Escolha uma opção abaixo", "Serviços disponíveis", itensListaWpp);
    }







}

module.exports = Estagio4