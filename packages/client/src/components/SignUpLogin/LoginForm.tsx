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
import { useState } from 'react';
import useLogin from '../../hooks/useLogin';

const LoginForm = () => {
	const {
		useFormReturn: {
			register,
			formState: { errors },
		},
		useMutationResult: { isLoading, status, isError, error },
		onSubmit,
	} = useLogin();

	const [showPassword, setShowPassword] = useState(false);
	const handleToggleShowPassword = () => setShowPassword((prev) => !prev);

	let btnText = 'log in';
	switch (status) {
		case 'idle':
			btnText = 'log in';
			break;
		case 'loading':
			btnText = 'logging in...';
			break;
		case 'error':
			btnText = error?.response?.data?.error ?? 'something went wrong';
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

				<FormControl variant='outlined' error={Boolean(errors.password)}>
					<InputLabel htmlFor='password'>Password</InputLabel>
					<OutlinedInput
						id='password'
						label='Password'
						type={showPassword ? 'text' : 'password'}
						{...register('password')}
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
					<FormHelperText id='password'>
						{errors.password?.message}
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
				<Button disabled={true} variant='text' size='small'>
					Forget password?
				</Button>
			</Stack>
		</Stack>
	);
};

export default LoginForm;
