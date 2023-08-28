#!/bin/bash

# Verifica se a aplicação está rodando
IS_RUNNING=$(pm2 list | grep Chatbot-Groundon)

if [ -z "$IS_RUNNING" ]; then
    echo -e "Rodando a aplicação...\n"
    # Se não estiver rodando, inicia a aplicação
    pm2 start index.js --name "Chatbot-Groundon"
else
    # Se estiver rodando, reinicia a aplicação
    pm2 save
    clear
    echo -e "\nReiniciando o robo...\n"
    pm2 restart Chatbot-Groundon
fi

# Mostra os logs
clear 
pm2 logs
