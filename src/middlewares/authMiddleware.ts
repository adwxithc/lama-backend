import { Next, Req, Res } from '../types/expressTypes';

import { ForbiddenRequestError } from '../errors/forbidden-request-error';
import { IJwtPayload } from '../types/jwt';
import { jWTToken } from '../services/jwt';

declare module 'express' {
    export interface Request {
        user?: IJwtPayload;
    }
}
interface IProtect {
    protectUser(req: Req, res: Res, next: Next): Promise<void>;
}

class Protect implements IProtect {
    
   

    protectUser = async (req: Req, res: Res, next: Next) => {
        const token = req.cookies.token;
        
        const decoded = await jWTToken.verifyJwt(token,process.env.JWT_KEY as string);

        if (decoded?.email) {
            req.user = decoded;
            return next();
        }

        throw new ForbiddenRequestError();
    };

 
}

export default new Protect()
