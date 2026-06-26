from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db

from services.asset_service import AssetService

from schemas.asset_schema import (
    AssetCreate,
    AssetUpdate,
    AssetResponse,
)

router = APIRouter(
    prefix="/assets",
    tags=["Assets"],
)


@router.post(
    "/",
    response_model=AssetResponse,
    status_code=201,
)
def create_asset(
    asset: AssetCreate,
    db: Session = Depends(get_db),
):
    return AssetService.create_asset(db, asset)


@router.get(
    "/",
    response_model=list[AssetResponse],
)
def get_assets(
    db: Session = Depends(get_db),
):
    return AssetService.get_all_assets(db)


@router.get(
    "/{asset_id}",
    response_model=AssetResponse,
)
def get_asset(
    asset_id: int,
    db: Session = Depends(get_db),
):

    asset = AssetService.get_asset(db, asset_id)

    if asset is None:
        raise HTTPException(
            status_code=404,
            detail="Asset not found",
        )

    return asset


@router.put(
    "/{asset_id}",
    response_model=AssetResponse,
)
def update_asset(
    asset_id: int,
    asset: AssetUpdate,
    db: Session = Depends(get_db),
):

    updated = AssetService.update_asset(
        db,
        asset_id,
        asset,
    )

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Asset not found",
        )

    return updated


@router.delete("/{asset_id}")
def delete_asset(
    asset_id: int,
    db: Session = Depends(get_db),
):

    deleted = AssetService.delete_asset(
        db,
        asset_id,
    )

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Asset not found",
        )

    return {
        "message": "Asset deleted successfully"
    }