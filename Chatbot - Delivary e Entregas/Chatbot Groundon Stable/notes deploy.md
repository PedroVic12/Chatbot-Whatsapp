# Deploy Do servidor na AWS

## Rodar o docker no linux

1) Start docker no linux

    `systemctl start docker`

2) Construindo o container com o nome como ultimo parâmetro

    `sudo docker build -t chatbot-wpp .`

3) Mandando rodar no localhost

    `sudo docker run -p 8888:3000 chatbot-wpp`

## Deploy Container AWS

- Login no AWS -> <https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html#cliv2-linux-install>

    `aws ecr get-login-password --region sa-east-1 | docker login --username Pedro Victor --password-stdin 156019514687.dkr.ecr.sa-east-1.amazonaws.com`
