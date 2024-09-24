import { Request, Response } from "express";
import { handlerHttp } from "../../utils/error.handler";
import { bdErrors } from "../../enums/dbError.enums";
import { authAdapter } from "../../adapters/auth.adapters";
import { loginUser } from "../../services/auth/v1/auth.services";

export const loginController = async (req: Request, res: Response) => {
  try {
    const authVar = authAdapter(req)
    const datosAuth = await loginUser(authVar)
    res.send(datosAuth)
  } catch (error: Error | any) {
    handlerHttp(res, bdErrors.ERROR_POST_LOGIN, error)
  }
}