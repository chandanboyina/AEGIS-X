from datetime import datetime

from pydantic import BaseModel, ConfigDict


class AssetBase(BaseModel):
    hostname: str
    ip_address: str
    operating_system: str
    asset_type: str
    department: str
    criticality: str
    network_zone: str
    owner: str


class AssetCreate(AssetBase):
    pass


class AssetUpdate(BaseModel):
    hostname: str | None = None
    ip_address: str | None = None
    operating_system: str | None = None
    asset_type: str | None = None
    department: str | None = None
    criticality: str | None = None
    network_zone: str | None = None
    owner: str | None = None
    status: str | None = None
    risk_score: float | None = None


class AssetResponse(AssetBase):
    id: int
    status: str
    risk_score: float
    last_seen: datetime

    model_config = ConfigDict(from_attributes=True)