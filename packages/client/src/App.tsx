import {
	createTheme,
	CssBaseline,
	PaletteMode,
	Theme,
	ThemeProvider,
	useMediaQuery,
} from '@mui/material';
import { Suspense, useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import ErrorBoundary from './components/ErrorBoundary';
import FriendSearch from './components/FriendSearch';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import SignUpLogin from './components/SignUpLogin';
import { useSocketConnect } from './hooks/useSocket';
import currentUserState from './recoil/currentUser/atom';
import themeState from './recoil/theme/atom';

const getTheme = (mode: PaletteMode): Theme =>
	createTheme({
		palette: {
			mode,
			background: {
				default: mode === 'light' ? '#F0F2F5' : '#18191A',
			},
		},
	});

const Main = () => {
	useSocketConnect();

	return (
		<>
			<Navbar />
			<FriendSearch />
		</>
	);
};

const App = () => {
	const [theme, setTheme] = useRecoilState(themeState);

	const prefThemeMode = useMediaQuery('(prefers-color-scheme: dark)')
		? 'dark'
		: 'light';

	const muiTheme = useMemo(
		() => getTheme(theme.isUserPicked ? theme.mode : prefThemeMode),
		[prefThemeMode, theme]
	);

	useEffect(() => {
		if (theme.isUserPicked) return;

		setTheme({
			isUserPicked: false,
			mode: prefThemeMode,
		});
	}, [prefThemeMode, setTheme, theme.isUserPicked]);

	const currentUser = useRecoilValue(currentUserState);

	return (
		<ThemeProvider theme={muiTheme}>
			<CssBaseline />
			<Suspense fallback={<Loading />}>
				<ErrorBoundary>
					{!currentUser ? <SignUpLogin /> : <Main />}
				</ErrorBoundary>
			</Suspense>
		</ThemeProvider>
	);
};

export default App;
