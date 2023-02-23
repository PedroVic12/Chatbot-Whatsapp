import speech_recognition as sr

# cria um objeto de reconhecimento
r = sr.Recognizer()

# define o microfone como fonte de áudio
with sr.Microphone() as source:

    # ajusta o ruído de fundo
    r.adjust_for_ambient_noise(source)

    # pede ao usuário para falar algo
    print("Fale algo:")
    audio = r.listen(source)

# utiliza o reconhecimento de fala do Google
# substitua "language=pt-BR" pelo idioma que desejar
try:
    print("Você disse: " + r.recognize_google(audio, language='pt-BR'))
except sr.UnknownValueError:
    print("Não entendi o que você falou")
except sr.RequestError as e:
    print("Não foi possível conectar-se ao serviço do Google: {0}".format(e))
