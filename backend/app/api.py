from typing import Any, Dict, List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]
class Movie(BaseModel):
    id: str
    title: str
    director: str
    year: int

class MovieResponse(BaseModel):
    movies: List[Movie]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


temp_movies = [
    Movie(id = 1, title = 'Slumber Party Massacre 2', director = 'Deborah Brock', year = 1987)
]

@app.get("/")
async def read_root() -> dict:
    return {"message": "Hello World"}

@app.get("/movies")
async def movies() -> MovieResponse:
    return MovieResponse(movies=temp_movies)