import {User} from "../types/users-type";
import {usersRepository} from "../repositories/users.repository";
import {usersQueryRepository} from "../repositories/users-query.repository";

export const usersService = {
    async create(dto: User) {
        const id = await usersRepository.createUser(dto)
        return await usersQueryRepository.findByIdOrFail(id)
    },
    delete() {

    }
}