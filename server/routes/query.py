from fastapi import APIRouter, Query
from services.nlp_service import process_query

router = APIRouter(prefix="/query", tags=["Query"])

@router.get("/")
def query_nlp(user_query: str = Query(..., description="Enter your question")):
    response = process_query(user_query)

    return {"response": response}
