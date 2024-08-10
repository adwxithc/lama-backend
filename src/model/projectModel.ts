import mongoose, { Schema } from "mongoose";
import { IProject } from "../types/data";



const projectSchema = new Schema<IProject>(
    {
        name: {
            type: String,
            required: true,
            
        },
        episodes: {
            type: Number,
            required: true,
        },
        userMail :{
            type:String,
            required:true
        }
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

const ProjectModel = mongoose.model<IProject>("Project", projectSchema);


export default ProjectModel;
