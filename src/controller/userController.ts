
import { BadRequestError } from "../errors/bad-request-error";

import { Req, Res } from "../types/expressTypes";

import { jWTToken } from "../services/jwt";
import { tokenOptions } from "../utils/tockenOptions";
import userRepository from "../repository/userRepository";

class UserController {
    async login(req: Req, res: Res) {
       const {name, email} = req.body;
        const user = await userRepository.findByEmail(email)
        if(!user){
            await userRepository.createUser({email, name})
        }

        const token = jWTToken.createJWT(
            { email },
            process.env.JWT_KEY as string
        );
        res.cookie("jwt", token, tokenOptions);
        res.json({
            success: true,
            data: { name, email },
        });
    }

}

export const userController = new UserController();
