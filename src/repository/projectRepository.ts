import ProjectModel from '../model/projectModel';

class ProjectRepsitory {
    async getUsersProjects({email, page, limit}:{email: string, page:number, limit:number}) {
        const projectsPromise = ProjectModel.findOne({ userMail:email })
            .sort({ updatedAT: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const totalPromise =  ProjectModel.countDocuments({ userMail:email })
        const [projects, total] = await Promise.all([projectsPromise, totalPromise ])
        return {projects, total}
    }
}

export default new ProjectRepsitory();
