import {Request, Response} from "express";
import {errorsHandler} from "../../../core/errors/errors.handler";
import {matchedData} from "express-validator";
import {PaginationAndSorting} from "../../../core/types/pagination-and-sorting";
import {setDefaultSortAndPaginationIfNotExist} from "../../../core/helpers/set-default-sort-and-pagination";
import {commentsQueryRepository} from "../../../comments/repositories/comments-query.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {postsQueryRepository} from "../../repositories/posts-query-repository";

export const getCommentsByPostIdHandler = async (req: Request<{id:string},{},{}>, res: Response) => {
    try {
        const sanitizedQuery = matchedData<PaginationAndSorting<string>>(req, {
            locations: ['query'],
            includeOptionals: true,
        })
        const queryInput = setDefaultSortAndPaginationIfNotExist(sanitizedQuery)
        await postsQueryRepository.findByIdOrFail(req.params.id)
        const {items , totalCount} = await commentsQueryRepository.getAll(queryInput,req.params.id)

        res.status(HttpStatus.Ok).send(
            {
                pagesCount: Math.ceil(totalCount / queryInput.pageSize),
                page: queryInput.pageNumber,
                pageSize: queryInput.pageSize,
                totalCount: totalCount,
                items: items,
            }
        )

    } catch(e:unknown) {
        errorsHandler(e,res)
    }
}