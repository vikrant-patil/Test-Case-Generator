import React from 'react';
import Layout from '../Layout';
import RandomCharArray from './RandomCharArray';
import RandomCharMatrix from './RandomCharMatrix';

export default function RandomCharacters() {
	const dataType = ['Character Array', 'Character Matrix'];
	const forms = [<RandomCharArray />, <RandomCharMatrix />];

	return (
		<>
			<Layout dataType={dataType} forms={forms} />
		</>
	);
}
