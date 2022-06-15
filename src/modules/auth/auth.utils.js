import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.APP_SECRET || "somesecret";
const EXPIRES_IN = process.env.JWT_SECRET || "1d";

export const signJwt = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: EXPIRES_IN,
  });
};

export const verifyJwt = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};
