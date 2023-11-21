import mongoose, { Schema, Document, Model } from "mongoose";
const bcrypt = require("bcryptjs");

require("dotenv").config();
const JWT = require ("jsonwebtoken");


const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  comparePassword: (passwords: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}

const UserSchema: Schema<UserInterface> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a username"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value);
        },
        message: "Please enter a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      // required: [true, "Please enter your password"],
      minlength: [6, "password must be of 6 characters"],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        courseId: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// hashing password before saving to database
UserSchema.pre<UserInterface>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 20);
  next();
});

// sign access token
UserSchema.methods.SignAccessToken = function () {
  return JWT.sign({ id: this._id }, ACCESS_TOKEN || "", {
    expiresIn: "5m",
  });
};

// sign refresh token
UserSchema.methods.SignRefreshToken = function () {
  return JWT.sign({ id: this._id }, REFRESH_TOKEN || "", {
    expiresIn: "3d",
  });
};

// compair password
UserSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel: Model<UserInterface> = mongoose.model("User", UserSchema);
export default userModel;
