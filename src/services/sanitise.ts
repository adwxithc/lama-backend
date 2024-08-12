import { IWidget } from "../types/data";
import _ from 'lodash';

const ALLOWED_UPDATE_FIELDS: (keyof IWidget)[] = [
    'chatbotName',
    'welcomeMessage',
    'inputPlaceholder',
    'primaryColor',
    'fontColor',
    'fontSize',
    'chatHeight',
    'distanceFromBottom',
    'horizontalDistance',
    'IconSize',
    'position',
    'image',
    'shwoSource',
];

export function sanitizeUpdateData(data: Partial<IWidget>){
    return _.pick(data, ALLOWED_UPDATE_FIELDS);
}