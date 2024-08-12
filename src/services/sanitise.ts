import { IWidget } from "../types/data";
import _ from 'lodash';

const ALLOWED_GENERAL_UPDATE_FIELDS: (keyof IWidget)[] = [
    'chatbotName',
    'welcomeMessage',
    'inputPlaceholder',
];

const ALLOWED_DISPLAY_UPDATE_FIELDS: (keyof IWidget)[] = [
    'primaryColor',
    'fontColor',
    'fontSize',
    'chatHeight',
    'distanceFromBottom',
    'horizontalDistance',
    'IconSize',
    'position',
    'image',
    'showSource',
];

export function sanitizeUpdateData(data: Partial<IWidget>,type:'general'|'display'){
    if(type=='general'){
        return _.pick(data, ALLOWED_GENERAL_UPDATE_FIELDS);
    }
    return _.pick(data, ALLOWED_DISPLAY_UPDATE_FIELDS);
}