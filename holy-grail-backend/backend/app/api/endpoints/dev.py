from fastapi import APIRouter, Depends
from starlette.requests import Request
from app.models.auth import Authenticator

router = APIRouter()


def get_app(request: Request):
    return request.app


@router.get("/metrics")
async def expose_metrics(
    authenticated=Depends(Authenticator.get_developer), app=Depends(get_app)
):
    return app.state.instrumentator.expose()
