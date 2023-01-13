# https://pyautogui.readthedocs.io/en/latest/quickstart.html

import pyautogui

# pausa
pyautogui.PAUSE = 2.5

# ver onde ta o mouse
sweet_spot = pyautogui.position()
print(sweet_spot)

# mover o mouse
# pyautogui.moveTo(100, 100, duration=0.25)
# pyautogui.moveTo(200, 100, duration=0.25)

print("Fim da execução")
