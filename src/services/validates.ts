import { body, param } from "express-validator";
import { IconPosition, IconSize } from "../types/data";

export  const validateWidget = [
    // projectId is required and must be a valid ObjectId
    param('projectId')
        .notEmpty().withMessage('Project ID is required')
        .isMongoId().withMessage('Invalid Project ID'),

    // primaryColor (optional)
    body('primaryColor')
        .optional()
        .isString().withMessage('Primary color must be a string'),

    // fontColor (optional)
    body('fontColor')
        .optional()
        .isString().withMessage('Font color must be a string'),

    // fontSize (optional)
    body('fontSize')
        .optional()
        .isString().withMessage('Font size must be a string'),

    // chatHeight (optional)
    body('chatHeight')
        .optional()
        .isNumeric().withMessage('Chat height must be a number'),

    // showSource (optional)
    body('showSource')
        .optional()
        .isBoolean().withMessage('Show source must be a boolean'),

    // iconSize (optional)
    body('iconSize')
        .optional()
        .isIn(Object.values(IconSize)).withMessage('Invalid icon size'),

    // position (optional)
    body('position')
        .optional()
        .isIn(Object.values(IconPosition)).withMessage('Invalid position'),

    // distanceFromBottom (optional)
    body('distanceFromBottom')
        .optional()
        .isNumeric().withMessage('Distance from bottom must be a number'),

    // horizontalDistance (optional)
    body('horizontalDistance')
        .optional()
        .isNumeric().withMessage('Horizontal distance must be a number'),

    // image (optional)
    body('image')
        .optional()
        .isString().withMessage('Image must be a string'),
]