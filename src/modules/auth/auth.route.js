import express from "express";
import { loginHandler } from "./auth.controller";

const router = express.Router();

router.post(
  "/",
  // removes extra fields from body
  loginHandler
);

export default router;
