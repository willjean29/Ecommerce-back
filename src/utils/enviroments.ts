const ENV = {
  API: {
    PORT: process.env.PORT || 4000,
    HOST: process.env.HOST || "0.0.0.0",
  },
  DB: {
    URI:
      process.env.MONGO_URI ||
      "mongodb+srv://pixie:pixie123@cluster0.g8kd3.mongodb.net/ecommerce",
  },
  JWT: {
    ACCESS: process.env.JWT_ACCESS || "1234546",
    ACCESS_EXPIRED: process.env.JWT_ACCESS_EXPIRED || "2m",
    REFRESH: process.env.JWT_REFRESH || "123456",
    REFRESH_EXPIRED: process.env.JWT_REFRESH_EXPIRED || "1y",
  },
};

export default ENV;
