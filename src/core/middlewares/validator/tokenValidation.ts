import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {HttpStatus} from "../../types/http-statuses";
import {SECRET_KEY} from "../../../settings/config";

export const tokenValidationMiddleware = (req:Request,res:Response,next: NextFunction)=>{
    try{
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.sendStatus(401);
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(
            token,
            SECRET_KEY
        ) as { userId: string };

        req.user = {
            userId: decoded.userId
        };

        next();
    }catch(e:unknown){
      res.sendStatus(HttpStatus.Unauthorized)
    }

}