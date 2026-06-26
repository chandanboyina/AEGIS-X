from sqlalchemy.orm import Session

from models.event import Event
from schemas.event_schema import EventCreate, EventUpdate


class EventService:

    @staticmethod
    def create_event(db: Session, event: EventCreate):

        db_event = Event(
            asset_id=event.asset_id,
            source=event.source,
            event_type=event.event_type,
            severity=event.severity,
            description=event.description,
            raw_log=event.raw_log,
        )

        db.add(db_event)
        db.commit()
        db.refresh(db_event)

        return db_event

    @staticmethod
    def get_all_events(db: Session):

        return db.query(Event).all()

    @staticmethod
    def get_event(
        db: Session,
        event_id: int,
    ):

        return db.query(Event).filter(
            Event.id == event_id
        ).first()

    @staticmethod
    def update_event(
        db: Session,
        event_id: int,
        event_data: EventUpdate,
    ):

        event = db.query(Event).filter(
            Event.id == event_id
        ).first()

        if not event:
            return None

        update_data = event_data.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(event, key, value)

        db.commit()
        db.refresh(event)

        return event

    @staticmethod
    def delete_event(
        db: Session,
        event_id: int,
    ):

        event = db.query(Event).filter(
            Event.id == event_id
        ).first()

        if not event:
            return None

        db.delete(event)
        db.commit()

        return event