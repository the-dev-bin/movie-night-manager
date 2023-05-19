import { Center, Grid, Group, ScrollArea } from "@mantine/core";
import MovieCard from "../components/MovieCard";
import Movie from "../models/Movie";
import { useEffect, useState } from "react";
import Night from "../components/Night";


export function ManagePage() {

	let [movies, setMovies] = useState<Movie[]>([])

	useEffect(() => {
		console.log('hello world')
		fetch('http://localhost:8000/movies').then(res => res.json()).then((res: { movies: Movie[] }) => {
			let m = res.movies;
			setMovies(Array(50).fill(m[0]));
		})
	}, [])


	return <>
		<Grid grow style={{ height: '100%' }}>
			<Grid.Col span={1} style={{ background: '#38193d' }}>
				<Group>
					<Night></Night>
				</Group>
			</Grid.Col>
			<Grid.Col span={5} style={{ background: '#68393c' }}>
				<ScrollArea.Autosize mah={1089} mx="auto">
					<Group >
						{movies.map((movie: Movie) =>
							<MovieCard movie={movie}></MovieCard>
						)}
					</Group>
				</ScrollArea.Autosize>
			</Grid.Col>
		</Grid>
	</>
}