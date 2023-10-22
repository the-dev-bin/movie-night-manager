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
		if (!ctx.destination) return;
		console.log(ctx)
		let destinationId = ctx.destination.droppableId;
		if (destinationId.startsWith("night-")) {
			if (ctx.destination.droppableId === ctx.source.droppableId) return;

			const newMovies = Array.from(movies);

			const [movedMovie] = newMovies.splice(ctx.source.index, 1);
	
			setMovies(newMovies);
			let nightKey = destinationId.substring("night-".length)
			let night = nights[nightKey];
			const newNightMovies = Array.from(night.movies);
			newNightMovies.splice(ctx.destination.index, 0, movedMovie);
			night.movies = newNightMovies;
			setNights({
					[nightKey]: night,
					...nights
				}
			)
			return;
		}
		const newMovies = Array.from(movies);

		const [movedMovie] = newMovies.splice(ctx.source.index, 1);
		newMovies.splice(ctx.destination.index, 0, movedMovie);

		setMovies(newMovies);
	};
	return <DragDropContext onDragEnd={onDragEnd}>
		<Grid grow style={{ height: '100%' }}>
			<Grid.Col span={1} style={{ background: '#38193d' }}>
				<Group>
					{Object.keys(nights).map((night) =>
						<Droppable droppableId={`night-${night}`} direction="horizontal" key={night} >
							{(provided, snapshot) => (
								<div ref={provided.innerRef}
									{...provided.droppableProps} style={{width: '100%'}}> 
									<Night night={nights[night]}>
									</Night>
									{provided.placeholder}
								</div>
							)}
						</Droppable>
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