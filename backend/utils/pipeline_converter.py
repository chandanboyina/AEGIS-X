from models.asset import Asset
from models.event import Event


def convert_to_pipeline_event(
    db_event: Event,
    asset: Asset,
):
    """
    Converts database Event + Asset
    into EnterprisePipeline format.
    """

    return {

        "id": db_event.id,

        "timestamp": db_event.timestamp.isoformat(),

        "source": db_event.source,

        "event_type": db_event.event_type,

        "severity": db_event.severity,

        "description": db_event.description,

        "raw_log": db_event.raw_log,

        "asset": {

            "id": asset.id,

            "hostname": asset.hostname,

            "ip_address": asset.ip_address,

            "operating_system": asset.operating_system,

            "asset_type": asset.asset_type,

            "department": asset.department,

            "criticality": asset.criticality,

            "network_zone": asset.network_zone,

            "owner": asset.owner,

            "status": asset.status,

            "risk_score": asset.risk_score

        }

    }