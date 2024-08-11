import mongoose from 'mongoose';
import { BadRequestError } from '../errors/bad-request-error';
import EpisodeModel from '../model/episodeModel';
import ProjectModel from '../model/projectModel';
import { IEpisode, IProject } from '../types/data';

class ProjectRepsitory {
    async getUsersProjects({
        email,
        page,
        limit,
    }: {
        email: string;
        page: number;
        limit: number;
    }) {
        const projectsPromise = ProjectModel.find({ userMail: email })
            .sort({ updatedAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const totalPromise = ProjectModel.countDocuments({ userMail: email });
        const [projects, total] = await Promise.all([
            projectsPromise,
            totalPromise,
        ]);
        return { projects, total };
    }

    async createProject(project: IProject) {
        const exist = await ProjectModel.findOne({ name: project.name });
        if (exist) {
            throw new BadRequestError(
                ' A project with this name already exist'
            );
        }
        const newProject = await ProjectModel.create(project);
        return await newProject.save();
    }

    async findProject({ email, id }: { email: string; id: string }) {
        return ProjectModel.findOne({ userMail: email, _id: id });
    }

    async addEpisode(episode: IEpisode) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Update the project to increment episode count
            const project = await ProjectModel.findOneAndUpdate(
                { _id: episode.projectId },
                { $inc: { episodes: 1 } },
                { new: true, session } // Pass the session for transaction
            ).exec();

            if (!project) {
                throw new BadRequestError("Project doesn't exist");
            }

            // Create and save the new episode
            const newEpisode = await EpisodeModel.create([episode], {
                session,
            });

            // Commit the transaction
            await session.commitTransaction();
            session.endSession();

            return newEpisode[0]; // Return the newly created episode
        } catch (error) {
            // Abort the transaction in case of error
            await session.abortTransaction();
            session.endSession();

            // Re-throw error to be handled by the caller
            throw error;
        }
    }

    async getEpisodes({
        page,
        limit,
        projectId,
    }: {
        page: number;
        limit: number;
        projectId: string;
    }) {
        console.log('apicall');

        const episodesPromise = EpisodeModel.find({ projectId, deleted: false })
            .sort({ updatedAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const totalPromise = EpisodeModel.countDocuments({
            projectId,
            deleted: false,
        });
        const [episodes, total] = await Promise.all([
            episodesPromise,
            totalPromise,
        ]);
        return { episodes, total };
    }
    async deleteEpisode({
        projectId,
        episodeId,
        email,
    }: {
        projectId: string;
        episodeId: string;
        email: string;
    }) {
        const project = await ProjectModel.findOneAndUpdate(
            { _id: projectId, userMail: email },
            { $inc: { episodes: -1 } },
            { new: true }
        );
        if (project) {
            return await EpisodeModel.findOneAndUpdate(
                { _id: episodeId },
                { deleted: true }
            );
        }
        throw new BadRequestError('invalid project or access');
    }

    async editEpisode({
        projectId,
        episodeId,
        email,
        description,
    }: {
        projectId: string;
        episodeId: string;
        email: string;
        description: string;
    }) {
        const project = await ProjectModel.findOne({
            _id: projectId,
            userMail: email,
        });
        if (project) {
            return await EpisodeModel.findOneAndUpdate(
                { _id: episodeId, projectId },
                { $set: { description } },
                { new: true }
            );
        }
        throw new BadRequestError('invalid project or access');
    }
}

export default new ProjectRepsitory();
