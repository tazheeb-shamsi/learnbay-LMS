import { app } from "./app";
import { v2 as cloudinary } from "cloudinary";

import { connectDB } from "./utils/db";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 8000;

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//creating server
app.listen(PORT, () => {
  console.log(` Server listening on port: ${PORT}`);
  connectDB();
});
