import mongoose, { Schema } from 'mongoose';
import { IEpisode } from '../types/data';

const episodeSchema = new Schema<IEpisode>(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        description: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 1000,
        },
        method: {
            type: String,
            enum: ['active', 'inactive', 'archived'],
            required: true,
        },
        projectId: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
            required: true,
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

const EpisodeModel = mongoose.model<IEpisode>('Episode', episodeSchema);

export default EpisodeModel;
