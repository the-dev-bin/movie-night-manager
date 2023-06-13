import { Center, Grid, Group, ScrollArea } from "@mantine/core";
import MovieCard from "../components/MovieCard";
import Movie from "../models/Movie";
import { useEffect, useState } from "react";
import Night from "../components/Night";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { DragDropContext } from 'react-beautiful-dnd';

export function ManagePage() {

	let [movies, setMovies] = useState<Movie[]>([])
	let [nights, setNights] = useState<any>({
		'monday': {
			name: 'Monday night thing',
			date: '2021',
			movies: []
		},
		'tuesday': {
			name: 'Tuesday night thing',
			date: '2021',
			movies: []
		},
	})
	useEffect(() => {
		console.log('hello world')
		fetch('http://localhost:42069/movies').then(res => res.json()).then((res: { 'movies': Movie[] }) => {
			let m = res.movies;
			console.log(m)
			setMovies(m)
		})
	}, [])

	function onDragEnd(ctx: any) {

	}
	return <DragDropContext onDragEnd={onDragEnd}>
		<Grid grow style={{ height: '100%' }}>
			<Grid.Col span={1} style={{ background: '#38193d' }}>
				<Group>
					{Object.keys(nights).map(() =>
						<Night></Night>
					)}
				</Group>
			</Grid.Col>
			<Grid.Col span={5} style={{ background: '#68393c' }}>
				<ScrollArea.Autosize mah={1089} mx="auto">
					<Droppable droppableId="droppable2" direction="horizontal">
						{(provided, snapshot) => (
							<Group
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								{movies.map((movie, index) => (
									<Draggable key={movie.imdbID} draggableId={movie.imdbID} index={index}>
										{(provided, snapshot) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												<MovieCard movie={movie} ></MovieCard>
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</Group>
						)}
					</Droppable>
				</ScrollArea.Autosize>
			</Grid.Col>
		</Grid>
	</DragDropContext>
}