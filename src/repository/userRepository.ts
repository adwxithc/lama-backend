import UserModel from "../model/userModel";
import { IUser } from "../types/data";

class UserRepsitory {
    async findByEmail(email: string) {
        return await UserModel.findOne({ email });
    }

    async createUser(newUser: IUser) {
        const user = await UserModel.create(newUser);
        return await user.save();
    }

  

    async updateUser({name,profile, email}:{name:string, profile:string,email:string}){
        return await UserModel.findOneAndUpdate({email},{$set:{name,profile}},{new:true})
    }
}

export default new UserRepsitory();
