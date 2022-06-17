import express from "express";
import passport from "passport";
import { loginHandler } from "./auth.controller";

// const FRONTEND_HOST = "http://localhost:3000";
const FRONTEND_HOST = "https://passport-nextjs.vercel.app";

const router = express.Router();

router.post(
  "/",
  // removes extra fields from body
  loginHandler
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["public_profile", "email"] })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/",
    // session: false,
    // successRedirect: FRONTEND_HOST,
  }),
  (req, res) => {
    // console.log(req.user);
    // const token = req.user.generateJWT();
    // res.cookie("x-auth-cookie", token);
    res.redirect(FRONTEND_HOST);
  }
);

router.get("/logout", (req, res) => {
  console.log({
    cookies: req.cookies,
    session: req.session,
  });
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(FRONTEND_HOST);
  });
});

export default router;
