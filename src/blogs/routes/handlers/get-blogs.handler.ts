import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsService} from "../../application/blogs.servise";
import {matchedData} from "express-validator";
import {setDefaultSortAndPaginationIfNotExist} from "../../../core/helpers/set-default-sort-and-pagination";
import {PaginationAndSorting} from "../../../core/types/pagination-and-sorting";

export const getBlogsHandler = async (req: Request, res: Response) => {
    try {
        const sanitizedQuery = matchedData<PaginationAndSorting<string>>(req, {
            locations: ['query'],
            includeOptionals: true,
        }); //утилита для извечения трансформированных значений после валидатара
        //в req.query остаются сырые квери параметры (строки)
        const queryInput = setDefaultSortAndPaginationIfNotExist(sanitizedQuery);
        const {items, totalCount} = await blogsService.findMany(queryInput);
        const blogsListOutput = {
            pagesCount: Math.ceil(totalCount / queryInput.pageSize),
            page: queryInput.pageNumber,
            pageSize: queryInput.pageSize,
            totalCount,
            items: items
        }

        res.status(HttpStatus.Ok).send(blogsListOutput)
    } catch (err) {
        res.sendStatus(HttpStatus.InternalServerError);
    }
}

