import {commentsCollection} from "../../db/collections";
import {ObjectId} from "mongodb";

export const commentsQueryRepository = {
    getCommentById:async (id:string)=>{
        const mongoId = new ObjectId(id)
        return await commentsCollection.findOne(mongoId)
    }
}