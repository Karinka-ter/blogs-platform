import {PaginationAndSorting} from "../../core/types/pagination-and-sorting";
import {ObjectId} from "mongodb";
import {PostView} from "../types/posts-type";
import {postsCollection} from "../../db/collections";
import {RepositoryNotFoundError} from "../../core/errors/repository-not-found.errors";
import {blogsQueryRepository} from "../../blogs/repositories/blogs-query-repository";
import {mapPostToViewModel} from "../routes/mappers/map-post-to-view-model";


export const postsQueryRepository = {
    async findAll(queryDto: PaginationAndSorting<string>,id?:string): Promise<{items:PostView[]; totalCount: number}> {
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
        } = queryDto;

        if(id){
            const blog = await blogsQueryRepository.findByIdOrFail(id)
            if (!blog) {
                throw new RepositoryNotFoundError('No blog found');
            }
        }

        const skip = (pageNumber - 1) * pageSize;
        const filter = id? {blogId: id}:{}


        const items = await postsCollection
            .find(filter)
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const totalCount = await postsCollection.countDocuments(filter);
        const postsViewModel = items.map(mapPostToViewModel)
        return {items: postsViewModel, totalCount };

    },
    async findByIdOrFail(id: string): Promise<PostView> {
        const result =  await postsCollection.findOne({_id: new ObjectId(id)})
        if(!result) {
            throw new RepositoryNotFoundError('post not found');
        }
        return mapPostToViewModel(result)
    },
}