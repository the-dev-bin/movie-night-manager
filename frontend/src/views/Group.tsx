import { Link, Outlet } from "react-router-dom";
import { IconGhostFilled } from '@tabler/icons-react';
import {
	AppShell,
	Header,
	Group,
	Title,
	ThemeIcon,
	Button,
	Anchor
} from "@mantine/core";


export function GroupLayout() {
	return <>
		<AppShell
			header={
				<Header height={{ base: 80}} p="md">
					<Group grow align="center" h="100%">
						<Group align="center">
							<ThemeIcon variant="outline" radius="xl" color="orange" >
								<IconGhostFilled />
							</ThemeIcon>
							<Title><Link to={'/'}>Shiver</Link></Title>
						</Group>
						<Group position="right" spacing="xl">
							<Anchor  href="http://localhost:42069/login/discord">
								Login (Again)
							</Anchor>
							<Link to={`/group/suggest`}>Suggest</Link>
							<Link to={`/group/manage`}>Manage</Link>
						</Group>
					</Group>
				</Header>
			}
		>
			<Outlet />
		</AppShell>
	</>
}
