export default () => ({
  port: process.env.PORT,
  database: {
    url: process.env.DB_URL,
  },
  secretKey: process.env.SECRET_KEY,
  iv: process.env.IV,
  token: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
  },
  nodemailer: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT
  },
});
