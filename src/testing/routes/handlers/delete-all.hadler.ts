import {Request, Response} from "express";
import {getAllCollections} from "../../../db/collections";
import {HttpStatus} from "../../../core/types/http-statuses";

export const deleteAllHandler = async (_req: Request, res: Response)=>{
    try {
        await Promise.all(
            getAllCollections().map((collection) => collection.deleteMany()),
        );

        res.sendStatus(HttpStatus.NoContent);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError);
    }
}