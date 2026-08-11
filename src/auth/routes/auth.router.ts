import {Router} from "express";
import {authLoginHandler} from "./handlers/auth-login.handler";
import {AUTH_ROUTES} from "../constants/auth.paths";
import {authMeHandler} from "./handlers/auth-me.hadler";
import {inputValidatorMiddleware} from "../validation/inputValidationDtoAuth";

export const authRouter = Router({})

authRouter.post(AUTH_ROUTES.LOGIN, inputValidatorMiddleware, authLoginHandler)
// authRouter.get(AUTH_ROUTES.ME, authMeHandler)
