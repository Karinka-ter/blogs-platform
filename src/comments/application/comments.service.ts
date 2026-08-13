import {usersQueryRepository} from "../../users/repositories/users-query.repository";
import {commentsRepository} from "../repositories/comments.repository";
import {checkCommentOwnership} from "./utils/checkCommentOwnership";
import {postsQueryRepository} from "../../posts/repositories/posts-query-repository";

export const commentsService = {
    create: async (userId: string,postId:string, content: string) => {
        const user = await usersQueryRepository.findByIdOrFail(userId)
         await postsQueryRepository.findByIdOrFail(postId)
        const newComment = {
            content,
            commentatorInfo: {
                userId,
                userLogin: user.login
            },
            createdAt: new Date().toString(),
            postId: postId,
        }
        return await commentsRepository.create(newComment)
    },
    update: async (commentId: string, updateContent: string, userId: string) => {
        await checkCommentOwnership(userId, commentId)
        await commentsRepository.update(commentId, updateContent)
    },
    delete: async (commentId: string, userId: string) => {
        await checkCommentOwnership(userId, commentId)
        await commentsRepository.delete(commentId)
    }
}