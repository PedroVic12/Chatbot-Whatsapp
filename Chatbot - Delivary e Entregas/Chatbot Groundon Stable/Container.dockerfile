# Use uma imagem base com o Dart instalado
FROM dart:2.12

# Defina a pasta de trabalho
WORKDIR /servidor/lib/main.dart

# Copie o seu código Dart para a pasta de trabalho
COPY . .

# Instale as dependências do seu projeto
RUN pub get

# Defina o comando para iniciar o servidor
CMD dart main.dart

# Rodar o o docker >>> systemctl start docker
