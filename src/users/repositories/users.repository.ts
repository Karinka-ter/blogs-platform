import {DtoModelUser, User} from "../types/users-type";
import {usersCollection} from "../../db/collections";

export const usersRepository = {
   async createUser(dto:User): Promise<string> {
       const result = await usersCollection.insertOne(dto)
       return result.insertedId.toString()
    },
    deleteUser(){

    }
}