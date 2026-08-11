import {usersCollection} from "../../db/collections";
import {PaginationAndSorting} from "../../core/types/pagination-and-sorting";
import {User, UserViewModel} from "../types/users-type";
import {mapToUsersViewModel} from "../routes/mappes/map-to-users-view-model";
import {ObjectId, WithId} from "mongodb";
import {RepositoryNotFoundError} from "../../core/errors/repository-not-found.errors";

export const usersQueryRepository = {
    async findAll(query: PaginationAndSorting<string>): Promise<{ items: UserViewModel[], totalCount: number }> {
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchLoginTerm,
            searchEmailTerm
        } = query;

        const skip = (pageNumber - 1) * pageSize;
        const filter: any = {}

        if (searchLoginTerm || searchEmailTerm) {
            filter.$or = [];

            if (searchLoginTerm) {
                filter.$or.push({
                    login: {
                        $regex: searchLoginTerm,
                        $options: 'i'
                    }
                });
            }

            if (searchEmailTerm) {
                filter.$or.push({
                    email: {
                        $regex: searchEmailTerm,
                        $options: 'i'
                    }
                });
            }
        }


        const items = await usersCollection
            .find(filter)
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const totalCount = await usersCollection.countDocuments(filter);
        const usersViewModel = items.map(mapToUsersViewModel);
        return {items:usersViewModel,totalCount:totalCount}
    },
    async findByIdOrFail(id:string): Promise<UserViewModel> {
        const result = await usersCollection.findOne({_id: new ObjectId(id)});
        if (!result) {
            throw new RepositoryNotFoundError('User not found');
        }
        return mapToUsersViewModel(result);
    },
    async findByLoginOrEmail(loginOrEmail: string): Promise<WithId<User> | null> {
        const result = await usersCollection.findOne({
            $or: [
                {login: loginOrEmail},
                {email: loginOrEmail}
            ]
        });
        if (!result) {
            return null
        }
        return result
    }
}