from sqlalchemy.orm import Session

from models.asset import Asset
from schemas.asset_schema import AssetCreate, AssetUpdate


class AssetService:

    @staticmethod
    def create_asset(db: Session, asset: AssetCreate):

        db_asset = Asset(
            hostname=asset.hostname,
            ip_address=asset.ip_address,
            operating_system=asset.operating_system,
            asset_type=asset.asset_type,
            department=asset.department,
            criticality=asset.criticality,
            network_zone=asset.network_zone,
            owner=asset.owner,
        )

        db.add(db_asset)
        db.commit()
        db.refresh(db_asset)

        return db_asset

    @staticmethod
    def get_all_assets(db: Session):

        return db.query(Asset).all()

    @staticmethod
    def get_asset(db: Session, asset_id: int):

        return db.query(Asset).filter(
            Asset.id == asset_id
        ).first()

    @staticmethod
    def update_asset(
        db: Session,
        asset_id: int,
        asset_data: AssetUpdate,
    ):

        asset = db.query(Asset).filter(
            Asset.id == asset_id
        ).first()

        if not asset:
            return None

        update_data = asset_data.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(asset, key, value)

        db.commit()
        db.refresh(asset)

        return asset

    @staticmethod
    def delete_asset(
        db: Session,
        asset_id: int,
    ):

        asset = db.query(Asset).filter(
            Asset.id == asset_id
        ).first()

        if not asset:
            return None

        db.delete(asset)
        db.commit()

        return asset