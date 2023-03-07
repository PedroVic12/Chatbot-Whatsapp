const stageMap = new Map();

function iniciaConversa(message) {
    const phoneNumber = message.from.split('@')[0];
    if (!stageMap.has(phoneNumber)) {
        stageMap.set(phoneNumber, 1);
        estagio1.boasVindas(message);
    }
}

chatbot.whatsapp.on('message', message => {
    chatbot.armazenarConversa(message);
    const flag_impressora = false;
    iniciaConversa(message); // chama a função iniciaConversa
    const numero_estagio = stageMap.get(message.from.split('@')[0]);

    if (numero_estagio === 1) {
        estagio1.boasVindas(message);
        chatbot.avancarEstagio();
    }
});



/**
 * 
Com isso, toda vez que um número enviar uma mensagem, a função iniciaConversa será chamada para 
verificar se o número já tem um estágio definido. Se não tiver, o estágio será definido como 1
 e a mensagem de boas-vindas será enviada. Em seguida, no evento listener, é verificado 
 se o estágio é 1, e se for, a mensagem de boas-vindas será enviada novamente e o estágio
 será avançado para o próximo.
 * 
**/

