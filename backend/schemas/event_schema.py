from datetime import datetime

from pydantic import BaseModel, ConfigDict


class EventBase(BaseModel):
    asset_id: int
    source: str
    event_type: str
    severity: str
    description: str
    raw_log: str


class EventCreate(EventBase):
    pass


class EventUpdate(BaseModel):
    severity: str | None = None
    description: str | None = None
    anomaly_score: float | None = None


class EventResponse(EventBase):
    id: int
    anomaly_score: float
    timestamp: datetime

    model_config = ConfigDict(
        from_attributes=True
    )