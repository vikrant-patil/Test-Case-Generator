import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import RandomArray from '../RandomArray';
import RandomCharacters from '../RandomCharacters';
import RandomNumber from '../RandomNumber';
import RandomStrings from '../RandomStrings';
export default function Layout() {
	const dataType = [
		'Numbers',
		'Characters',
		'Strings',
		'Arrays',
		'Graphs',
		'Trees',
	];
	const forms = [
		<RandomNumber />,
		<RandomCharacters />,
		<RandomStrings />,
		<RandomArray />,
		'Graphs',
		'Trees',
	];
	return (
		<Box mt={16}>
			<Tabs isFitted variant='enclosed'>
				<TabList mb='1em'>
					{dataType.map((i) => (
						<Tab key={i}>{i}</Tab>
					))}
				</TabList>
				<TabPanels>
					{forms.map((f, i) => (
						<TabPanel key={i}>{f}</TabPanel>
					))}
				</TabPanels>
			</Tabs>
		</Box>
	);
}
