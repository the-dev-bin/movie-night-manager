import Movie from "../models/Movie";
import { Card,  Group, Image, Text } from "@mantine/core";

interface MovieProp {
	movie: Movie;
}

function MovieCard({movie}: MovieProp) {

	return <Card withBorder padding='lg' radius='md' shadow="sm" sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        cursor: 'pointer',

		'&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        },
      })}>
		<Card.Section>
			<Image
				height={150}
				fit="contain"
				src={movie.Poster} />
		</Card.Section>
		<Group mt="md" mb="xs" >
			<Text weight={500}>{movie.Title}</Text>
		</Group>
	</Card>
}

export default MovieCard;