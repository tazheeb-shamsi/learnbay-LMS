import { app } from "./app";
import { connectDB } from "./utils/db";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 8000;

//creating server
app.listen(PORT, () => {
  console.log(` Server listening on port: ${PORT}`);
  connectDB();
});
