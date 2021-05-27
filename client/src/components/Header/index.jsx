import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Flex, HStack, IconButton, useColorMode } from '@chakra-ui/react';

export default function Header() {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<>
			<Box px={4}>
				<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
					<HStack spacing={8} alignItems={'center'}>
						<Box>Test Case Generator</Box>
					</HStack>
					<Flex alignItems={'center'}>
						<IconButton
							aria-label='Color mode'
							onClick={toggleColorMode}
							icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
							colorScheme='gray'
							variant={'ghost'}
						/>
					</Flex>
				</Flex>
			</Box>
		</>
	);
}
