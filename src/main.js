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
app.use(cors());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
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
