from pydantic import BaseModel
from typing import Any, Dict, List


class DashboardPacket(BaseModel):

    metadata: Dict[str, Any] = {}

    pipeline: Dict[str, Any] = {}

    trace: List[str] = []

    enterprise: Dict[str, Any] = {}

    observer: Dict[str, Any] = {}

    behavior: Dict[str, Any] = {}

    correlation: Dict[str, Any] = {}

    oracle: Dict[str, Any] = {}

    sentinel: Dict[str, Any] = {}

    incident: Dict[str, Any] = {}

    commander: Dict[str, Any] = {}

    council: Dict[str, Any] = {}

    brain: Dict[str, Any] = {}

    cyber_dna: Dict[str, Any] = {}

    digital_twin: Dict[str, Any] = {}

    audit: List[Any] = []