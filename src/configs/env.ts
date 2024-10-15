import * as dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV || 'local';
const envFilePath = `.env.${nodeEnv}`;

dotenv.config({ path: envFilePath });

console.log(`Loaded environment from ${envFilePath}`);
