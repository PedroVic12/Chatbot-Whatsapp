

echo "Entrar na pasta do projeto";
#cd /home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Groundon Stable/
cd src/Robo

echo "Executar o Docker";
#systemctl start docker

echo "Instalando as dependências";
npm install

clear 

echo "Executar o Node";
npm start

