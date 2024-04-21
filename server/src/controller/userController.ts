import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import UserModel from "../model/UserModel";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

interface UserRequest extends Request {
  user?: JwtPayload | (string & { userId?: string });
}

const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email }).populate(
      "role"
    );

    if (!user) {
      return res.status(403).json({ message: "Invalid user not found	" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(403).json({ message: "Invalid password	" });
    }

    const token = generateAccessToken({
      user,
      role: (user.role as any)?.name,
    });
    res.status(200).json({
      user,
      role: (user.role as any)?.name,
      token: token,
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
    throw new Error("Login failed");
  }
};

function generateAccessToken(userData: any) {
  const accessToken = jwt.sign(userData, process.env.JWT_SECRET as Secret, {
    expiresIn: "3h",
  });
  return accessToken;
}

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
      role: req.body.role,
    });

    const accessToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        username: user.username,
      },
      process.env.JWT_SECRET as Secret,
      { expiresIn: "3h" }
    );

    const savedUser = await user.save();

    res.status(201).json({
      results: savedUser,
      role: user?.role,
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

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const listusers = await UserModel.find()
      .select("-password -confirmPassword")
      .populate("role");

    return res.status(200).json(listusers);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get list user",
    });
  }
};

const getInfoUser = async (req: UserRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { user } = req.user as any;

    const data = await UserModel.findOne({ _id: user._id }).select(
      "-password -confirmPassword"
    );

    if (user) {
      return res.status(200).json({
        success: true,
        results: data,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        error: "UserId not found",
      });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ msg: "Update failed" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(401).json({
        message: "Mã người dùng không hợp lệ hoặc không tồn tại",
      });
    }

    res.status(200).json({
      message: "Xóa người dùng thành công",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Lỗi khi xóa danh mục sản phẩm",
    });
  }
};

export {
  loginUser,
  registerUser,
  getAllUsers,
  getInfoUser,
  updateUser,
  deleteUser,
};
