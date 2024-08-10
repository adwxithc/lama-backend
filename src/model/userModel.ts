import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/data";



const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            
        },
        email: {
            type: String,
            required: true,
            unique:true
        },
      
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

const UserModel = mongoose.model<IUser>("User", userSchema);


export default UserModel;
