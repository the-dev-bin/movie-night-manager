import { Box } from "@mantine/core";
import Movie from "../models/Movie";
import MovieCard from "./MovieCard";
import { Draggable } from "react-beautiful-dnd";

function Night(props: any) {
  return <Box sx={(theme) => ({
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    textAlign: 'center',
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    cursor: 'pointer',
    width: '100%',
    height: 200,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    },
  })}>
    {props.night?.movies.map((movie: Movie, index: number) => (
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
  </Box>

}

export default Night;