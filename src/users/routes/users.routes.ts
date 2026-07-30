import {Router} from "express";
import {getUsersHandler} from "./handlers/get-users.handler";
import {USERS_ROUTES} from "../constans/users.paths";
import {
    paginationAndSortingValidation
} from "../../core/middlewares/validator/query-pagination-sorting.validation.middleware";
import {UserSortField} from "./input/UsersSortField";
import {createUserHandler} from "./handlers/create-user.handler";
import {deleteUserHandler} from "./handlers/delete-user.handler";
import {superAdminGuardMiddleware} from "../../auth/middlewares/super-admin.guard-middleware";
import {idValidation} from "../../core/middlewares/validator/params-id.validation-middleware";
import {inputValidationResultMiddleware} from "../../core/middlewares/validator/input-validation-result.middleware";
import {inputValidatorUserDtoMiddleware} from "../validation/inputValidatorUserDtoMiddleware";


export const usersRouter = Router({});

usersRouter
    .get(USERS_ROUTES.ROOT,paginationAndSortingValidation(UserSortField),getUsersHandler)
    .post(USERS_ROUTES.ROOT,superAdminGuardMiddleware,inputValidatorUserDtoMiddleware,inputValidationResultMiddleware,createUserHandler)
    .delete(USERS_ROUTES.DY_ID,superAdminGuardMiddleware,idValidation,inputValidationResultMiddleware,deleteUserHandler)