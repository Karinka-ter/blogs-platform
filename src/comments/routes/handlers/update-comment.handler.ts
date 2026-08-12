import {Request, Response} from "express";
import {errorsHandler} from "../../../core/errors/errors.handler";
import {commentsService} from "../../application/comments.service";
import {HttpStatus} from "../../../core/types/http-statuses";

export const updateCommentHandler = async (req: Request<{ commentId: string }, {}, {
    content: string
}>, res: Response) => {
    try {
        console.log('ID FROM URL:', req.params.commentId);
        await commentsService.update(req.params.commentId, req.body.content,req.user!.userId)
        res.sendStatus(HttpStatus.NoContent)
    } catch (e: unknown) {
        errorsHandler(e, res);
    }
}