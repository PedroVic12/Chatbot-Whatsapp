const { Client } = require('whatsapp-web.js');

const client = new Client();

const inicializarCliente = () => {
    return new Promise((resolve, reject) => {
        client.on('qr', qr => {
            console.log('Gerando QR code...');
            qrcode.generate(qr, { small: true });
        });

        client.on('ready', () => {
            console.log('Cliente pronto!');
            resolve();
        });

        client.initialize();
    });
};

const enviarMensagem = (destinatario, mensagem) => {
    return new Promise((resolve, reject) => {
        client.sendMessage(destinatário, mensagem)
            .then(() => {
                console.log(`Mensagem enviada para ${destinatário}: ${mensagem}`);
                resolve();
            })
            .catch(error => {
                console.error(`Erro ao enviar mensagem para ${destinatário}: ${error}`);
                reject(error);
            });
    });
};

const boasVindas = destinatario => {
    const mensagem = 'Bem-vindo à Citta Lanchonete! Obrigado por escolher a gente.';
    return enviarMensagem(destinatario, mensagem);
};

const pedirNome = destinatario => {
    const mensagem = 'Antes de começarmos, por favor, diga-me o seu nome:';
    return enviarMensagem(destinatario, mensagem);
};

const obterNome = (destinatario, mensagem) => {
    const nome = mensagem.body;
    return nome;
};

const criarCardapio = () => {
    return
}