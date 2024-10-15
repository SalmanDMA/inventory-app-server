import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import './configs/env';

import { requestLogger, errorLogger } from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';

// Route Imports
import apiRouter from './routes';

// Configurations
const app = express();
app.use(requestLogger);

app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api/v1', apiRouter);

app.use(errorLogger);
app.use(errorHandler);

// Server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server started on port ${port}`));
