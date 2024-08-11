import { BadRequestError } from '../errors/bad-request-error';

import { Req, Res } from '../types/expressTypes';

import { jWTToken } from '../services/jwt';
import { tokenOptions } from '../utils/tockenOptions';
import userRepository from '../repository/userRepository';
import projectRepository from '../repository/projectRepository';
import { IJwtPayload } from '../types/jwt';

class UserController {
    async login(req: Req, res: Res) {
        const { name, email } = req.body;
        const user = await userRepository.findByEmail(email);
        if (!user) {
            await userRepository.createUser({ email, name });
        }

        const token = jWTToken.createJWT(
            { email },
            process.env.JWT_KEY as string
        );
        res.cookie('token', token, tokenOptions);
        res.json({
            success: true,
            data: { name, email },
        });
    }

    async getProjects(req: Req, res: Res) {
        const { email } = req.user as IJwtPayload;
        const { page = 1, limit = 5 } = req.query;

        const { projects, total } = await projectRepository.getUsersProjects({
            email,
            page: Number(page),
            limit: Number(limit),
        });
        const lastPage = Math.ceil(total / Number(limit));
        const totalPages = Math.ceil(total/Number(limit))

        res.json({
            success: true,
            data: { projects, lastPage, totalPages },
        });
    }

    async createProject(req: Req, res: Res) {
        const {name}= req.body;
        const {email} = req.user as {email:string}
        const project = await projectRepository.createProject({name,episodes:0,userMail:email})
        res.json({
            success:true,
            data:project,
            message:"New project created."
        })
    }

    async addEpisode(req:Req, res:Res) {
        const {name, description, method, projectId} = req.body;
        const episode = await projectRepository.addEpisode({description,method,name,projectId})
        res.json({
            success:true,
            data:episode,
            message:'New Episode Added'
        })
    }
}

export const userController = new UserController();
