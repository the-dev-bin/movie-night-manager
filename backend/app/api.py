from typing import Any, Dict, List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
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
    poster: str

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
    Movie(id = 1, title = 'Slumber Party Massacre 2', director = 'Deborah Brock', year = 1987, poster='https://m.media-amazon.com/images/M/MV5BMjFjMTUyOTAtMDg4Yy00YjE4LWE1ODgtODM3ZDAwZWZhN2UyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg')
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
async def request(title: str) -> Movie:
    url = f"http://www.omdbapi.com/"
    response = None
    async with httpx.AsyncClient() as client:
        response = await client.get(url, params={'t': title, 'apikey': ''})
    print(response.json())
    return Movie(title="test",id=1,director='a',year=1, poster='')