import { Request } from "express";

import { UserInterface } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: UserInterface;
    }
  }
}
