import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import UserModel from "../model/UserModel";
import jwt, { Secret } from "jsonwebtoken";

const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user?.password as string
    );
    if (!validPassword) {
      res.status(400).json("wrong password");
    } else {
      const accessToken = jwt.sign(
        {
          userId: user?._id,
          isAdmin: user?.isAdmin,
          username: user?.username,
        },
        process.env.JWT_SECRET as Secret,
        { expiresIn: "3h" }
      );
      res.status(200).json({
        user: user,
        token: accessToken,
        success: true,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const registerUser = async (req: Request, res: Response) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(req.body.password, salt);
    const hashedConfirmPw = await bcrypt.hash(req.body.confirmPassword, salt);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        error: "Mật khẩu xác nhận không khớp",
      });
    }

    const user = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPw,
      confirmPassword: hashedConfirmPw,
    });

    const accessToken = jwt.sign(
      {
        userId: user._id,
        isAdmin: user.isAdmin,
        username: user.username,
      },
      process.env.JWT_SECRET as Secret,
      { expiresIn: "3h" }
    );

    const savedUser = await user.save();

    res.status(201).json({
      results: savedUser,
      success: true,
      token: accessToken,
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "Đăng ký thất bại",
    });
  }
};

const getListUser = async (req: Request, res: Response) => {
  const query = req.query.new;
  try {
    const users = query
      ? await UserModel.find().sort({ _id: -1 }).limit(1)
      : await UserModel.find();
    res.status(200).json({ message: "Get user successfully", results: users });
  } catch (error) {
    res.status(500).json(error);
  }
};

export { loginUser, registerUser, getListUser };
