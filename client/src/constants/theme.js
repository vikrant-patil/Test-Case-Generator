// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	fonts: {
		heading: 'poppins',
		body: 'poppins',
	},
	shadows: {
		largeSoft: 'rgba(60, 64, 67, 0.15) 0px 2px 10px 6px;',
	},
	styles: {
		global: {
			'html, #__next': {
				height: '100%',
			},
			'#__next': {
				display: 'flex',
				flexDirection: 'column',
			},
			'.body': {
				overflowY: 'scroll', // Always show scrollbar to avoid flickering
			},
			html: {
				scrollBehavior: 'smooth',
			},
			'#nprogress': {
				pointerEvents: 'none',
			},
			'#nprogress .bar': {
				background: 'green.200',
				position: 'fixed',
				zIndex: '1031',
				top: 0,
				left: 0,
				width: '100%',
				height: '2px',
			},
		},
	},
});

export default theme;
