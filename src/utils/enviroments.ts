const ENV = {
  API: {
    PORT: process.env.PORT || 4000,
    HOST: process.env.HOST || "0.0.0.0",
  },
  DB: {
    URI: process.env.MONGO_URI,
  },
  JWT: {
    ACCESS: process.env.JWT_ACCESS || "",
    ACCESS_EXPIRED: process.env.JWT_ACCESS_EXPIRED || "",
    REFRESH: process.env.JWT_REFRESH || "",
    REFRESH_EXPIRED: process.env.JWT_REFRESH_EXPIRED || "",
  },
};

export default ENV;
