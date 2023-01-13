//!Importações
const Bot_Groundon = require("./__init__");
const Cliente = require("./Chatbot/Cliente/Cliente")
let chatbot = new Bot_Groundon


//! Estágio 1
chatbot.conectandoWpp()
if (!chatbot.pedido_iniciado) {
    chatbot.boasVindas()
}
chatbot.recebeMensagem()
//Todos os Metodos estão no Menu Principal, necessário modular
chatbot.menu_principal()


//! Estágio 2
console.log("Pedido iniciado = ", chatbot.pedido_iniciado)
chatbot.fazerPedido()
chatbot.adicionaCarrinho('Hambúrguer', 10.99)
// await chatbot.confirmarPedido()


//! Estágio 3
//chatbot.ProcessaPedido()
//chatbot.enviaPedido()
//chatbot.notaFiscal()



