import {Router} from "express";
import {authLoginHandler} from "./handlers/auth-login.handler";

export const authRouter =  Router({})

authRouter.post('',authLoginHandler)