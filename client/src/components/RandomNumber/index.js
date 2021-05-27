import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function RandomNumber() {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
		getValues,
	} = useForm({
		defaultValues: {
			minValue: 15,
			maxValue: 30,
		},
		mode: 'onBlur',
	});

	function onSubmit(values) {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log(JSON.stringify(values, null, 2));
				resolve();
			}, 3000);
		});
	}

	console.log(errors);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormControl isInvalid={errors.minValue}>
				<FormLabel htmlFor='minValue'>Minimum</FormLabel>
				<Input
					defaultValue={15}
					type='number'
					keepWithinRange={false}
					clampValueOnBlur={false}
					{...register('minValue', {
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
				{errors.minValue && (
					<FormErrorMessage>{errors.minValue.message}</FormErrorMessage>
				)}
			</FormControl>
			<FormControl isInvalid={errors.maxValue} mt={8}>
				<FormLabel htmlFor='maxValue'>Maximum</FormLabel>
				<Input
					defaultValue={15}
					type='number'
					keepWithinRange={false}
					clampValueOnBlur={false}
					{...register('maxValue', {
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
							greaterThanMin: (v) => parseInt(v) > getValues('minValue'),
						},
					})}
				/>
				{errors.maxValue && errors.maxValue.type === 'greaterThanMin' ? (
					<FormErrorMessage>
						Max value should be greater than min
					</FormErrorMessage>
				) : (
					<FormErrorMessage>{errors.maxValue?.message}</FormErrorMessage>
				)}
			</FormControl>
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
	);
}
