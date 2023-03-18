from fastapi import FastAPI
from pymongo import MongoClient

app = FastAPI()
client = MongoClient('mongodb://localhost:27017/')
db = client.test_database
collection = db.test_collection


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}


@app.post("/items/")
async def create_item(item: Item):
    return item


print('Sevidor Kyogre running...')
