import {usersQueryRepository} from "../../users/repositories/users-query.repository";
import argon2 from "argon2";
import {User, UserViewModel} from "../../users/types/users-type";
import {mapToUsersViewModel} from "../../users/routes/mappes/map-to-users-view-model";
import {SECRET_KEY} from "../../settings/config";
import jwt from "jsonwebtoken";

export const authService = {
    async loginUser(loginOrEmail: string, password: string,): Promise<{ accessToken: string } | null> {
        const user = await authService.checkUserCredentials(
            loginOrEmail,
            password,
        );

        if (!user) {
            return null;
        }

        const token = jwt.sign({id: user.id},SECRET_KEY,{expiresIn: "1d"});

        return { accessToken: token };
    },
    // async me(loginOrEmail: string, password: string): Promise<User | null> {
    //     const user = await usersQueryRepository.findByLoginOrEmail(loginOrEmail);
    // },

    async checkUserCredentials(loginOrEmail: string, password: string,): Promise<UserViewModel |null> {
        const user = await usersQueryRepository.findByLoginOrEmail(loginOrEmail);
        if (!user) return null;
        const isPasswordVerify = await argon2.verify(
            user.passwordHash,
            password
        );
        if(!isPasswordVerify) return null;
        return mapToUsersViewModel(user);
    },
};