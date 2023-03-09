function iniciaConversaClinte(message) {
    const phoneNumber = message.from.split('@')[0];
    const numero_estagios = 10
    const currentStage = stageMap.get(phoneNumber) || 0;
    if (currentStage === 0 || !stageMap.has(phoneNumber)) {
        stageMap.set(phoneNumber, 1);
        estagio1.boasVindas(message);
    } else if (currentStage < numero_estagios) {
        chatbot.avancarEstagio();
        estagios[currentStage](message);
    }
}