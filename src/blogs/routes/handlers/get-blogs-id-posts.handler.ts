import {matchedData} from "express-validator";
import {PaginationAndSorting} from "../../../core/types/pagination-and-sorting";
import {setDefaultSortAndPaginationIfNotExist} from "../../../core/helpers/set-default-sort-and-pagination";
import {Request, Response} from "express";
import {errorsHandler} from "../../../core/errors/errors.handler";
import {HttpStatus} from "../../../core/types/http-statuses";
import {postsQueryRepository} from "../../../posts/repositories/posts-query-repository";

export const getBlogsIdPostsHandler = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    try {
        const sanitizedQuery = matchedData<PaginationAndSorting<string>>(req, {
            locations: ['query'],
            includeOptionals: true,
        })
        const queryInput = setDefaultSortAndPaginationIfNotExist(sanitizedQuery)
        const {items,totalCount} = await postsQueryRepository.findAll(queryInput,req.params.id)
        res.status(HttpStatus.Ok).send({
            pagesCount: Math.ceil(totalCount / queryInput.pageSize),
            page: queryInput.pageNumber,
            pageSize: queryInput.pageSize,
            totalCount,
            items: items
        })
    } catch (err: unknown) {
        errorsHandler(err,res)
    }
}