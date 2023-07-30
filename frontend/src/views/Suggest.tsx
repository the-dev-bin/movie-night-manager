import { useState, useEffect } from 'react'
import { Input, Button, Container, Flex, Center, Autocomplete} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDebouncedValue } from '@mantine/hooks';
import Movie from "../models/Movie"

export function SuggestPage() {

	const [searchQuery, setSearchQuery] = useState("");
	const [debounce] = useDebouncedValue(searchQuery, 200);
	const [searchResponse, setSearchResponse] = useState<any[]>([]);
	const [autompleteArray, setAutompleteArray] = useState<string[]>([]);


	const handleSearchInputChange = (event: any) => {
		setSearchQuery(event.target.value);
	};

	const handleSearchClick = () => {
		console.log(`Searching for "${searchQuery}"...`);
		let movieToSuggest = searchResponse.find((movie: Movie) => {
			return movie.Title === searchQuery;
		})
		if (movieToSuggest) {
			delete movieToSuggest.value;
			console.log(movieToSuggest)
			
			fetch("http://localhost:42069/movies", {
				method: 'POST',
				body: JSON.stringify(movieToSuggest),
				headers: {
					"Content-Type": "application/json",
				  },
			}).then((e) => {
				notifications.show({
					message: `Movie Submited: ${movieToSuggest.Title}`
				})
				console.log(e)
				console.log('Submitted!')
			}).catch(err => {
				console.log(err)
			});
		} else {
			notifications.show({
				message: 'Invalid Movie Suggested'
			})
		}
	};

	useEffect(() => {
		if(debounce === '') {
			return;
		}
		const URL = `http://localhost:42069/search?title=${debounce}`

		console.log('Omdb Results called');
		fetch(URL).then((res: any) => res.json()).then((res) => {
			console.log(res);

			let a: any = res['Search'].map((movie: any) => {
				 return {
					value: movie['Title']
				}
			})
			setSearchResponse(res['Search'])
			setAutompleteArray(a)
		});
	}, [debounce])

	return (
		<Center style={{ height: '100%' }}>
			<Flex
				gap="sm"
				align="center"
				sx={(theme) => ({
					height: 300,
					width: 400
				})}
			>
				<Autocomplete 
					data={autompleteArray}
					onChange={setSearchQuery}
					value={searchQuery}
					placeholder='Search for a movie title'
					style={{flex: 1}}
					radius="xl"
				/>
						{
							/*
							<div value="hotdog" Title="Hotdog Massacre" imdbID="aousbdouiqbwe" Year="1234">
							</div>
							*/
						}
				{/* <Input
					placeholder="Search for a movie"
					value={searchQuery}
					onChange={handleSearchInputChange}
				/> */}
				<Button onClick={handleSearchClick} size="sm" radius="xl">
					Search
				</Button>
			</Flex>
		</Center>
	);
}