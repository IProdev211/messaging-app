import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import path from 'path';
import { IS_PROD } from './config/secrets';

const app = express();

// Enabling helmet
app.use(helmet({ contentSecurityPolicy: false }));

// Prevent http param pollution
app.use(hpp());

// Limiting each IP to 100 requests per windowMs
if (IS_PROD) {
	const limiter = rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100,
	});

	app.use('/rest', limiter);
}

// Dev logging middleware
if (!IS_PROD) {
	app.use(morgan('dev'));
}

app.get('/api', (req, res) => {
	res.send('Hello World!');
});

// Serve static assets in production
if (IS_PROD) {
	app.use(express.static(path.join(__dirname, '../../client/dist')));
	app.get('/', function (req, res) {
		res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
	});
}

export default app;
