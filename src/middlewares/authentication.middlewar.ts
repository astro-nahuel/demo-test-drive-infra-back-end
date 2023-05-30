import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        console.log('Request...');
        const token = req.headers.authorization?.split(' ')[1]
        console.log(token)

        try {
            const decodedToken = await admin.auth().verifyIdToken(token as string)
            console.log(decodedToken)
            next()
        } catch (error: any) {
            console.log(error)
            switch (error.errorInfo.code) {
                case 'auth/argument-error':
                    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
                case 'auth/id-token-expired':
                    throw new HttpException('Token has expired', HttpStatus.UNAUTHORIZED);
                default:
                    throw new HttpException('Internal Error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}
