from typing import Any, Dict, List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
from config import Config

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]
class Movie(BaseModel):
    imdbID: str
    Title: str
    Year: str

class MovieResponse(BaseModel):
    movies: List[Movie]

class SearchResponse(BaseModel):
    Search: List[Movie]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


temp_movies = [
    Movie(imdbID = 1, Title = 'Slumber Party Massacre 2', Director = 'Deborah Brock', Year = 1987)
]

@app.get("/")
async def read_root() -> dict:
    return {"message": "Hello World"}

@app.get("/movies")
async def movies() -> MovieResponse:
    return MovieResponse(movies=temp_movies)

@app.post('/movies')
async def movies(movie: Movie):
    temp_movies.append(movie)
    return 200

@app.get('/search')
async def request(title: str) -> SearchResponse:
    url = f"http://www.omdbapi.com/"
    response = None
    async with httpx.AsyncClient() as client:
        response = await client.get(url, params={'s': title, 'apikey': Config.omdb_key})
    print(response.json())
    omdb_data = response.json()
    if 'Error' in omdb_data:
        return {'Search': []}
    return omdb_data
