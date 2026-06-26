from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db

from services.event_service import EventService

from schemas.event_schema import (
    EventCreate,
    EventUpdate,
    EventResponse,
)

router = APIRouter(
    prefix="/events",
    tags=["Events"],
)


@router.post(
    "/",
    response_model=EventResponse,
    status_code=201,
)
def create_event(
    event: EventCreate,
    db: Session = Depends(get_db),
):
    return EventService.create_event(db, event)


@router.get(
    "/",
    response_model=list[EventResponse],
)
def get_events(
    db: Session = Depends(get_db),
):
    return EventService.get_all_events(db)


@router.get(
    "/{event_id}",
    response_model=EventResponse,
)
def get_event(
    event_id: int,
    db: Session = Depends(get_db),
):

    event = EventService.get_event(
        db,
        event_id,
    )

    if event is None:
        raise HTTPException(
            status_code=404,
            detail="Event not found",
        )

    return event


@router.put(
    "/{event_id}",
    response_model=EventResponse,
)
def update_event(
    event_id: int,
    event: EventUpdate,
    db: Session = Depends(get_db),
):

    updated = EventService.update_event(
        db,
        event_id,
        event,
    )

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Event not found",
        )

    return updated


@router.delete("/{event_id}")
def delete_event(
    event_id: int,
    db: Session = Depends(get_db),
):

    deleted = EventService.delete_event(
        db,
        event_id,
    )

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Event not found",
        )

    return {
        "message": "Event deleted successfully"
    }