import {User} from "../types/users-type";
import {usersCollection} from "../../db/collections";
import {ObjectId} from "mongodb";
import {RepositoryNotFoundError} from "../../core/errors/repository-not-found.errors";

export const usersRepository = {
   async createUser(user:User): Promise<string> {
       const result = await usersCollection.insertOne(user)
       return result.insertedId.toString()
    },
   async deleteUser(id:string): Promise<void> {
        const result = await usersCollection.deleteOne({_id:new ObjectId(id)})
       if(result.deletedCount === 0){
           throw new RepositoryNotFoundError('user not deleted')
       }
    }
}