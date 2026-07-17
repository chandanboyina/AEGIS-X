from fastapi import APIRouter

from api.controllers.dashboard_controller import DashboardController

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

controller = DashboardController()


@router.get("")
def latest():

    return controller.latest()


@router.get("/summary")
def summary():

    return controller.summary()


@router.get("/council")
def council():

    return controller.council()


@router.get("/brain")
def brain():

    return controller.brain()


@router.get("/dna")
def dna():

    return controller.dna()


@router.get("/twin")
def twin():

    return controller.twin()


@router.get("/pipeline")
def pipeline():

    return controller.pipeline()


@router.get("/trace")
def trace():

    return controller.trace()