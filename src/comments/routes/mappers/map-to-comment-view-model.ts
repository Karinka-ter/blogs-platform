import {WithId} from "mongodb";
import {CommentType, CommentTypeViewModel} from "../../types/comments-type";

export const mappingCommentViewModel =(comment:WithId<CommentType>):CommentTypeViewModel=>{
    const commentViewModel:CommentTypeViewModel = {
        id: comment._id.toString(),
        content:comment.content,
        commentatorInfo:{
            userId:comment.commentatorInfo.userId,
            userLogin:comment.commentatorInfo.userLogin
        },
        createdAt:comment.createdAt,
    }
    return commentViewModel
}