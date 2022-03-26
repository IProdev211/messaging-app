import chalk from 'chalk';
import app from './app';
import { IS_PROD, PORT } from './config/secrets';

const mode = IS_PROD
	? chalk.underline.blue('Production')
	: chalk.underline.yellow('Development');

const logMsg = IS_PROD
	? chalk.green(`Server 🚀 in ${mode} mode on port: ${PORT}`)
	: chalk.green(`Server 🚀 in ${mode} mode at: http://localhost:${PORT}`);

app.listen(PORT, () => console.log(logMsg));
