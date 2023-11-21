import mongoose from "mongoose";
require("dotenv").config();

const db_username = process.env.DB_USER_NAME;
const db_password = process.env.DB_PASSWORD;

export const connectDB = async () => {
  try {
    await mongoose
      .connect(
        `mongodb+srv://${db_username}:${db_password}@learnbay.wxqadgk.mongodb.net/learnbay?retryWrites=true&w=majority`
      )
      .then((data: any) => {
        console.log(
          `🎉 Database connected successfully to HOST:==> ${data.connection.host}`
        );
      });
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};
