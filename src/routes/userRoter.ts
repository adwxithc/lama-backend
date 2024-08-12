import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest';
import { userController } from '../controller/userController';
import protect from '../middlewares/authMiddleware';
import { validateWidget } from '../services/validates';
import { upload } from '../middlewares/multer';

export function userRouter(router: Router) {
    router.post(
        '/login',
        [
            body('name')
                .notEmpty()
                .withMessage('name is required')
                .isLength({ min: 3, max: 30 })
                .withMessage('name must be between 3 and 30 characters long'),
            body('email').isEmail().withMessage('Please provide a valid email'),
        ],
        validateRequest,
        userController.login
    );

    router.get(
        '/projects',
        [
            query('page')
                .isInt({ min: 1 })
                .withMessage('page should be an integer greater than 0'),
            query('limit')
                .isInt({ min: 1 })
                .withMessage('limit should be an integer greater than 0'),
        ],
        validateRequest,
        protect.protectUser,
        userController.getProjects
    );

    router.post(
        '/project',
        [
            body('name')
                .notEmpty()
                .withMessage('name is required')
                .isLength({ min: 3, max: 50 })
                .withMessage('name must be between 3 and 50 characters long'),
        ],
        validateRequest,
        protect.protectUser,
        userController.createProject
    );

    router.post(
        '/episode',
        [
            body('name')
                .notEmpty()
                .withMessage('name is required')
                .isLength({ min: 3, max: 50 })
                .withMessage('name must be between 3 and 50 characters long'),
            body('description')
                .notEmpty()
                .withMessage('description is required')
                .isLength({ min: 10, max: 1000 })
                .withMessage(
                    'description must be between 10 and 1000 characters long'
                ),
            body('projectId')
                .notEmpty()
                .withMessage('projectId is required')
                .isMongoId()
                .withMessage('Invalid project ID format'),
            body('method')
                .notEmpty()
                .withMessage('method is required')
                .isIn(['youtube', 'spotify', 'rss'])
                .withMessage(
                    'method must be one of the following: youtube, spotify, rss'
                ),
        ],
        validateRequest,
        protect.protectUser,
        userController.addEpisode
    );

    router.get(
        '/project/:projectId/episodes',
        [
            param('projectId')
                .isMongoId()
                .withMessage('Invalid project ID format'),
            query('page')
                .isInt({ min: 1 })
                .withMessage('page should be an integer greater than 0'),
            query('limit')
                .isInt({ min: 1 })
                .withMessage('limit should be an integer greater than 0'),
        ],
        validateRequest,
        protect.protectUser,
        userController.getEpisodes
    );

    router.patch('/project/:projectId/episode/:episodeId/delete', 
        [
            param('projectId')
            .isMongoId()
            .withMessage('Invalid project ID format'),
            param('episodeId').isMongoId().withMessage('Invalid episode ID format'),
        ],
        validateRequest,
        protect.protectUser,
        userController.deleteEpisode
    );
    router.patch(
        '/project/:projectId/episode/:episodeId/edit',
        [
            param('projectId')
            .isMongoId()
            .withMessage('Invalid project ID format'),
            param('episodeId').isMongoId().withMessage('Invalid episode ID format'),
        ],
        validateRequest,
        protect.protectUser,
        userController.editEpisode

    )
    router.put(
        '/project/:projectId/widget-config',
        upload.single('image'),
        validateWidget,
        validateRequest,
        protect.protectUser,
        userController.updateWidget

    )


    return router;
}
