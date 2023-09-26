import speech_recognition as sr
from gtts import gTTS
import os
import playsound
import datetime
import wikipedia
import webbrowser
import pyjokes
import pyaudio


def get_audio():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        try:
            r.pause_threshold = 1
            r.adjust_for_ambient_noise(source, 1)
            audio = r.listen(source)
            said = ""
            said = r.recognize_google(audio)
            print(said)
        except Exception as e:
            print("Nao entendi: " + str(e))
        return said


def falar(texto):
    tts = gTTS(text=texto, lang='pt')
    fileName = 'voice.mp3'
    try:
        os.remove(fileName)
    except OSError:
        pass
    tts.save(fileName)
    playsound.playsound(fileName)


def main_robo():
    while True:
        print('Estou ouvindo...')
        texto = get_audio().lower()
        if 'olá' in texto:
            falar('Olá, como posso ajudar?')
        elif 'youtube' in texto:
            falar('Abrindo youtube')
            url = 'https://www.youtube.com/'
            webbrowser.get().open(url)

        elif 'pesquisar' in texto:
            falar('Pesquisando na Wikipedia')
            query = texto.replace('pesquisar', '')
            result = wikipedia.summary(query, sentences=3)
            falar('De acordo com a Wikikepia')
            print(result)
            falar(result)

        elif 'piada' in texto:
            falar(pyjokes.get_joke())

        elif 'sair' in texto:
            falar('Até mais, Mestre Pedro')
            break


main_robo()
