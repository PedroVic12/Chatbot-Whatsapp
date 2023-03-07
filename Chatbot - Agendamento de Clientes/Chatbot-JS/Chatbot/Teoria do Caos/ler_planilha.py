import pandas as pd
import json

# Lendo o arquivo Excel
df = pd.read_excel('/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Agendamento de Clientes/Chatbot-JS/Chatbot/Banco de Dados - EXCEL/Base de Dados Produtos/servicos-salao.xlsx')

# Selecionando as colunas
cols = df.columns.tolist()
# Alterando nome das colunas com preços
cols = [x.replace('.1', '_preco') for x in cols]
cols[::2] = [x.lower().replace(' ', '_')
             for x in cols[::2]]  # Convertendo nomes para snake_case

# Convertendo para dicionário
data = df.to_dict(orient='records')

# Formatando o dicionário
formatted_data = []
for item in data:
    formatted_item = {}
    for key, value in item.items():
        if isinstance(key, str) and '_preco' in key:
            continue  # Ignorando colunas de preços
        formatted_item[key.lower().replace(' ', '_')] = value
    formatted_data.append(formatted_item)

# Convertendo para JSON e salvando o arquivo
with open('/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Agendamento de Clientes/Chatbot-JS/Chatbot/Banco de Dados - EXCEL/Base de Dados Produtos/serviços.json', 'w') as f:
    json.dump(formatted_data, f, indent=4)
