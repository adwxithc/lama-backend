import { Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";
import { userController } from "../controller/userController";

export function authRouter(router: Router) {
    router.post(
        "/login",
        [
            body("name").notEmpty().withMessage("name is required"),
            body("email").isEmail().withMessage("Please provide a valid email"),
           
        ],
        validateRequest,
        userController.login
    );

    return router;
}
