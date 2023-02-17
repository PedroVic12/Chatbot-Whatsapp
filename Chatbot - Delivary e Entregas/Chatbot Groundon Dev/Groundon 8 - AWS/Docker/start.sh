

echo "Entrar na pasta do projeto";
#cd /home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Groundon Stable/
cd ..
cd src
cd Chatbot-JS

echo "Executar o Docker";
#systemctl start docker

echo "Instalando as dependências";

#npm install

#npm install puppeteer
# npm install whatsapp-web.js

# npm install whatsapp-web.js@1.20.0-alpha.0

# npm install qrcode-terminal

# npm i git+https://github.com/pedroslopez/whatsapp-web.js/tree/fix-buttons-list

clear 

echo "Executando o Node...";
node main.js
#npm start --no-sandbox --disable-setuid-sandbox

