import { Request } from "express";
import { IAuth } from "../interfaces/auth.interfaces";

export const authAdapter = (req: Request): IAuth => {
  const { username, password } = req.body
  const auth: IAuth = {
    username: username,
    password: password
  }

  return auth
}