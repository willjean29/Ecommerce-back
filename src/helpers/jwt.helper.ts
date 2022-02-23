import jwt, { Secret } from "jsonwebtoken";

const generateJwt = (payload: string, key: string, expiresIn: string) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { payload },
      key as Secret,
      {
        expiresIn,
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(token);
      }
    );
  });
};

export default {
  generateJwt,
};
