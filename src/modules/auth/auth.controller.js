import { StatusCodes } from "http-status-codes";
import passport from "passport";

import { findUserByEmail } from "../user/user.service";
// import { LoginBody } from "./auth.schema";
import { signJwt } from "./auth.utils";

export const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  //find the user by email

  const user = await findUserByEmail(email);
  console.log({ user });
  if (!user || !user.comparePassword(password)) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("Invalid email or password");
  }

  const payload = user.toJSON();

  const jwt = signJwt(payload);

  res.cookie("accessToken", jwt, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
  });

  return res.status(StatusCodes.OK).send(jwt);
};
