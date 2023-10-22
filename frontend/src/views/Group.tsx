import { Link, Outlet } from "react-router-dom";
import { IconGhostFilled } from '@tabler/icons-react';
import {
	AppShell,
	Header,
	Group,
	Title,
	ThemeIcon,
	Anchor,
	Avatar
} from "@mantine/core";
import { useEffect, useState } from "react";


export function GroupLayout() {
	let [user, setUser] : any= useState();

	useEffect(() => {
		fetch('http://localhost:42069/discord/profile', {
			credentials: "include"
		}).then(res => res.json()).then(res => {
			setUser(res);
		})
	},[])
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
							<Link to={`/group/suggest`}>Suggest</Link>
							<Link to={`/group/manage`}>Manage</Link>
							{
								user ? (<Avatar src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} radius="xl"></Avatar>) : <Anchor  href="http://localhost:42069/login/discord">Login (Again)</Anchor>
							}
						</Group>
					</Group>
				</Header>
			}
		>
			<Outlet />
		</AppShell>
	</>
}
