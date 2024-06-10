import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();

type Data = {
  role: string;
  isAdmin: boolean;
};
declare global {
  interface UserRequest extends Request {
    user?: JwtPayload | (string & { user?: Data });
  }
}

function checkToken(req: UserRequest, res: Response, next: NextFunction) {
  if (req.url.toLowerCase().trim() === "/users/login".toLowerCase().trim()) {
    return next();
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
  } catch (error: any) {
    console.error("JWT verification failed:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json("Invalid JWT token");
    } else {
      return res.status(500).json("Internal server error");
    }
  }
}

const verifyTokenAndAuthorization = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  checkToken(req, res, () => {
    if (
      req.user?.user?.role === "admin" ||
      req.user?.user?.role === "manager"
    ) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  checkToken(req, res, () => {
    console.log(req.user?.user.isAdmin);
    if (req.user?.user?.role === "admin" || req.user?.user?.isAdmin === true) {
      next();
    } else {
      res.status(403).json("You are not as a admin!");
    }
  });
};

export { verifyTokenAndAuthorization, checkToken, verifyTokenAndAdmin };
