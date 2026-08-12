import {commentsCollection} from "../../db/collections";
import {ObjectId} from "mongodb";
import {RepositoryNotFoundError} from "../../core/errors/repository-not-found.errors";

export const commentsQueryRepository = {
    getCommentById:async (id:string)=>{
        const mongoId = new ObjectId(id)
        const result = await commentsCollection.findOne(mongoId)
        if(!result){
            throw new RepositoryNotFoundError('comment not found')
        }
        return result
    }
}