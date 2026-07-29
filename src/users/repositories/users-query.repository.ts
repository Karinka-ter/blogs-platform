import {blogsCollection, usersCollection} from "../../db/collections";
import {PaginationAndSorting} from "../../core/types/pagination-and-sorting";
import {User} from "../types/users-type";
import {mapToUsersViewModel} from "../routes/mappes/map-to-users-view-model";

export const usersQueryRepository = {
    async findAll(query: PaginationAndSorting<string>): Promise<{ items: User[], totalCount: number }> {
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchNameTerm
        } = query;

        const skip = (pageNumber - 1) * pageSize;
        const filter: any = {}

        if (searchNameTerm) {
            filter.name = {
                $regex: searchNameTerm,
                $options: 'i',
            };
        }
        const items = await usersCollection
            .find(filter)
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const totalCount = await blogsCollection.countDocuments(filter);
        const usersViewModel = items.map(mapToUsersViewModel);
        return {items:usersViewModel,totalCount:totalCount}
    }
}