import argon2 from "argon2";
import bcrypt from "bcrypt";

import { StatusCodes } from "http-status-codes";
import { createUser } from "./user.service";

export const registerUserHandler = async (req, res) => {
  console.log(req.body);
  let { email, password, name } = req.body;

  password = await bcrypt.hashSync("password", 10);

  try {
    await createUser({ name, email, password });
    return res.status(StatusCodes.CREATED).send("user created successfully");
  } catch (e) {
    if (e.code === 11000) {
      return res.status(StatusCodes.CONFLICT).send("User already exist");
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
};
