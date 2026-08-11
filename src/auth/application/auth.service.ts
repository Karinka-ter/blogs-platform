import {usersQueryRepository} from "../../users/repositories/users-query.repository";
import argon2 from "argon2";
import {User} from "../../users/types/users-type";

export const authService = {
    async loginUser(loginOrEmail: string, password: string,): Promise<{ accessToken: string } | null> {
        const user = await authService.checkUserCredentials(
            loginOrEmail,
            password,
        );

        if (!user) {
            return null;
        }

        return { accessToken: "token" };
    },
    async me(loginOrEmail: string, password: string): Promise<User | null> {
        const user = authService.checkUserCredentials(
            loginOrEmail,
            password,
        )
        if (!user) return null
        return user
    },

    async checkUserCredentials(loginOrEmail: string, password: string,): Promise<User |null> {
        const user = await usersQueryRepository.findByLoginOrEmail(loginOrEmail);
        if (!user) return null;
        const isPasswordVerify = await argon2.verify(
            user.passwordHash,
            password
        );
        if(!isPasswordVerify) return null;
        return user
    },
};