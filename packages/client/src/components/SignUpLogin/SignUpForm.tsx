import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
	Button,
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Stack,
} from '@mui/material';
import React, { useState } from 'react';
import useSignUp from '../../hooks/useSignUp';

const SignUpForm = () => {
	const {
		useFormReturn: {
			register,
			formState: { errors },
		},
		useMutationReturn: { status, isLoading, isError },
		onSubmit,
	} = useSignUp();

	const [showPassword, setShowPassword] = useState(false);
	const handleToggleShowPassword = () => setShowPassword((prev) => !prev);

	let btnText = 'sign up';
	switch (status) {
		case 'idle':
			btnText = 'sign up';
			break;
		case 'loading':
			btnText = 'signing up...';
			break;
		case 'success':
			btnText = 'try logging in';
			break;
		case 'error':
			btnText = 'something went wrong';
			break;
		default:
			break;
	}

	return (
		<Stack
			direction={{ xs: 'column', md: 'row' }}
			justifyContent={{ xs: 'flex-start', md: 'center' }}
			spacing={3}
		>
			<Stack spacing={2} component='form' onSubmit={onSubmit}>
				<FormControl variant='outlined' error={Boolean(errors.userName)}>
					<InputLabel htmlFor='userName'>Username</InputLabel>
					<OutlinedInput
						id='userName'
						label='userName'
						{...register('userName')}
						disabled={isLoading}
					/>
					<FormHelperText id='userName'>
						{errors.userName?.message}
					</FormHelperText>
				</FormControl>

				<FormControl variant='outlined' error={Boolean(errors.email)}>
					<InputLabel htmlFor='email'>Email</InputLabel>
					<OutlinedInput
						id='email'
						label='Email'
						{...register('email')}
						disabled={isLoading}
					/>
					<FormHelperText id='email'>{errors.email?.message}</FormHelperText>
				</FormControl>

				<FormControl variant='outlined' error={Boolean(errors.confirmEmail)}>
					<InputLabel htmlFor='confirmEmail'>Confirm Email</InputLabel>
					<OutlinedInput
						id='confirmEmail'
						label='confirmEmail'
						{...register('confirmEmail')}
						disabled={isLoading}
					/>
					<FormHelperText id='email'>
						{errors.confirmEmail?.message}
					</FormHelperText>
				</FormControl>

				<FormControl variant='outlined' error={Boolean(errors.email)}>
					<InputLabel htmlFor='password'>password</InputLabel>
					<OutlinedInput
						id='password'
						label='password'
						type={showPassword ? 'text' : 'password'}
						{...register('password')}
						disabled={isLoading}
					/>
					<FormHelperText id='email'>{errors.password?.message}</FormHelperText>
				</FormControl>

				<FormControl variant='outlined' error={Boolean(errors.confirmPassword)}>
					<InputLabel htmlFor='confirmPassword'>Confirm Password</InputLabel>
					<OutlinedInput
						id='confirmPassword'
						label='confirmPassword'
						type={showPassword ? 'text' : 'password'}
						{...register('confirmPassword')}
						disabled={isLoading}
						endAdornment={
							<InputAdornment position='end'>
								<IconButton
									aria-label='toggle password visibility'
									onClick={handleToggleShowPassword}
									edge='end'
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
					/>
					<FormHelperText id='confirmPassword'>
						{errors.confirmPassword?.message}
					</FormHelperText>
				</FormControl>

				<Button
					variant='contained'
					size='large'
					type='submit'
					disabled={isLoading}
					color={isError ? 'error' : 'primary'}
				>
					{btnText}
				</Button>
			</Stack>
		</Stack>
	);
};

export default SignUpForm;
