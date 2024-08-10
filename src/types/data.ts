
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