import { useState, useEffect } from 'react'
import { Input, Button, Container, Flex, Center, Autocomplete } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';


export function SuggestPage() {

	const [searchQuery, setSearchQuery] = useState("");
	const [debounce] = useDebouncedValue(searchQuery, 200);
	const [searchResponse, setSearchResponse] = useState([]);


	const handleSearchInputChange = (event: any) => {
		setSearchQuery(event.target.value);
	};

	const handleSearchClick = () => {
		console.log(`Searching for "${searchQuery}"...`);
	};
	

	useEffect(() => {
		if(debounce === '') {
			return;
		}
		const URL = `http://localhost:8000/search?title=${debounce}`

		console.log('Omdb Results called');
		fetch(URL).then((res: any) => res.json()).then((res) => {
			console.log(res);

			let a: any = res['Search'].map((movie: any) => { return {value: movie['Title']}}) /* eslint-disable-line */
			setSearchResponse(a)
		});
	}, [debounce])

	return (
		<Center style={{ height: '100%' }}>
			<Flex
				gap="sm"
				align="center"
				sx={(theme) => ({
					height: 300,
					width: 300
				})}
			>
				<Autocomplete 
					data={searchResponse}
					onChange={setSearchQuery}
					value={searchQuery}
					placeholder='Search for a movie title'
					radius="xl"
				/>

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