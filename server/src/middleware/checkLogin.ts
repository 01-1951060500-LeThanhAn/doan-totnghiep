import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();

export default function checkLogin(
  req: UserRequest,
  res: Response,
  next: NextFunction
) {
  if (req?.url.toLowerCase().trim() == "/users/login".toLowerCase().trim()) {
    next();
  }

  const token =
    req?.headers?.authorization && req?.headers?.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json("Invalid authorization format. Missing token");
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET as Secret;
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        res.status(403).json("Token is valid");
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.log("Token is failed");
  }
}
