import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
	console.log('Using .env file to supply config environment variables');
	dotenv.config({ path: '.env' });
} else if (fs.existsSync('.env.development')) {
	console.log(
		'Using .env.development file to supply config environment variables'
	);
	dotenv.config({ path: '.env.development' });
} else {
	console.error('No ENV file was provided');
	process.exit(1);
}

const getEnvVar = (envVarName: string): string => {
	const envVar = process.env[envVarName];
	if (!envVar) {
		console.error(`Set ${envVarName} environment variable.`);
		process.exit(1);
	}
	return envVar;
};

export const IS_PROD = process.env.NODE_ENV === 'production';
export const PORT = getEnvVar('PORT');
