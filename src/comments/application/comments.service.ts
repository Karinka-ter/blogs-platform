import {usersQueryRepository} from "../../users/repositories/users-query.repository";
import {commentsRepository} from "../repositories/comments.repository";

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
    }
}