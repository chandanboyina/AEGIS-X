'''
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
    '''
from datetime import datetime

from sqlalchemy import DateTime
from sqlalchemy import Float
from sqlalchemy import ForeignKey
from sqlalchemy import String
from sqlalchemy import Text

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from database.base import Base


class Event(Base):

    __tablename__ = "events"

    id: Mapped[int] = mapped_column(primary_key=True)

    asset_id: Mapped[int] = mapped_column(
        ForeignKey("assets.id")
    )

    source: Mapped[str] = mapped_column(
        String(100)
    )

    event_type: Mapped[str] = mapped_column(
        String(100)
    )

    severity: Mapped[str] = mapped_column(
        String(30)
    )

    description: Mapped[str] = mapped_column(
        Text
    )

    anomaly_score: Mapped[float] = mapped_column(
        Float,
        default=0.0,
    )

    raw_log: Mapped[str] = mapped_column(
        Text
    )

    timestamp: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )