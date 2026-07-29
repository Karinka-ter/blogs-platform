import {PaginationAndSorting} from "../../core/types/pagination-and-sorting";
import {ObjectId} from "mongodb";
import { BlogViewModel} from "../types/blogs-type";
import {blogsCollection} from "../../db/collections";
import {mapToBlogsViewModel} from "../routes/mappers/map-to-blogs-view-model";
import {RepositoryNotFoundError} from "../../core/errors/repository-not-found.errors";

export const blogsQueryRepository = {
    async findAll(queryDto: PaginationAndSorting<string>): Promise<{items:BlogViewModel[]; totalCount:number}> {
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchNameTerm
        } = queryDto;

        const skip = (pageNumber - 1) * pageSize;
        const filter: any = {};

        if (searchNameTerm) {
            filter.name = {
                $regex: searchNameTerm,
                $options: 'i',
            };
        }

        const items = await blogsCollection
            .find(filter)
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const totalCount = await blogsCollection.countDocuments(filter);

        const blogsMapViewModel = items.map(mapToBlogsViewModel);
        return {items: blogsMapViewModel, totalCount };


    },
    async findByIdOrFail(id: string): Promise<BlogViewModel> {
        const result = await blogsCollection.findOne({_id: new ObjectId(id)});
        if (!result) {
            throw new RepositoryNotFoundError('blog not found');
        }
        return mapToBlogsViewModel(result)
    },
}