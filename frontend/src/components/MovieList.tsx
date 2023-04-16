import { useEffect, useState } from "react";
import Movie from "../models/Movie";

function MovieList() {
	let [movies, setMovies] = useState<any>([])

	useEffect(() => {
		console.log('hello world')
		fetch('http://localhost:8000/movies').then(res => res.json()).then((res : {movies: Movie[]} )=> {
			setMovies(res.movies);
		})
	}, [])
	return <>
		<p>There's some movies in here</p>
		<ul>
			{movies.map((movie: any) =>
				<li key={movie.id}>{movie.title}</li>
			)}
		</ul>
	</>
}

export default MovieList;