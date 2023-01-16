//comandos Bot
            if (message.body === '!ping') {
                this.whatsapp.sendMessage(message.from, 'pong');
            }

            //teste
            if (message.body === 'botão') {

                let button = new Buttons('Button body', [
                    { body: 'bt1' },
                    { body: 'bt2' },
                    { body: 'bt3' }
                ], 'title', 'footer');

                this.whatsapp.sendMessage(message.from, button)
            }
