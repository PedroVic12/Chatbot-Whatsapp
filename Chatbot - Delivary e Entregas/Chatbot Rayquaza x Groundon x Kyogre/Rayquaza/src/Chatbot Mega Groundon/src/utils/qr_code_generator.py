import qrcode


def generate_qr_code(url, file_name):
    """Gera um QR Code para uma URL específica e salva como imagem."""
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save(f"./output/{file_name}")


def gerar_url_cardapio(base_url, routes):
    """Gera QR Codes para uma lista de rotas baseadas em um URL base."""
    for i, route in enumerate(routes, start=1):
        full_url = f"{base_url}/{route}"
        file_name = f"qrcode_{route}.png"
        generate_qr_code(full_url, file_name)


def main():

    # URL base e rotas
    base_url = 'https://groundon-citta-cardapio.web.app/'

    LOJAS = [
        "Botafogo",
        "Copacabana",
        "Ipanema",
        "Castelo"
    ]

    gerar_url_cardapio(base_url, LOJAS)


main()
