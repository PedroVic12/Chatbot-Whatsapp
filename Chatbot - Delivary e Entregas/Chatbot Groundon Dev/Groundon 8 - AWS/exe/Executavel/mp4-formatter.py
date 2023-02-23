import ffmpeg

# define o caminho do arquivo MKV original
input_path = "/home/pedrov/2023-02-23 01-12-36.mkv"

# define o caminho do arquivo MP4 de saída
output_path = "/home/pedrov/Vídeos/output.mp4"

# realiza a conversão do arquivo MKV para MP4
(
    ffmpeg
    .input(input_path)
    .output(output_path, vcodec="libx264", acodec="aac")
    .run()
)

print("Conversão concluída com sucesso!")
