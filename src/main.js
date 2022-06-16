import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";

import "./passport";
import userRoute from "./modules/user/user.route";
import authRoute from "./modules/auth/auth.route";

import "dotenv/config";

import logger from "./utils/logger";
import { connectToDatabase, disconnectFromDatabase } from "./utils/database";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

const server = app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server listening at http://localhost:${PORT}`);
});

const signals = ["SIGTERM", "SIGINT"];

const gracefulShutdown = (signal) => {
  process.on(signal, async () => {
    logger.info(`Good bye signals ${signal}`);
    server.close();

    // disconnect db
    await disconnectFromDatabase();
    logger.info("my work is done");
    process.exit(0);
  });
};

for (let i = 0; i < signals.length; i++) {
  gracefulShutdown(signals[i]);
}
