import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URI,
  bcrypt_salt_rounds: process.env.BCRYPT_SALt_ROUNDS,
  default_password: process.env.DEFAULT_PASS,
};
