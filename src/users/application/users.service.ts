import {User} from "../types/users-type";
import {usersRepository} from "../repositories/users.repository";
import {usersQueryRepository} from "../repositories/users-query.repository";

export const usersService = {
    async create(dto: User) {
        const newUser = {
            ...dto,
            createdAt: new Date().toString()
        }

        const id = await usersRepository.createUser(newUser)
        return await usersQueryRepository.findByIdOrFail(id)
    },
    async delete(id: string) {
       await usersRepository.deleteUser(id)
    }
}