import smtplib
from email.mime.text import MIMEText


def enviar_email(para, nome, telefone):
    de = "pedrovictor.rveras12@gmail.com"
    senha = "azul+Pv12+azul"
    servidor_smtp = "smtp.gmail.com"
    porta_smtp = 587

    mensagem = f"Olá {nome}, seu telefone é {telefone}"
    msg = MIMEText(mensagem)
    msg["Subject"] = "Informação de contato"
    msg["From"] = de
    msg["To"] = para

    servidor = smtplib.SMTP(servidor_smtp, porta_smtp)
    servidor.ehlo()
    servidor.starttls()
    servidor.ehlo()
    servidor.login(de, senha)
    servidor.sendmail(de, para, msg.as_string())
    servidor.quit()


# exemplo de uso
contatos = [
    ("pedrovictorveras@id.uff.br", "Pedro UFF", "21 999289987"),
    ("pedrovictorrv_12@hotmail.com", "Pedro Hotmail", "21 999289987"),
]


for contato in contatos:
    enviar_email(*contato)
