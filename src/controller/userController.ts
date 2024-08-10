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
        res.cookie('jwt', token, tokenOptions);
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

        res.json({
            success: true,
            data: { projects, lastPage },
        });
    }
}

export const userController = new UserController();
