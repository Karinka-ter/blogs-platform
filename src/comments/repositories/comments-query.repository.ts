import {commentsCollection} from "../../db/collections";
import {ObjectId} from "mongodb";
import {RepositoryNotFoundError} from "../../core/errors/repository-not-found.errors";
import {mappingCommentViewModel} from "../routes/mappers/map-to-comment-view-model";

export const commentsQueryRepository = {
    getCommentById: async(id:string)=>{
        const result = await commentsCollection.findOne({ _id: new ObjectId(id)})

        if(!result){
            throw new RepositoryNotFoundError('comment not found')
        }
        return mappingCommentViewModel(result)
    }
}