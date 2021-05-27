import { ChakraProvider, ColorModeScript, Container } from '@chakra-ui/react';
import Header from './components/Header';
import Layout from './components/Layout';
import theme from './constants/theme';
function App() {
	return (
		<div className='App'>
			<ChakraProvider theme={theme}>
				<ColorModeScript />
				<Container maxW='container.xl' margin='auto'>
					<Header />
					<Layout />
				</Container>
			</ChakraProvider>
		</div>
	);
}

export default App;
