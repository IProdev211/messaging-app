import { LightMode } from '@mui/icons-material';
import DarkMode from '@mui/icons-material/DarkMode';
import { IconButton, Stack } from '@mui/material';
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
		<>
			<Stack
				direction={{ xs: 'column', sm: 'row' }}
				spacing={3}
				justifyContent='space-evenly'
				alignItems='center'
				sx={{ height: { md: 'calc(100vh - 5rem)' }, mt: '1.5rem' }}
			>
				<SignUpForm />
				<LoginForm />
			</Stack>
			<Stack justifyContent='center' alignItems='center'>
				<IconButton size='large' onClick={handleToggleTheme}>
					{theme.mode === 'dark' ? <DarkMode /> : <LightMode />}
				</IconButton>
			</Stack>
		</>
	);
};

export default SignUpLogin;
