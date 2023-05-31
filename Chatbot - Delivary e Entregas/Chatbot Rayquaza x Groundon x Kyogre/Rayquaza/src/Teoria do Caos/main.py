# Criar uma instância de Pikachu
from Rayquaza.models.Pikachu import Pikachu
from Rayquaza.src.models.domain.Rayquaza import Rayquaza


NUMERO_GROUNDON = '5521'

pikachu = Pikachu()

# Criar uma instância de Rayquaza passando a instância de Pikachu como parâmetro
rayquaza = Rayquaza(pikachu)

# Conectar ao WhatsApp
rayquaza.conectar_whatsapp()

# Definir o evento para receber mensagens
rayquaza.evento_receber_mensagem()

# Enviar uma mensagem
rayquaza.enviar_mensagem(NUMERO_GROUNDON, 'Olá, mundo!')
