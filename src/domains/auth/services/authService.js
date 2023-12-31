import { NotFoundError, UnauthorizedError } from "../../../errors";
import Auth from "../models/AuthModel";
import bcrypt from "bcrypt";

export const getAuthByUserId = (userId) => {
  return Auth.findOne({ user: userId });
};

export const verifyPassword = async (inputPassword, userPassword, context) => {
  const isPasswordValid = await bcrypt.compare(inputPassword, userPassword);

  const errorMessages = {
    login: "잘못된 이메일 또는 비밀번호",
    "change-password":
      "비밀번호 변경에 실패했습니다! 이전 비밀번호를 확인해주세요.",
  };
  if (!isPasswordValid) {
    const errorMsg = errorMessages[context] || "비밀번호가 틀렸습니다!";
    throw new UnauthorizedError(errorMsg, context);
  }
};

export const registerAuthentication = async (password, authId) => {
  const newAuth = await Auth.create({ password });
  newAuth.user = authId;
  await newAuth.save();
};

export const verifyAuth = async (userId, password, context = "login") => {
  const auth = await getAuthByUserId(userId);
  if (!auth) {
    throw new NotFoundError("요청한 인증을 찾을 수 없습니다.");
  }
  await verifyPassword(password, auth.password, context);
  return auth;
};

export const changePassword = async (userId, oldPassword, newPassword) => {
  const auth = await verifyAuth(userId, oldPassword, "change-password");
  auth.password = newPassword;
  await auth.save();
};
