import {Router} from "express";
import {getUsersHandler} from "./handlers/get-users.handler";
import {USERS_ROUTES} from "../constans/users.paths";
import {
    paginationAndSortingValidation
} from "../../core/middlewares/validator/query-pagination-sorting.validation.middleware";
import {UserSortField} from "./input/UsersSortField";
import {createUserHandler} from "./handlers/create-user.handler";
import {deleteUserHandler} from "./handlers/delete-user.handler";


export const usersRouter = Router({});

usersRouter
    .get(USERS_ROUTES.ROOT,paginationAndSortingValidation(UserSortField),getUsersHandler)
    .post(USERS_ROUTES.ROOT,createUserHandler)
    .delete(USERS_ROUTES.DY_ID,deleteUserHandler)