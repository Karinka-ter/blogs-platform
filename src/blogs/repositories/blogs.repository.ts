import {Blog, BlogInputDto} from "../types/blogs-type";
import {blogsCollection} from "../../db/collections";
import {ObjectId, WithId} from "mongodb";
import {PaginationAndSorting} from "../../core/types/pagination-and-sorting";


export const blogsRepository = {
    async findAll(queryDto: PaginationAndSorting<string>): Promise<{items:WithId<Blog>[]; totalCount:number}> {
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

        return { items, totalCount };


    },
    async findById(id: string): Promise<WithId<Blog> | null> {
        return blogsCollection.findOne({_id: new ObjectId(id)});
    },
    async createBlog(newBlog: Blog): Promise<WithId<Blog>> {
        const insertResult = await blogsCollection.insertOne(newBlog);
        return {...newBlog, _id: insertResult.insertedId};
    },
    async updateBlog(id: string, blog: BlogInputDto,): Promise<boolean> {
        const updateResult = await blogsCollection.updateOne(
            {_id: new ObjectId(id)},
            {
                $set: blog,
            }
        );
        return updateResult.matchedCount > 0;
    },
    async deleteBlog(id: string): Promise<boolean> {
        const deleteResult = await blogsCollection.deleteOne({_id: new ObjectId(id)});
        return deleteResult.deletedCount > 0;
    }
}