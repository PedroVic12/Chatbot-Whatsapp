# Use uma imagem Dart base
FROM dart:2.9

# Adicione as dependências do seu aplicativo
RUN pub get

# Copie o código do seu aplicativo para o container
COPY . /app
WORKDIR /app

# Execute o seu aplicativo
CMD dart backend.dart


# Rodar o o docker >>> systemctl start docker
