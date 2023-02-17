# Use uma imagem base
FROM ubuntu:20.04

# Definir variáveis de ambiente
ENV DEBIAN_FRONTEND noninteractive

# Atualizando o servidor
RUN apt-get update && apt-get upgrade -y

# instala o NodeJs mais recente
RUN apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_19.x | bash -
RUN apt-get install -y nodejs 
RUN apt-get install -y libglib2.0-0


#! instala o npm
RUN apt-get update && apt-get install -y npm tzdata
RUN npm install

#! instala o Puppeteer
RUN apt-get install -y libgbm1
RUN npm install puppeteer


# Copie os arquivos do seu projeto para o diretório de trabalho
COPY . .

# Adicione o script como um comando
COPY start.sh .
USER root
RUN chmod +x start.sh

# Defina a porta na qual a aplicação será executada
EXPOSE 7000

# Defina o comando que será executado quando o container for iniciado
CMD "./start.sh"