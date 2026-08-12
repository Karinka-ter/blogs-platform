import {CommentType} from "../types/comments-type";
import {ObjectId} from "mongodb";
import {commentsCollection} from "../../db/collections";

export const commentsRepository = {
    create: async (comment: CommentType): Promise<string> =>{
        const result = await commentsCollection.insertOne(comment)
        return result.insertedId.toString()
    },
    update: async (commentId:string,updateContent:string):Promise<void> =>{
        await commentsCollection.updateOne( {_id: new ObjectId(commentId)},
            {
                $set: {content : updateContent},
            })
    }
}