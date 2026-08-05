import {User, UserInputDtoType} from "../types/users-type";
import {usersRepository} from "../repositories/users.repository";
import {usersQueryRepository} from "../repositories/users-query.repository";
import argon2 from 'argon2';

export const usersService = {
    async create(dto: UserInputDtoType) {
        const {login, email, password} = dto;
        const passwordHash = await argon2.hash(password);
        const newUser:User = {
            login,email,passwordHash,
            createdAt: new Date().toISOString()
        }

        const id = await usersRepository.createUser(newUser)
        return await usersQueryRepository.findByIdOrFail(id)
    },
    async delete(id: string) {
       await usersRepository.deleteUser(id)
    }
}