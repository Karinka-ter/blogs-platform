import {usersQueryRepository} from "../../users/repositories/users-query.repository";
import argon2 from "argon2";

export const authService = {
    async loginUser(loginOrEmail: string, password: string,): Promise<{ accessToken: string } | null> {
        const isCorrectCredentials = await authService.checkUserCredentials(
            loginOrEmail,
            password,
        );

        if (!isCorrectCredentials) {
            return null;
        }

        return { accessToken: "token" };
    },

    async checkUserCredentials(loginOrEmail: string, password: string,): Promise<boolean> {
        const user = await usersQueryRepository.findByLoginOrEmail(loginOrEmail);
        if (!user) return false;

        return await argon2.verify(
            user.passwordHash,
            password
        );
    },
};