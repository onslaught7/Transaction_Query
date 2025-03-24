from fastapi import FastAPI
import os
from routes import query, stats
import uvicorn
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("CLIENT_URL")],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.include_router(query.router)
app.include_router(stats.router)

@app.get("/")
def home():
    return {"message": "Server is Running"}

if __name__ == "__main__":
    HOST = os.getenv("HOST")
    PORT = int(os.getenv("PORT"))
    uvicorn.run(app, host=HOST, port=PORT)