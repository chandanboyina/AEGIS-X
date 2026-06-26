import random

from sqlalchemy.orm import Session

from models.event import Event


class EventGenerator:

    WINDOWS_EVENTS = [
        (
            "Windows Security",
            "Failed Login",
            "Medium",
            "Multiple failed administrator login attempts.",
        ),
        (
            "Windows Security",
            "Successful Login",
            "Low",
            "User logged into workstation.",
        ),
        (
            "Windows Defender",
            "Malware Detected",
            "High",
            "Suspicious executable quarantined.",
        ),
    ]

    LINUX_EVENTS = [
        (
            "Linux SSH",
            "SSH Login",
            "Low",
            "SSH login successful.",
        ),
        (
            "Linux SSH",
            "Failed SSH Login",
            "Medium",
            "Failed root login.",
        ),
    ]

    FIREWALL_EVENTS = [
        (
            "Firewall",
            "Blocked Connection",
            "Medium",
            "Firewall blocked suspicious IP.",
        ),
        (
            "Firewall",
            "Port Scan",
            "High",
            "Possible reconnaissance detected.",
        ),
    ]

    @staticmethod
    def generate(db: Session, asset_id: int):

        event = random.choice(
            EventGenerator.WINDOWS_EVENTS
            + EventGenerator.LINUX_EVENTS
            + EventGenerator.FIREWALL_EVENTS
        )

        db_event = Event(
            asset_id=asset_id,
            source=event[0],
            event_type=event[1],
            severity=event[2],
            description=event[3],
            raw_log=f"SIMULATED LOG :: {event[1]}",
        )

        db.add(db_event)
        db.commit()
        db.refresh(db_event)

        return db_event