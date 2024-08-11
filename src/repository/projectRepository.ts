import mongoose from 'mongoose';
import { BadRequestError } from '../errors/bad-request-error';
import EpisodeModel from '../model/episodeModel';
import ProjectModel from '../model/projectModel';
import { IEpisode, IProject } from '../types/data';

class ProjectRepsitory {
    async getUsersProjects({email, page, limit}:{email: string, page:number, limit:number}) {
        const projectsPromise = ProjectModel.find({ userMail:email })
            .sort({ updatedAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const totalPromise =  ProjectModel.countDocuments({ userMail:email })
        const [projects, total] = await Promise.all([projectsPromise, totalPromise ])
        return {projects, total}
    }

    async createProject(project:IProject){
        const exist = await ProjectModel.findOne({name:project.name})
        if(exist){
            throw new BadRequestError(" A project with this name already exist")
        }
        const newProject = await ProjectModel.create(project);
        return await newProject.save();
    }

    async addEpisode(episode:IEpisode){
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
            const newEpisode = await EpisodeModel.create([episode], { session });
    
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
}

export default new ProjectRepsitory();
