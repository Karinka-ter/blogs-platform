import {HttpStatus} from "../../../core/types/http-statuses";
import {Request, Response} from "express";
import {matchedData} from "express-validator";
import {PaginationAndSorting} from "../../../core/types/pagination-and-sorting";
import {setDefaultSortAndPaginationIfNotExist} from "../../../core/helpers/set-default-sort-and-pagination";
import {errorsHandler} from "../../../core/errors/errors.handler";
import {postsQueryRepository} from "../../repositories/posts-query-repository";

export const getPostsHandler = async (req: Request, res: Response) => {
    try {
        const sanitizedQuery = matchedData<PaginationAndSorting<string>>(req, {
            locations: ['query'],
            includeOptionals: true,
        })

        const queryInput = setDefaultSortAndPaginationIfNotExist(sanitizedQuery)

        const {items , totalCount} = await postsQueryRepository.findAll(queryInput)
        res.status(HttpStatus.Ok).send({
            pagesCount: Math.ceil(totalCount / queryInput.pageSize),
            page: queryInput.pageNumber,
            pageSize: queryInput.pageSize,
            totalCount,
            items: items
        })
    } catch(e: unknown) {
        errorsHandler(e,res)
    }

}