import {commentsQueryRepository} from "../../repositories/comments-query.repository";
import {DomainError} from "../../../core/errors/domain.errors";

export const checkCommentOwnership = async (userId:string,commentId:string)=>{
    const comment = await commentsQueryRepository.getCommentById(commentId)
    if (comment.commentatorInfo.userId !== userId) {
        throw new DomainError(
            'You can update only your own comments',
            'COMMENT_FORBIDDEN'
        );
    }
}