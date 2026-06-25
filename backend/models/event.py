from datetime import datetime

from sqlalchemy import DateTime
from sqlalchemy import Float
from sqlalchemy import String

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from database.base import Base


class Event(Base):

    __tablename__ = "events"

    id: Mapped[int] = mapped_column(primary_key=True)

    source: Mapped[str] = mapped_column(String(100))

    event_type: Mapped[str] = mapped_column(String(100))

    severity: Mapped[str] = mapped_column(String(50))

    anomaly_score: Mapped[float] = mapped_column(Float, default=0.0)

    timestamp: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )