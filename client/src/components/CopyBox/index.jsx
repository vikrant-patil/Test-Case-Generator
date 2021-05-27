import { Box, Heading } from '@chakra-ui/react';
import { default as React } from 'react';
import { CopyBlock, dracula } from 'react-code-blocks';

export default function CopyBox({ data }) {
	return (
		<Box mt={16}>
			<div
				style={{
					width: '100%',
					flex: 1,
					background: '#2F855A',
					padding: '1em',
					paddingBottom: '2em',
				}}>
				<Heading
					as='h5'
					size='md'
					textAlign='center'
					py={2}
					isTruncated
					color={dracula.textColor}>
					Result
				</Heading>
				<CopyBlock
					text={data}
					wrapLines={true}
					language='python'
					theme={dracula}
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
