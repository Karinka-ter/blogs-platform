import {InputPostType, Post} from "../types/posts-type";
import {blogsCollection, postsCollection} from "../../db/collections";
import {ObjectId, WithId} from "mongodb";
import {PaginationAndSorting} from "../../core/types/pagination-and-sorting";


export const postsRepository = {
    async findAll(queryDto: PaginationAndSorting<string>,id:string=''): Promise<{items:WithId<Post>[]; totalCount: number}> {
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
        } = queryDto;

        const skip = (pageNumber - 1) * pageSize;
        const filter = id? {blogId: id}:{}


        const items = await postsCollection
            .find(filter)
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const totalCount = await postsCollection.countDocuments(filter);
        return { items, totalCount };

    },

    async findById(id: string): Promise<WithId<Post> | null> {
        return await postsCollection.findOne({_id: new ObjectId(id)})
    },

    async createPost(post: Post): Promise<WithId<Post> | null> {
        const insertResult = await postsCollection.insertOne(post)
        return {...post, _id: insertResult.insertedId}

    },

    async updatePostsBlogName(id: string, name: string): Promise<void> {
        await postsCollection.updateMany({blogId: id}, {$set: {blogName: name}})
    },

    async updatePost(id: string, post: InputPostType): Promise<boolean> {
        const blog = await blogsCollection.findOne({_id: new ObjectId(post.blogId)});
        if (blog) {
            const insertResult = await postsCollection.updateOne({_id: new ObjectId(id)}, {
                $set: post,
            })
            return insertResult.matchedCount > 0
        }
        return false;
    },

    async deletePost(id: string): Promise<boolean> {
        const deleteResult = await postsCollection.deleteOne({_id: new ObjectId(id)});
        return deleteResult.deletedCount > 0;
    }
}