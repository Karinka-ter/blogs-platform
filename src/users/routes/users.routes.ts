import {Router} from "express";
import {getUsersHandler} from "./handlers/get-users.handler";
import {USERS_ROUTES} from "../constans/users.paths";


export const usersRouter = Router({});

usersRouter
    .get(USERS_ROUTES.ROOT,getUsersHandler)