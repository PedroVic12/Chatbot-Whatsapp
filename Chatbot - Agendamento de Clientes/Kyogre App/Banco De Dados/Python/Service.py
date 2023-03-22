from datetime import datetime
from typing import Optional

class Service():
    name: str
    description: Optional[str] = None
    price: float
    duration_minutes: int
    created_at: datetime = datetime.now()
