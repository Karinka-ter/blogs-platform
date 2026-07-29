import {Request, Response} from "express";
import {matchedData} from "express-validator";
import {PaginationAndSorting} from "../../../core/types/pagination-and-sorting";
import {setDefaultSortAndPaginationIfNotExist} from "../../../core/helpers/set-default-sort-and-pagination";
import {usersQueryRepository} from "../../repositories/users-query.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {errorsHandler} from "../../../core/errors/errors.handler";

export const getUsersHandler = async (req:Request,res:Response)=>{
    try{
        const sanitizedQuery = matchedData<PaginationAndSorting<string>>(req, {
            locations: ['query'],
            includeOptionals: true,
        });
        const queryInput = setDefaultSortAndPaginationIfNotExist(sanitizedQuery);
        const {items,totalCount} = await usersQueryRepository.findAll(queryInput)
        return res.status(HttpStatus.Ok).json({
            pagesCount: Math.ceil(totalCount / queryInput.pageSize),
            page: queryInput.pageNumber,
            pageSize: queryInput.pageSize,
            totalCount,
            items: items,
        })

    }catch(err:unknown){
        errorsHandler(err,res)
    }
}