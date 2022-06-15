import express from "express";
import passport from "passport";

import { registerUserHandler } from "./user.controller";

const router = express.Router();

router.post("/", registerUserHandler);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.headers);
    return res.status(200).send({
      success: true,
      message: "user profile",
    });
  }
);

export default router;
