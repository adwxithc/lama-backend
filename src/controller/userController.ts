import { BadRequestError } from '../errors/bad-request-error';

import { Req, Res } from '../types/expressTypes';

import { jWTToken } from '../services/jwt';
import { tokenOptions } from '../utils/tockenOptions';
import userRepository from '../repository/userRepository';
import projectRepository from '../repository/projectRepository';
import { IJwtPayload } from '../types/jwt';
import { IEpisode, IWidget } from '../types/data';
import imageFormater from '../services/imageFormater';
import fileBucket from '../services/fileBucket';
import widgetRepository from '../repository/widgetRepository';
import { sanitizeUpdateData } from '../services/sanitise';

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
        const { page = 1, limit = 9 } = req.query;

        const { projects, total } = await projectRepository.getUsersProjects({
            email,
            page: Number(page),
            limit: Number(limit),
        });
        const lastPage = Math.ceil(total / Number(limit));
        const totalPages = Math.ceil(total / Number(limit));

        res.json({
            success: true,
            data: { items: projects, lastPage, totalPages },
        });
    }

    async createProject(req: Req, res: Res) {
        const { name } = req.body;
        const { email } = req.user as { email: string };
        const project = await projectRepository.createProject({
            name,
            episodes: 0,
            userMail: email,
        });
        res.json({
            success: true,
            data: project,
            message: 'New project created.',
        });
    }

    async addEpisode(req: Req, res: Res) {
        const { name, description, method, projectId } = req.body as IEpisode;
        const episode = await projectRepository.addEpisode({
            description,
            method,
            name,
            projectId,
        });
        res.json({
            success: true,
            data: episode,
            message: 'New Episode Added',
        });
    }

    async getEpisodes(req: Req, res: Res) {
        const { page = 1, limit = 5 } = req.query;
        const { email } = req.user as IJwtPayload;
        const { projectId } = req.params;

        const project = await projectRepository.findProject({
            email,
            id: projectId,
        });
        if (!project) {
            throw new BadRequestError('Invalid Project or Access');
        }
        const { episodes, total } = await projectRepository.getEpisodes({
            page: Number(page),
            limit: Number(limit),
            projectId,
        });

        const lastPage = Math.ceil(total / Number(limit));
        const totalPages = Math.ceil(total / Number(limit));

        res.json({
            success: true,
            data: { items: episodes, lastPage, totalPages },
        });
    }

    async deleteEpisode(req: Req, res: Res) {
        const { episodeId, projectId } = req.params;
        const { email } = req.user as IJwtPayload;
        await projectRepository.deleteEpisode({ email, episodeId, projectId });

        res.json({
            success: true,
            message: 'Episode deleted successfully',
        });
    }

    async editEpisode(req: Req, res: Res) {
        const { episodeId, projectId } = req.params;
        const { description } = req.body;
        const { email } = req.user as IJwtPayload;
        const episode = await projectRepository.editEpisode({
            email,
            episodeId,
            projectId,
            description,
        });

        res.json({
            success: true,
            message: 'Episode updated successfully',
            data: episode,
        });
    }

    async updateWidget(req: Req, res: Res) {

        const { projectId } = req.params;
        const {email} = req.user as IJwtPayload;
        const widget= req.body as Partial<IWidget>;
        const { file } = req;
        let imageName = '';
        if (file) {
            const imageBuffer = file.buffer;
            const croppedImageBuffer = await imageFormater.crop({
                aspectRatio: 1,
                imageBuffer,
                format: 'jpeg',
                maxWidth: Number(widget.IconSize),
                maxHeight: Number(widget.IconSize),
            });

            imageName = await fileBucket.uploadImage({
                imageBuffer: croppedImageBuffer,
                mimetype: file.mimetype,
            });
        }

        const project = await projectRepository.findProject({email,id:projectId})
        if(!project){
            throw new BadRequestError('Invalid project id or access')
        }

        const newWidgetUpdate = sanitizeUpdateData({...widget,image:imageName})
      

        const newWidget = await widgetRepository.update(project.id,newWidgetUpdate);
        res.json({
            success: true,
            data: newWidget,
        });
    }
}

export const userController = new UserController();
