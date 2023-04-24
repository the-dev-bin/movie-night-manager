import {
	AppShell, Center, Button, Stack, Title
} from "@mantine/core";
import { Link } from "react-router-dom";



function HomePage() {
	return <>
		<AppShell>
			<Center style={{height: '100%'}}>
				<Stack>
					<Title order={1}>Hello Homepage</Title>
					<Button component={Link} to={'/group/suggest'}>
						Login
					</Button>
				</Stack>
			</Center>
		</AppShell>
	</>
}

export default HomePage;