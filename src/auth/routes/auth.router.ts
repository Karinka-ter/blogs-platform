import {Router} from "express";
import {authLoginHandler} from "./handlers/auth-login.handler";
import {AUTH_ROUTES} from "../constants/auth.paths";
import {inputValidatorDtoAuthMiddleware} from "../validation/inputValidationDtoAuth";
import {inputValidationResultMiddleware} from "../../core/middlewares/validator/input-validation-result.middleware";

export const authRouter = Router({})

authRouter.post(AUTH_ROUTES.LOGIN, inputValidatorDtoAuthMiddleware,inputValidationResultMiddleware, authLoginHandler)
// authRouter.get(AUTH_ROUTES.ME, authMeHandler)
