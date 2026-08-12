import jwt from "jsonwebtoken";
import {SECRET_KEY} from "../../settings/config";
import {ObjectId} from "mongodb";

export const jwtService = {
    getJwt: (id:string)=>{
      return jwt.sign({userId: id},SECRET_KEY,{expiresIn: "1d"});
    },
    getUserById: async (token:string)=>{
        try{
            const result:any = jwt.verify(token, SECRET_KEY)
            return result.userId
        }catch(err){
            console.log(err)
            return null;
        }

    }
}