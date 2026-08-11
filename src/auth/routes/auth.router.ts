import {Router} from "express";
import {authLoginHandler} from "./handlers/auth-login.handler";
import {AUTH_ROUTES} from "../constants/auth.paths";
import {inputValidatorDtoAuthMiddleware} from "../validation/inputValidationDtoAuth";

export const authRouter = Router({})

authRouter.post(AUTH_ROUTES.LOGIN, inputValidatorDtoAuthMiddleware, authLoginHandler)
// authRouter.get(AUTH_ROUTES.ME, authMeHandler)
