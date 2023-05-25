import json

with open('server/config.json') as f:
    config = json.load(f)
    print(config['RECIPIENT_WAID'])
