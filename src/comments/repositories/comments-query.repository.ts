import {commentsCollection} from "../../db/collections";
import {ObjectId} from "mongodb";
import {RepositoryNotFoundError} from "../../core/errors/repository-not-found.errors";
import {mappingCommentViewModel} from "../routes/mappers/map-to-comment-view-model";
import {PaginationAndSorting} from "../../core/types/pagination-and-sorting";

export const commentsQueryRepository = {
    getAll: async(queryDto: PaginationAndSorting<string>,id:string)=>{
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
        } = queryDto;

        const skip = (pageNumber - 1) * pageSize;
        const filter = {postId:id};

        const items = await commentsCollection
            .find(filter)
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(pageSize)
            .toArray();
        const totalCount = await commentsCollection.countDocuments(filter);
        const postsViewModel = items.map(mappingCommentViewModel)
        return {items: postsViewModel, totalCount };

    },
    getCommentById: async(id:string)=>{
        const result = await commentsCollection.findOne({ _id: new ObjectId(id)})

        if(!result){
            throw new RepositoryNotFoundError('comment not found')
        }
        return mappingCommentViewModel(result)
    }
}