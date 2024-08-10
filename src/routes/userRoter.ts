import { Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";
import { userController } from "../controller/userController";
import protect from "../middlewares/authMiddleware";

export function userRouter(router: Router) {
    router.post(
        "/login",
        [
            body("name").notEmpty().withMessage("name is required").isLength({ min: 3, max: 30 })
            .withMessage(
                "name must be between 3 and 30 characters long"
            ),
            body("email").isEmail().withMessage("Please provide a valid email"),
        ],
        validateRequest,
        userController.login
    );

    router.get(
        '/projects',
        protect.protectUser,
        userController.getProjects
    )

    return router;
}
