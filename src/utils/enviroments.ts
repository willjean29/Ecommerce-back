import dotenv from "dotenv";
dotenv.config();
const ENV = {
  API: {
    PORT: process.env.PORT || 4000,
    HOST: process.env.HOST || "0.0.0.0",
  },
  DB: {
    URI: process.env.MONGO_URI,
  },
  JWT: {
    ACCESS: process.env.JWT_ACCESS_SECRET || "",
    ACCESS_EXPIRED: process.env.JWT_ACCESS_EXPERID || "",
    REFRESH: process.env.JWT_REFRESH_SECRET || "",
    REFRESH_EXPIRED: process.env.JWT_REFRESH_EXPERID || "",
  },
};

export default ENV;
