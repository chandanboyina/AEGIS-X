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