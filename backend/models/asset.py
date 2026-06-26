"""
from sqlalchemy import String

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from database.base import Base


class Asset(Base):

    __tablename__ = "assets"

    id: Mapped[int] = mapped_column(primary_key=True)

    hostname: Mapped[str] = mapped_column(String(100))

    ip_address: Mapped[str] = mapped_column(String(50))

    operating_system: Mapped[str] = mapped_column(String(100))

    criticality: Mapped[str] = mapped_column(String(30))

"""
from datetime import datetime

from sqlalchemy import DateTime
from sqlalchemy import Float
from sqlalchemy import String

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from database.base import Base


class Asset(Base):

    __tablename__ = "assets"

    id: Mapped[int] = mapped_column(primary_key=True)

    hostname: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False,
    )

    ip_address: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False,
    )

    operating_system: Mapped[str] = mapped_column(
        String(100),
    )

    asset_type: Mapped[str] = mapped_column(
        String(100),
    )

    department: Mapped[str] = mapped_column(
        String(100),
    )

    criticality: Mapped[str] = mapped_column(
        String(30),
    )

    network_zone: Mapped[str] = mapped_column(
        String(100),
    )

    owner: Mapped[str] = mapped_column(
        String(100),
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="Online",
    )

    risk_score: Mapped[float] = mapped_column(
        Float,
        default=0.0,
    )

    last_seen: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )