from flask import Flask, request

app = Flask(__name__)

@app.route("/webhook", methods = ['GET', 'POST'])
def webhook():
    req = request.get_json(force= True)
    fulfillmentText = ''
    query_result = req.get('queryResult')
    if query_result.get('action') == 'get.address':
        #colocar código executavel

        fulfillmentText = 'Ola mundo 2'
    
    data = {
        "fulfillmentText": fulfillmentText,
        'source':'webhookdata'
    }

    return data

if __name__ == '__main__':
    app.run()


#TODO -> Colocar o servidor numa hospedagem para webhook
#TODO -> Conectar com o DialogFlow