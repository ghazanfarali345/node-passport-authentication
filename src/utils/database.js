import mongoose from "mongoose";
import logger from "./logger";

const DB_CONNECTION_STRING = process.env.DB_STRING;

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    logger.info("Connect to database");
  } catch (error) {
    logger.error("Failed to connect to datatabse");
    process.exit(1);
  }
};

export const disconnectFromDatabase = async () => {
  await mongoose.connection.close();
  logger.info("Disconnect from database");
  return;
};
