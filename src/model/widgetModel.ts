import mongoose, { Schema } from 'mongoose';
import { IconPosition, IconSize, IWidget } from '../types/data';

const userSchema = new Schema<IWidget>(
    {
        chatbotName: String,
        welcomeMessage: String,
        inputPlaceholder: String,
        primaryColor: String,
        fontColor: String,
        fontSize: Number,
        chatHeight: Number,
        distanceFromBottom: Number,
        horizontalDistance: Number,
        IconSize: {
            type:String,
            enum: Object.values(IconSize),
        },
        image: String,
        position: {
            type: String,
            enum: Object.values(IconPosition),
        },
        projectId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Project',
        },
        shwoSource:Boolean,
        
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

const WidgetModel = mongoose.model<IWidget>('User', userSchema);

export default WidgetModel;
