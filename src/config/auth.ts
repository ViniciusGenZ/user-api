const authConfig = {
  expiresIn: '24h',
  secret: process.env.jwtSecret,
};

export default authConfig;
