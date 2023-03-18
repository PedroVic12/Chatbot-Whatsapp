# Como criar um backend com Python, MongoDB e FastAPI

## Mensagem Youtube
Ola JEDI CYBERPUNK tem ums livros chamados Nas linhas do Arduino da NOVATEC são muito bom
Junior Tenorio​Quando comecei a estudar arduino, por volta de 2012/2013, descobri o canal yt de Renato Aloi. Há época não havia o termo 'maratonar', acho q eu fui um dos primeiros a viver esse termo kkk.
Junior Tenorio​Quando vi q o mestre voltou, me inscrevi e marco sempre o like em retribuição, mesmo q não consiga assistir sempre. Grande abraço! Sucesso!




## Preparando o ambiente
Instale o Python e o gerenciador de pacotes pip no seu computador, se ainda não tiver.

Crie um ambiente virtual para o projeto usando o comando python3 -m venv venv, substituindo venv pelo nome que você deseja dar ao seu ambiente.

Ative o ambiente virtual usando o comando source venv/bin/activate.

Instale o FastAPI usando o comando pip install fastapi.

Instale o motor do MongoDB para Python usando o comando pip install motor.

Instale o pacote Pydantic, que é usado para definir esquemas de dados em Python, com o comando pip install pydantic.


## Preparando o codigo
Crie um arquivo main.py no seu diretório de projeto.

Importe o FastAPI e o motor do MongoDB no arquivo main.py.

Defina uma instância do aplicativo FastAPI com app = FastAPI().

Conecte-se ao banco de dados MongoDB com client = motor.motor_asyncio.AsyncIOMotorClient("mongodb://localhost:27017").

Defina uma variável para o banco de dados que você deseja usar com db = client.nomedobanco.

Crie um modelo de dados Pydantic para representar o seu produto com campos como nome, descrição, preço, etc.

Defina uma rota no seu aplicativo FastAPI para retornar todos os produtos do banco de dados com @app.get("/produtos"). Use a função find() do MongoDB para obter todos os produtos e retorne-os como uma lista.

Defina outra rota para adicionar um novo produto com @app.post("/produtos"). Use a função insert_one() do MongoDB para inserir o novo produto no banco de dados.

Repita os passos 12 a 14 para definir rotas para lidar com pedidos e usuários.

Execute o seu aplicativo com uvicorn main:app --reload, onde main é o nome do seu arquivo Python e app é a instância do FastAPI que você definiu.

Teste suas rotas com um cliente HTTP como o Insomnia ou o Postman para garantir que elas estejam funcionando corretamente.

Integre o seu frontend Flutter com o backend Python usando requisições HTTP. Por exemplo, para obter uma lista de produtos, você pode usar o pacote http do Flutter e enviar uma solicitação GET para a rota /produtos no seu backend. Você pode então analisar a resposta JSON e exibir a lista de produtos na sua interface do usuário.

Repita o processo para as rotas de pedidos e usuários, permitindo que o seu aplicativo Flutter interaja com o seu backend Python de forma completa.