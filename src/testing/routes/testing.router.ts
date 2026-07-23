import {Router} from "express";
import {deleteAllHandler} from "./handlers/delete-all.hadler";
import {TESTING_ROUTE} from "../constants/testing.paths";

export const testingRouter = Router({});

testingRouter.delete(TESTING_ROUTE.ALL_DATA, deleteAllHandler)