import chalk from 'chalk';
import { connectDB } from './config/db';
import { IS_PROD, PORT } from './config/secrets';
import server from './config/server';

const main = async () => {
	const mode = IS_PROD
		? chalk.underline.green('Production')
		: chalk.underline.yellow('Development');

	const logMsg = IS_PROD
		? chalk.blue(`Server 🚀 in ${mode} mode on port: ${PORT}`)
		: chalk.blue(`Server 🚀 in ${mode} mode at: http://localhost:${PORT}`);

	await connectDB();
	server.listen(PORT, () => console.log(logMsg));
};

main();
