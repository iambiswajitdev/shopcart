import dotenv from "dotenv";

dotenv.config();

export default {
  app: {
    port: process.env.PORT,
  },
  mongodb: {
    url: process.env.MONGODB_URI,
  },
  jwt: {
    secretKey: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRE,
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
};
