import {usersQueryRepository} from "../../users/repositories/users-query.repository";
import {commentsRepository} from "../repositories/comments.repository";
import {commentsQueryRepository} from "../repositories/comments-query.repository";
import {DomainError} from "../../core/errors/domain.errors";

export const commentsService = {
    create: async (userId: string, content: string) => {
        const user = await usersQueryRepository.findByIdOrFail(userId)
        const newComment = {
            content,
            commentatorInfo: {
                userId,
                userLogin: user.login
            },
            createdAt: new Date().toString(),
        }
        return await commentsRepository.create(newComment)
    },
    update: async (commentId:string,updateContent:string,userId:string) => {
       const comment = await commentsQueryRepository.getCommentById(commentId)
        if (comment.commentatorInfo.userId !== userId) {
            throw new DomainError(
                'You can update only your own comments',
                'COMMENT_FORBIDDEN'
            );
        }

        await commentsRepository.update(commentId, updateContent)
    }
}