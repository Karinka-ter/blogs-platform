import {CommentType} from "../types/comments-type";
import {WithId} from "mongodb";
import {commentsCollection} from "../../db/collections";

export const commentsRepository = {
    create: async (comment: CommentType): Promise<string> =>{
        const result = await commentsCollection.insertOne(comment)
        return result.insertedId.toString()
    }
}