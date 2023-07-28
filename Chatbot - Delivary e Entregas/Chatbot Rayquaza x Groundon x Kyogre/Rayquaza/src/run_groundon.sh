#!/bin/bash
cd Chatbot\ Mega\ Groundon
pwd
pm2 start index.js --restart-delay=5000 --max-restarts=10
pm2 logs index
