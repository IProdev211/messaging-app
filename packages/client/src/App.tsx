import {
	createTheme,
	CssBaseline,
	PaletteMode,
	Theme,
	ThemeProvider,
	useMediaQuery,
} from '@mui/material';
import { Suspense, useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';
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

	return (
		<ThemeProvider theme={muiTheme}>
			<CssBaseline />
			<Suspense fallback={<Loading />}>
				<ErrorBoundary></ErrorBoundary>
			</Suspense>
		</ThemeProvider>
	);
};

export default App;
