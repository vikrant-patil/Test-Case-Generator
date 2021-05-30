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

export default function RandomCharMatrix() {
	const [result, setResult] = useState('');
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			rowMin: 2,
			rowMax: 3,
			colMin: 2,
			colMax: 3,
			isInt: true,
			minEle: 4,
			maxEle: 38,
			numTestCases: 2,
			tcFlag: true,
			isDistinct: false,
		},
		mode: 'onBlur',
	});

	const onSubmit = async (values) => {
		const { data } = await axios.post('/api/v1/random/numbers/matrix', values);

		if (data.message === 'Success!') {
			let res = '\n';
			if (data.tcFlag === true) res += `${data.numTestCases}\n\n`;
			data.matrices.forEach((i) => {
				if (i.rowSize) res += `${i.rowSize} ${i.colSize}\n`;
				res += `${JSON.stringify(i.matrix)}\n\n`;
			});
			setResult(res);
		}
	};

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
							keepWithinRange={false}
							clampValueOnBlur={false}
							{...register('minEle')}
							type='number'
						/>
						{errors.minEle && (
							<FormErrorMessage>{errors.minEle.message}</FormErrorMessage>
						)}
					</FormControl>
					<FormControl isInvalid={errors.maxEle}>
						<FormLabel htmlFor='maxEle'>Maximum</FormLabel>
						<Input
							keepWithinRange={false}
							clampValueOnBlur={false}
							{...register('maxEle')}
							type='number'
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

				<Grid templateColumns='repeat(4, 1fr)' gap={6} mt={4}>
					{' '}
					<FormControl isInvalid={errors.rowMin}>
						<FormLabel htmlFor='rowMin'>Minimum rows</FormLabel>
						<Input
							type='number'
							keepWithinRange={false}
							clampValueOnBlur={false}
							{...register('rowMin', {
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
						{errors.rowMin && (
							<FormErrorMessage>{errors.rowMin.message}</FormErrorMessage>
						)}
					</FormControl>
					<FormControl isInvalid={errors.rowMax}>
						<FormLabel htmlFor='rowMax'>Maximum Rows</FormLabel>
						<Input
							keepWithinRange={false}
							clampValueOnBlur={false}
							{...register('rowMax')}
						/>
						{errors.rowMax && errors.rowMax.type === 'greaterThanMin' ? (
							<FormErrorMessage>
								Max value should be greater than min
							</FormErrorMessage>
						) : (
							<FormErrorMessage>{errors.maxEle?.message}</FormErrorMessage>
						)}
					</FormControl>
					<FormControl isInvalid={errors.colMin}>
						<FormLabel htmlFor='colMin'>Minimum Columns</FormLabel>
						<Input
							keepWithinRange={false}
							clampValueOnBlur={false}
							{...register('colMin')}
						/>
						{errors.colMin && (
							<FormErrorMessage>{errors.maxEle?.message}</FormErrorMessage>
						)}
					</FormControl>
					<FormControl isInvalid={errors.colMax}>
						<FormLabel htmlFor='colMax'>Minimum Columns</FormLabel>
						<Input
							keepWithinRange={false}
							clampValueOnBlur={false}
							{...register('colMax')}
						/>
						{errors.colMax && errors.colMax.type === 'greaterThanMin' ? (
							<FormErrorMessage>
								Max value should be greater than min
							</FormErrorMessage>
						) : (
							<FormErrorMessage>{errors.maxEle?.message}</FormErrorMessage>
						)}
					</FormControl>
				</Grid>

				<Grid templateColumns='repeat(3, 1fr)' gap={2} mt={4}>
					<Checkbox name='tcFlag' {...register('tcFlag')}>
						Include Test Case Flag
					</Checkbox>
					<Checkbox name='isDistinct' {...register('isDistinct')}>
						Distinct Matrices
					</Checkbox>
					<Checkbox name='isInt' {...register('isInt')}>
						Integer matrix
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
