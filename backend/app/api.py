from typing import Any, Dict, List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
from config import Config
import boto3
from fastapi.encoders import jsonable_encoder
from generate import generate_table

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


db = boto3.resource('dynamodb',
                    endpoint_url='http://db:8000',
                    region_name='example',
                    aws_access_key_id='example',
                    aws_secret_access_key='example')

generate_table(db)


@app.get("/")
async def read_root() -> dict:
    return {"message": "Hello World"}

@app.get("/movies")
async def movies() -> MovieResponse:
    table = db.Table('Movies')
    response = table.scan()
    movies_response = response.get('Items',[])
    return MovieResponse(movies=movies_response)

@app.post('/movies')
async def movies(movie: Movie):
    print(movie)
    table = db.Table('Movies')
    response = jsonable_encoder(movie)
    table.put_item(Item=response)
    return 200

@app.get('/search')
async def request(title: str) -> SearchResponse:
    url = f"http://www.omdbapi.com/"
    response = None
    async with httpx.AsyncClient() as client:
        response = await client.get(url, params={'s': title, 'apikey': Config.omdb_key})
    print(response.json())
    omdb_data = response.json()
    if 'Error' in omdb_data: # TODO: Make sure this doesn't catch movies with error in title
        return {'Search': []}
    return omdb_data