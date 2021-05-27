import {
	Button,
	Checkbox,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CopyBox from '../CopyBox';
export default function RandomArray() {
	const [array, setArray] = useState('');
	const {
		handleSubmit,
		register,
		getValues,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			numTestCases: 10,
			sizeMin: 0,
			sizeMax: 10000,
			maxEle: 10000,
			minEle: 1000,
			isInt: true,
			tcFlag: true,
			isDistinct: true,
		},
		mode: 'onBlur',
	});

	const onSubmit = async (values) => {
		//const { data } = await axios.post('/api/v1/random/array', values);
		//setArray(JSON.stringify(data.array));
		console.log(values);
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
							defaultValue={15}
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
							})}
						/>
						{errors.maxEle && (
							<FormErrorMessage>{errors.maxEle.message}</FormErrorMessage>
						)}
					</FormControl>

					<FormControl isInvalid={errors.minEle}>
						<FormLabel htmlFor='minEle'>Minimum Element</FormLabel>
						<Input
							defaultValue={15}
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
								validate: {
									lessThanMax: (v) => parseInt(v) < getValues('maxEle'),
								},
							})}
						/>
						{errors.minEle && errors.minEle.type === 'lessThanMax' ? (
							<FormErrorMessage>
								Minimum value should be less than Maximum
							</FormErrorMessage>
						) : (
							<FormErrorMessage>{errors.minEle?.message}</FormErrorMessage>
						)}
					</FormControl>

					<Grid templateColumns='repeat(3, 1fr)' gap={6}>
						<Checkbox name='isInt' {...register('isInt')}>
							Is Integer Array
						</Checkbox>
						<Checkbox name='tcFlag' {...register('tcFlag')}>
							Include Test Case Flag
						</Checkbox>
						<Checkbox name='isDistinct' {...register('isDistinct')}>
							Distinct Array
						</Checkbox>
					</Grid>
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
			<CopyBox data={array} />
		</>
	);
}
