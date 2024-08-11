import { Schema } from "mongoose"

export interface IUser{
    name:string,
    email:string,
    createdAt?:string
    updatedAt?:string
}

export interface IProject{
    userMail:string
    name:string,
    createdAt?:string
    updatedAt?:string
    episodes:number
}

export interface IEpisode{
    name:string,
    description:string,
    method:'youtube'| 'spotify' |'rss',
    projectId:Schema.Types.ObjectId,
    deleted?:Boolean,
    createdAt?:Date,
    updatedAt?:Date,

}