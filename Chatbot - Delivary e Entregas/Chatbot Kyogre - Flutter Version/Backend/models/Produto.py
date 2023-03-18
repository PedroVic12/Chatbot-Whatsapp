from typing import List

from pydantic import BaseModel


class Produto(BaseModel):
    nome: str
    descricao: str
    preco: float
