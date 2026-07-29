import {Request, Response} from "express";
import {matchedData} from "express-validator";
import {PaginationAndSorting} from "../../../core/types/pagination-and-sorting";
import {setDefaultSortAndPaginationIfNotExist} from "../../../core/helpers/set-default-sort-and-pagination";
import {usersQueryRepository} from "../../repositories/users-query.repository";

export const getUsersHandler = async (req:Request,res:Response)=>{
    try{
        const sanitizedQuery = matchedData<PaginationAndSorting<string>>(req, {
            locations: ['query'],
            includeOptionals: true,
        });
        const queryInput = setDefaultSortAndPaginationIfNotExist(sanitizedQuery);
        const {items,totalCount} = await usersQueryRepository.findAll(queryInput)
        return res.status(200).json({
            pagesCount: Math.ceil(totalCount / queryInput.pageSize),
            page: req.query.pageNumber,
            pageSize: req.query.pageSize,
            totalCount,
            items: items,
        })

    }catch(err:unknown){}
}