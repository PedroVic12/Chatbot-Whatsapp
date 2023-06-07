from socketio import AsyncServer
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()
sio = AsyncServer(async_mode='asgi')
sio.attach(app)


class Rayquaza:
    def __init__(self):
        self.clients = set()

    async def hello_world(self):
        message = 'Hello, World!'
        await self.send_to_all('message', message)

    async def send_to_all(self, event, data):
        for client in self.clients:
            await sio.emit(event, data, room=client)

    @sio.on('connect')
    async def connect(self, sid, environ):
        self.clients.add(sid)
        print(f'Client {sid} connected')

    @sio.on('disconnect')
    async def disconnect(self, sid):
        self.clients.remove(sid)
        print(f'Client {sid} disconnected')


rayquaza = Rayquaza()


@app.get("/")
async def get():
    return HTMLResponse("<h1>Rayquaza Server</h1>")


@app.get("/hello")
async def hello():
    await rayquaza.hello_world()
    return {"message": "Hello, World!"}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
