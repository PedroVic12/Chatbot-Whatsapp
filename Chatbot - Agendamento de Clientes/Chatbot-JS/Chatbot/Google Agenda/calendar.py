import tkinter as tk
from datetime import datetime, timedelta
from pytz import timezone
from GoogleAgenda import AgendaGoogle

# Configurar fuso horário
fuso_horario = timezone('America/Sao_Paulo')

# Configurar informações da conta de serviço
SCOPES = ['https://www.googleapis.com/auth/calendar']
SERVICE_ACCOUNT_FILE = '/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Agendamento de Clientes/Chatbot-JS/Chatbot/Google Agenda/credencials/chabot-370717-ecc506aa3bca.json'
CALENDAR_ID = 'primary'

# Inicializar a classe AgendaGoogle
agenda = AgendaGoogle(fuso_horario)

# Configurar a janela do aplicativo
janela = tk.Tk()
janela.title('Agendamento')

# Configurar a seleção de data e hora
data_label = tk.Label(janela, text='Data:')
data_label.grid(row=0, column=0)
data_var = tk.StringVar()
data_entry = tk.Entry(janela, textvariable=data_var)
data_entry.grid(row=0, column=1)

hora_label = tk.Label(janela, text='Hora:')
hora_label.grid(row=1, column=0)
hora_var = tk.StringVar()
hora_entry = tk.Entry(janela, textvariable=hora_var)
hora_entry.grid(row=1, column=1)

# Configurar informações do evento
nome_label = tk.Label(janela, text='Nome:')
nome_label.grid(row=2, column=0)
nome_var = tk.StringVar()
nome_entry = tk.Entry(janela, textvariable=nome_var)
nome_entry.grid(row=2, column=1)

descricao_label = tk.Label(janela, text='Descrição:')
descricao_label.grid(row=3, column=0)
descricao_var = tk.StringVar()
descricao_entry = tk.Entry(janela, textvariable=descricao_var)
descricao_entry.grid(row=3, column=1)

# Configurar botão para criar evento


def criar_evento():
    data_str = data_var.get()
    hora_str = hora_var.get()
    nome = nome_var.get()
    descricao = descricao_var.get()

    # Converter a data e hora para objeto datetime
    data = datetime.strptime(data_str, '%d/%m/%Y')
    hora = datetime.strptime(hora_str, '%H:%M').time()
    inicio = fuso_horario.localize(datetime.combine(data, hora))
    fim = inicio + timedelta(hours=1)

    # Criar o evento na agenda do Google
    evento_id = agenda.criar_evento(inicio, fim, nome, descricao)
    if evento_id:
        tk.messagebox.showinfo('Sucesso', 'Evento criado com sucesso')
    else:
        tk.messagebox.showerror('Erro', 'Não foi possível criar o evento')


criar_evento_button = tk.Button(
    janela, text='Criar Evento', command=criar_evento)
criar_evento_button.grid(row=4, column=0, columnspan=2)

janela.mainloop()
