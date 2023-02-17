import subprocess

with open("requirements.txt") as f:
    dependencias_projeto = f.readlines()

for dependencia in dependencias:
    subprocess.call(["npm", "install", dependencia.strip()])
