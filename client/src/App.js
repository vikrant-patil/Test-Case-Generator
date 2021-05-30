import { ChakraProvider, ColorModeScript, Container } from '@chakra-ui/react';
import Header from './components/Header';
import Layout from './components/Layout';
import RandomArray from './components/RandomArray';
import RandomCharacters from './components/RandomCharacters';
import RandomNumber from './components/RandomNumber';
import RandomStrings from './components/RandomStrings';
import theme from './constants/theme';

function App() {
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
		<div className='App'>
			<ChakraProvider theme={theme}>
				<ColorModeScript />
				<Container maxW='80%' margin='auto'>
					<Header />
					<Layout forms={forms} dataType={dataType} />
				</Container>
			</ChakraProvider>
		</div>
	);
}

export default App;
