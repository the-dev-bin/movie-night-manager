import Movie from "../models/Movie";
import { Card,  Group, Image, Text } from "@mantine/core";

interface MovieProp {
	movie: Movie;
}

function MovieCard({movie}: MovieProp) {

	return <Card key={movie.id} withBorder padding='lg' radius='md' shadow="sm" >
		<Card.Section>
			<Image
				height={200}
				fit="contain"
				src={movie.poster} />
		</Card.Section>
		<Group mt="md" mb="xs" >
			<Text weight={500}>{movie.title}</Text>
		</Group>
	</Card>
}

export default MovieCard;