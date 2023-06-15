import json

def process_json_file(json_file):
    with open(json_file, "r") as file:
        json_data = json.load(file)
        print('\nRequisição =', json_data)

process_json_file('Server Python/repository/pedido_10-06-23.json')