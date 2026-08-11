import {Router} from "express";
import {authLoginHandler} from "./handlers/auth-login.handler";
import {AUTH_ROUTES} from "../constants/auth.paths";
import {inputValidatorDtoAuthMiddleware} from "../validation/inputValidationDtoAuth";
import {inputValidationResultMiddleware} from "../../core/middlewares/validator/input-validation-result.middleware";
import {tokenValidationMiddleware} from "../../core/middlewares/validator/tokenValidation";
import {authMeHandler} from "./handlers/auth-me.hadler";

export const authRouter = Router({})

authRouter.post(AUTH_ROUTES.LOGIN, inputValidatorDtoAuthMiddleware,inputValidationResultMiddleware, authLoginHandler)
 authRouter.get(AUTH_ROUTES.ME,tokenValidationMiddleware, authMeHandler)
