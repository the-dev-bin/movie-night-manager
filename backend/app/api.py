from typing import Any, Dict, List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
from config import Config
import boto3
from fastapi.encoders import jsonable_encoder
from generate import generate_table
from starlette.middleware.sessions import SessionMiddleware
from starlette.requests import Request
from authlib.integrations.starlette_client import OAuth
from starlette.responses import  RedirectResponse


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]
class Movie(BaseModel):
    imdbID: str
    Title: str
    Year: str
    Poster: str

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

app.add_middleware(SessionMiddleware, secret_key=Config.secret_key)

oauth = OAuth()

oauth.register(
    name='discord',
    client_id=Config.client_id,
    client_secret=Config.client_secret,
    access_token_url='https://discord.com/api/oauth2/token',
    authorize_url='https://discord.com/oauth2/authorize',
    api_base_url='https://discord.com/api/v10',
    client_kwargs={'scope': 'guilds identify'},
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

@app.get("/login/discord")
async def login_via_google(request: Request):
    return await oauth.discord.authorize_redirect(request, 'http://localhost:42069/auth/discord')

@app.get("/auth/discord")
async def auth_via_google(request: Request):
    print(request)
    discord = oauth.create_client('discord')
    token = await discord.authorize_access_token(request)
    request.session['user'] = token
    return RedirectResponse(url="http://localhost:3000/group/suggest")

@app.get("/servers")
async def get_servers(request: Request):
    user = request.session.get('user')
    if user:
        resp = await oauth.discord.get('users/@me/guilds', token=user)
        print('aospidhioqwheoi')
        resp.raise_for_status()
        return resp.json()

@app.get('/discord/profile')
async def get_discord_profile(request: Request):
    user = request.session.get('user')
    if user:
        resp = await oauth.discord.get('oauth2/@me', token=user)
        resp.raise_for_status()
        return resp.json()['user']
    return {"error": "User not found"}