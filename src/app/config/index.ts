import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URI,
  bcrypt_salt_rounds: process.env.BCRYPT_SALt_ROUNDS,
  default_password: process.env.DEFAULT_PASS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expipes_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expipes_in: process.env.JWT_REFRESH_EXPIRES_IN,
  reset_password_uilink: process.env.RESENT_PASSWORD_UILINK,
};
