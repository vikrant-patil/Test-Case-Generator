import React from 'react';
import Layout from '../Layout';
import RandomNumberArray from './RandomNumberArray';
import RandomNumberMatrix from './RandomNumberMatrix';

export default function RandomCharacters() {
	const dataType = ['Number Array', 'Number Matrix'];
	const forms = [<RandomNumberArray />, <RandomNumberMatrix />];

	return (
		<>
			<Layout dataType={dataType} forms={forms} />
		</>
	);
}
