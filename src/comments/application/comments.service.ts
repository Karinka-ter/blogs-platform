import {usersQueryRepository} from "../../users/repositories/users-query.repository";
import {commentsRepository} from "../repositories/comments.repository";
import {checkCommentOwnership} from "./utils/checkCommentOwnership";

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
    update: async (commentId: string, updateContent: string, userId: string) => {
        await checkCommentOwnership(userId, commentId)
        await commentsRepository.update(commentId, updateContent)
    },
    delete: async (commentId: string, userId: string) => {
        await checkCommentOwnership(userId, commentId)
        await commentsRepository.delete(commentId)
    }
}