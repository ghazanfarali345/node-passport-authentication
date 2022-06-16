import express from "express";
import passport from "passport";
import { loginHandler } from "./auth.controller";

// const FRONTEND_HOST = "http://localhost:3000";
const FRONTEND_HOST = "https://passport-nextjs.vercel.app/";

const router = express.Router();

router.post(
  "/",
  // removes extra fields from body
  loginHandler
);

router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: `${FRONTEND_HOST}`,
    successRedirect: FRONTEND_HOST,
  })
  // (req, res) => {
  //   res.send(`${FRONTEND_HOST}`);
  // }
);
export default router;
