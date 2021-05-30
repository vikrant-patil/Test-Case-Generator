import {
	Button,
	Checkbox,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	Input,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CopyBox from '../CopyBox';

export default function RandomArray() {
	const [results, setResults] = useState('');
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			minEle: 'A',
			maxEle: 'Z',
			numTestCases: 2,
			tcFlag: true,
			isDistinct: false,
			isSorted: true,
			sizeMin: 1,
			sizeMax: 10,
			sizeFlag: true,
		},
		mode: 'onBlur',
	});

	const onSubmit = async (values) => {
		const { data } = await axios.post('/api/v1/random/strings', values);
		if (data.message === 'Success!') {
			let res = '\n';
			if (data.tcFlag === true) res += `${data.numTestCases}\n\n`;
			data.strings.forEach((i) => {
				if (i.size) res += `${i.size}\n`;
				res += `${i.string}\n\n`;
			});
			setResults(res);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid templateColumns='repeat(3, 1fr)' gap={6}>
					<FormControl isInvalid={errors.numTestCases}>
						<FormLabel htmlFor='numTestCases'>Number of TestCases</FormLabel>
						<Input
							defaultValue={15}
							type='number'
							keepWithinRange={false}
							clampValueOnBlur={false}
							{...register('numTestCases', {
								valueAsNumber: true,
								min: {
									value: -10000,
									message: 'The number should be between -10000 & 10000',
								},
								max: {
									value: 10000,
									message: 'The number should be between -10000 & 10000',
								},
							})}
						/>
						{errors.numTestCases && (
							<FormErrorMessage>{errors.numTestCases.message}</FormErrorMessage>
						)}
					</FormControl>

					<FormControl isInvalid={errors.sizeMin}>
						<FormLabel htmlFor='sizeMin'>Minimum Array Size</FormLabel>
						<Input
							defaultValue={15}
							type='number'
							keepWithinRange={false}
							clampValueOnBlur={false}
							{...register('sizeMin', {
								valueAsNumber: true,
								min: {
									value: -10000,
									message: 'The number should be between -10000 & 10000',
								},
								max: {
									value: 10000,
									message: 'The number should be between -10000 & 10000',
								},
							})}
						/>
						{errors.sizeMin && (
							<FormErrorMessage>{errors.sizeMin.message}</FormErrorMessage>
						)}
					</FormControl>

					<FormControl isInvalid={errors.sizeMax}>
						<FormLabel htmlFor='sizeMax'>Maximum Array Size</FormLabel>
						<Input
							defaultValue={15}
							type='number'
							keepWithinRange={false}
							clampValueOnBlur={false}
							{...register('sizeMax', {
								valueAsNumber: true,
								min: {
									value: -10000,
									message: 'The number should be between -10000 & 10000',
								},
								max: {
									value: 10000,
									message: 'The number should be between -10000 & 10000',
								},
							})}
						/>
						{errors.sizeMax && (
							<FormErrorMessage>{errors.sizeMax.message}</FormErrorMessage>
						)}
					</FormControl>

					<FormControl isInvalid={errors.maxEle}>
						<FormLabel htmlFor='maxEle'>Maximum Element</FormLabel>
						<Input
							keepWithinRange={false}
							clampValueOnBlur={false}
							{...register('maxEle')}
						/>
						{errors.maxEle && (
							<FormErrorMessage>{errors.maxEle.message}</FormErrorMessage>
						)}
					</FormControl>

					<FormControl isInvalid={errors.minEle}>
						<FormLabel htmlFor='minEle'>Minimum Element</FormLabel>
						<Input
							keepWithinRange={false}
							clampValueOnBlur={false}
							{...register('minEle')}
						/>
						{errors.minEle && errors.minEle.type === 'lessThanMax' ? (
							<FormErrorMessage>
								Minimum value should be less than Maximum
							</FormErrorMessage>
						) : (
							<FormErrorMessage>{errors.minEle?.message}</FormErrorMessage>
						)}
					</FormControl>
				</Grid>
				<Grid templateColumns='repeat(4, 0.5fr)' gap={6} mt={4}>
					<Checkbox name='sizeFlag' {...register('sizeFlag')}>
						Size Flag
					</Checkbox>
					<Checkbox name='tcFlag' {...register('tcFlag')}>
						Include Test Case Flag
					</Checkbox>
					<Checkbox name='isDistinct' {...register('isDistinct')}>
						Distinct Array
					</Checkbox>
					<Checkbox name='isSorted' {...register('isSorted')}>
						Sorted Array
					</Checkbox>
				</Grid>
				<Button
					mt={8}
					bg='green.400'
					color='white'
					_hover={{ bg: 'green.600' }}
					isLoading={isSubmitting}
					type='submit'>
					Submit
				</Button>
			</form>
			<CopyBox data={results} />
		</>
	);
}
