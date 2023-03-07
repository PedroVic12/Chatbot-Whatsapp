import socket

host = 'localhost'  # substitua pelo endereço IP ou hostname do servidor
port = 8080  # substitua pela porta que deseja verificar

# cria um objeto socket
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

try:
    # tenta conectar ao servidor
    client_socket.connect((host, port))
    print(f"A porta {port} está aberta no servidor {host}")
    client_socket.close()  # fecha a conexão
except:
    print(f"A porta {port} está fechada no servidor {host}")
