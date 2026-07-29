import {WithId} from "mongodb";
import {User} from "../../types/users-type";

export const mapToUsersViewModel = (user: WithId<User>) => {
    return {
        id: user._id.toString(),
        login: user.login,
        email: user.email,
        createdAt: user.createdAt,
    }
}
