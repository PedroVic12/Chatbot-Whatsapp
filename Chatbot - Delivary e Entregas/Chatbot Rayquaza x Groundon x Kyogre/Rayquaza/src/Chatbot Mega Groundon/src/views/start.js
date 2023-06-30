//! Funções dentro do GroundonView
start() {
    this.whatsapp.onMessage(async (message) => {

        //! MensagemLog -> Controller()
        // Verifica se o usuário já está online


        // Lógica para processar a mensagem recebida
        const robo_groundon = new Groundon()
        robo_groundon.armazenarConversa(message)


        //! Stages
        const numero_estagio = this.getCurrentStage();

        if (numero_estagio === 1) {
            this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);

            this.enviarMensagem(message, 'Bem vindo ao Venom 🕷, homem aranha!')
            console.log('\nEstágio 1:', message.body);


            this.pushStage(2); // Avança para o próximo estágio



        } else if (numero_estagio === 2) {
            this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);

            //! Lógica para o Estágio 2
            console.log('\nEstágio 2:', message.body);
            this.mostrarComidasLista(message)


            async function testeSendList() {
                try {
                    const minha_lista = [
                        {
                            title: "Pasta",
                            rows: [
                                {
                                    title: "Ravioli Lasagna",
                                    description: "Made with layers of frozen cheese",
                                }
                            ]
                        },
                        {
                            title: "Dessert",
                            rows: [
                                {
                                    title: "Baked Ricotta Cake",
                                    description: "Sweets pecan baklava rolls",
                                },
                                {
                                    title: "Lemon Meringue Pie",
                                    description: "Pastry filled with lemonand meringue.",
                                }
                            ]
                        }
                    ];

                    await this.enviarLista(
                        message.from,
                        'menuTitle',
                        'menuSubTitle',
                        'menuDescription',
                        'menuId',
                        minha_lista
                    );

                } catch (error) {
                    this.enviarMensagem(message, 'Nao foi possível enviar a lista')
                }

            }


            this.pushStage(3);
        } else if (numero_estagio === 3) {
            this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);

            //! Lógica para o Estágio 3

            // Parâmetros da lista que você deseja enviar
            const to = message.from; // Número de telefone do destinatário
            const title = 'Título da lista';
            const subTitle = 'Subtítulo da lista';
            const description = 'Descrição da lista';
            const menu = 'Menu da lista';
            const option1 = 'Opção 1';
            const titulo1 = 'Título 1';
            const descricao1 = 'Descrição 1';
            const option2 = 'Opção 2';
            const titulo2 = 'Título 2';
            const descricao2 = 'Descrição 2';

            // Montar o objeto com os parâmetros da lista
            const listParams = {
                to,
                title,
                subTitle,
                description,
                menu,
                option1,
                titulo1,
                descricao1,
                option2,
                titulo2,
                descricao2
            };

            // Fazer a requisição ao servidor backend
            axios.post('http://localhost:4000/send-lists', listParams)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('\n\nErro ao enviar a lista no evento Listener:', error);
                });




            this.pushStage(4);
        } else if (numero_estagio === 4) {
            this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);

            const buttons = [
                {
                    buttonText: {
                        displayText: 'Texto do Botão 1'
                    }
                },
                {
                    buttonText: {
                        displayText: 'Texto do Botão 2'
                    }
                }
            ];

            await this.enviarBotoes(message.from, 'title', buttons, 'Selecione uma opção:');



            this.pushStage(5);
        }

        else if (numero_estagio === 5) {
            this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);
            this.popStage(); // Retorna ao estágio anterior
        }
    });
}


StartVenomBot() {
    this.whatsapp.onMessage((message) => {
        if (message.body === 'Hi' && message.isGroupMsg === false) {
            this.whatsapp
                .sendText(message.from, 'Bem vindo ao Venom 🕷, homem aranha!')
                .then((result) => {
                    console.log('Result: ', result); //return object success
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                });
        }
    });
}
