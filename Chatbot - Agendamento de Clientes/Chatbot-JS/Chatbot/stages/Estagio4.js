const Chatbot = require("../chatbot");
const Estagio2 = require("./Estagio2");
const Cliente = require("../Cliente/Cliente");
const Salao = require("../Banco de Dados - EXCEL/Estabelicimento");



class Estagio4 {
    constructor(Chatbot, Estagio2) {
        this.chatbot = Chatbot;
        this.estagio2 = Estagio2;
    }



    mostrarServicosLista(message) {

        //TODO LER O EXCELK E ORGANIAR OS DADOS EM UM ARRAY DE OBJETOS

        let itens_lista_wpp = [{
            title: "==> Aqui esta os nossos serviços <==",
            rows:

                //TODO PEGAR OS DADOS DO ARQUIVO JSON E COLOCAR NA LISTA ---> UMA CATEGORIA TEM VARIOS SERVIÇOS!
                [{ title: "Corte de Cabelo", description: "SERVIÇO 1, SERVIÇO2..." },
                { title: "Fazer as Unhas", description: "SERVIÇO 1, SERVIÇO2..." },
                { title: "Maquiagem", description: "SERVIÇO 1, SERVIÇO2..." }
                ]
        }]

        return this.enviarLista(message, "Escolha umas opções abaixo", "Agendar um Serviço", itens_lista_wpp)
    }

    //! MÉTODOS PARA SER IMPLEMENTADOS NO FUTURO
    enviarListaBebidas(message, array) {

        //Pega as bebidas do cardapio
        const bebidas_array = []

        // Percorre todas as bebidas e adiciona a lista
        array.forEach(bebida => {
            bebidas_array.push({ title: bebida.nome, description: `R$ ${bebida.preco}` });
        });

        // Guarda o array para colocar dentro da lista do wpp para enviar para o usuario
        let itens_lista_wpp = [{
            title: "==> ESCOLHA AS BEBIDAS MAIS CARAS", rows: bebidas_array
        }]

        //Envia a Lista formatada
        return this.chatbot.enviarLista(message, `Escolha os itens do seu pedido`, "Escolher Bebidas", itens_lista_wpp)

    }

    enviarListaSalgados(message, array) {

        const salgados_array = []

        // Percorre todas as bebidas e adiciona a lista
        array.forEach(salgado => {
            salgados_array.push({ title: salgado.nome, description: `R$ ${salgado.preco}` });
        })

        // Guarda o array para colocar dentro da lista do wpp
        let itens_lista_wpp = [{
            title: "==> ESCOLHA os Salgados MAIS CAROS ", rows: salgados_array
        }]

        return this.chatbot.enviarLista(message, `Escolha os itens do seu pedido`, "ESCOLHER SALGADOS", itens_lista_wpp)
    }

    enviarListaSanduiches(message, array) {

        const sanduiche_array = []

        // Percorre todas as bebidas e adiciona a lista
        array.forEach(sanduiche => {
            sanduiche_array.push({ title: sanduiche.nome, description: `R$ ${sanduiche.preco}` })
        })

        // Guarda o array para colocar dentro da lista do wpp
        let itens_lista_wpp = [{
            title: "==> ESCOLHA os Sanduíches MAIS CAROS ", rows: sanduiche_array
        }]
        return this.chatbot.enviarLista(message, `Escolha os itens do seu pedido`, "ESCOLHER SANDUICHES", itens_lista_wpp)
    }


}

module.exports = Estagio4