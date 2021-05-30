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

export default function RandomNumber() {
	const [result, setResult] = useState('');
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
		getValues,
	} = useForm({
		defaultValues: {
			isFloat: true,
			minEle: 10,
			maxEle: 212,
			numTestCases: 20,
			tcFlag: true,
			isDistinct: true,
			isSorted: true,
		},
		mode: 'onBlur',
	});

	const onSubmit = async (values) => {
		const { data } = await axios.post('/api/v1/random/numbers', values);

		if (data.message === 'Success!') {
			let res = '\n';
			if (data.tcFlag === true) res += `${data.numTestCases}\n\n`;
			data.array.forEach((i) => {
				res += `${i}\n`;
			});
			setResult(res);
		}
	};

	console.log(errors);

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid templateColumns='repeat(3, 1fr)' gap={6}>
					{' '}
					<FormControl isInvalid={errors.numTestCases}>
						<FormLabel htmlFor='numTestCases'>Number of testcases</FormLabel>
						<Input
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
					<FormControl isInvalid={errors.minEle}>
						<FormLabel htmlFor='minEle'>Minimum</FormLabel>
						<Input
							type='number'
							keepWithinRange={false}
							clampValueOnBlur={false}
							{...register('minEle', {
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
						{errors.minEle && (
							<FormErrorMessage>{errors.minEle.message}</FormErrorMessage>
						)}
					</FormControl>
					<FormControl isInvalid={errors.maxEle}>
						<FormLabel htmlFor='maxEle'>Maximum</FormLabel>
						<Input
							type='number'
							keepWithinRange={false}
							clampValueOnBlur={false}
							{...register('maxEle', {
								valueAsNumber: true,
								min: {
									value: -10000,
									message: 'The number should be between -10000 & 10000',
								},
								max: {
									value: 10000,
									message: 'The number should be between -10000 & 10000',
								},
								validate: {
									greaterThanMin: (v) => parseInt(v) > getValues('minEle'),
								},
							})}
						/>
						{errors.maxEle && errors.maxEle.type === 'greaterThanMin' ? (
							<FormErrorMessage>
								Max value should be greater than min
							</FormErrorMessage>
						) : (
							<FormErrorMessage>{errors.maxEle?.message}</FormErrorMessage>
						)}
					</FormControl>
				</Grid>
				<Grid templateColumns='repeat(4, 1fr)' gap={2} mt={4}>
					<Checkbox name='isFloat' {...register('isFloat')}>
						Float values
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

			<CopyBox data={result} />
		</>
	);
}
