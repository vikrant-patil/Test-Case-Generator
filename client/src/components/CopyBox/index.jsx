import { Box, Heading, useColorMode } from '@chakra-ui/react';
import { default as React } from 'react';
import { CopyBlock, dracula, github } from 'react-code-blocks';

export default function CopyBox({ data }) {
	const { colorMode } = useColorMode();

	return (
		<Box mt={16}>
			<div
				style={{
					width: '100%',
					flex: 1,
					background: colorMode === 'dark' ? '#2F855A' : '#48bb78',
					padding: '1em',
					paddingBottom: '2em',
				}}>
				<Heading
					as='h5'
					size='md'
					textAlign='center'
					py={2}
					isTruncated
					color={
						colorMode === 'dark' ? dracula.textColor : github.builtInColor
					}>
					Result
				</Heading>
				<CopyBlock
					text={data}
					wrapLines={true}
					language='python'
					theme={colorMode === 'dark' ? dracula : github}
					customStyle={{
						height: '250px',
						overflowY: 'scroll',
						margin: '0px 0.75rem',
						borderRadius: '5px',
						boxShadow: '1px 2px 3px rgba(0,0,0,0.35)',
						fontSize: '1.2rem',
					}}
				/>
			</div>
		</Box>
	);
}
