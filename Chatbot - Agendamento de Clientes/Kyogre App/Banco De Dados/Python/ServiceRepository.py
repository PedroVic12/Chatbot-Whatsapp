from fastapi import FastAPI
from bson.objectid import ObjectId
from pymongo import MongoClient
from .models import Service

app = FastAPI()

client = MongoClient("mongodb://localhost:27017/")
db = client["salao_de_beleza"]
services_collection = db["services"]


class ServiceRepository:
    def create(self, service: Service) -> Service:
        service_dict = service.dict()
        result = services_collection.insert_one(service_dict)
        service_dict["_id"] = result.inserted_id
        return Service(**service_dict)

    def read_all(self) -> list[Service]:
        services = []
        for service_dict in services_collection.find():
            services.append(Service(**service_dict))
        return services

    def read_by_id(self, service_id: str) -> Service:
        service_dict = services_collection.find_one({"_id": ObjectId(service_id)})
        if service_dict:
            return Service(**service_dict)
        else:
            return None

    def update(self, service_id: str, service: Service) -> Service:
        service_dict = service.dict(exclude_unset=True)
        result = services_collection.update_one({"_id": ObjectId(service_id)}, {"$set": service_dict})
        if result.modified_count == 1:
            updated_service = services_collection.find_one({"_id": ObjectId(service_id)})
            return Service(**updated_service)
        else:
            return None

    def delete(self, service_id: str) -> dict:
        result = services_collection.delete_one({"_id": ObjectId(service_id)})
        if result.deleted_count == 1:
            return {"success": True}
        else:
            return {"success": False}


class ServiceController:
    repository = ServiceRepository()

    @staticmethod
    @app.post("/services", response_model=Service)
    async def create_service(service: Service):
        return ServiceController.repository.create(service)

    @staticmethod
    @app.get("/services", response_model=list[Service])
    async def read_services():
        return ServiceController.repository.read_all()

    @staticmethod
    @app.get("/services/{service_id}", response_model=Service)
    async def read_service(service_id: str):
        return ServiceController.repository.read_by_id(service_id)

    @staticmethod
    @app.put("/services/{service_id}", response_model=Service)
    async def update_service(service_id: str, service: Service):
        return ServiceController.repository.update(service_id, service)

    @staticmethod
    @app.delete("/services/{service_id}", response_model=dict)
    async def delete_service(service_id: str):
        return ServiceController.repository.delete(service_id)
