import {WithId} from "mongodb";
import {CommentType, CommentTypeViewModel} from "../../types/comments-type";

export const mappingCommentViewModel =(comment:WithId<CommentType>):CommentTypeViewModel=>{
    return {
        id: comment._id.toString(),
       ...comment}

}