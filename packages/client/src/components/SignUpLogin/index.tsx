import { Chat, LightMode } from '@mui/icons-material';
import DarkMode from '@mui/icons-material/DarkMode';
import { IconButton, Stack, Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import themeState from '../../recoil/theme/atom';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const SignUpLogin = () => {
	const [theme, setTheme] = useRecoilState(themeState);

	const handleToggleTheme = () => {
		setTheme((currVal) => ({
			isUserPicked: true,
			mode: currVal.mode === 'dark' ? 'light' : 'dark',
		}));
	};

	return (
		<Stack height='100vh' justifyContent='space-between' p='18px' spacing={3}>
			<Stack direction='row' justifyContent='center' alignItems='center'>
				<Chat
					color='primary'
					sx={{ width: '40px', height: '40px', mr: '8px' }}
				/>
				<Typography variant='h4'>Messenger</Typography>
			</Stack>

			<Stack
				direction={{ xs: 'column', sm: 'row' }}
				spacing={3}
				justifyContent='space-evenly'
				alignItems='center'
			>
				<SignUpForm />
				<LoginForm />
			</Stack>
			<Stack justifyContent='center' alignItems='center'>
				<IconButton size='large' onClick={handleToggleTheme}>
					{theme.mode === 'dark' ? <DarkMode /> : <LightMode />}
				</IconButton>
			</Stack>
		</Stack>
	);
};

export default SignUpLogin;
