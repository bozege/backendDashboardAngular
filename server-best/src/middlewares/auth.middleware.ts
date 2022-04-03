import { Body, Injectable, NestMiddleware, Request, Response } from "@nestjs/common"
const admin = require("../db/firebaseAdmin")

@Injectable()
export class AuthMiddleWare implements NestMiddleware {
    async use(@Request() req: any, @Response() res: any, next: () => void) {
        try {
            const statusCode = 401
            if (req.headers.authorization) {
                const token = await req.headers.authorization
                const decodedValue = await admin.auth().verifyIdToken(token)
                if (decodedValue) {
                    console.log("You are authorized!")
                    req.user = decodedValue
                    next()
                }
                else {
                    console.log("You are not authorized!")
                    return res.status(statusCode).json({ statusCode, err: "You are not allowed!" })
                }
            }
            else {
                console.log("You are not authorized!")
                return res.status(statusCode).json({ statusCode, err: "You are not allowed!" })
            }
        }
        catch (err) {
            const newErr = err.code ? err.code.split("/")[1] : err;
            console.log(`Authorization middleware failed => ${newErr}`)
            return res.status(400).json({
                statusCode: 400,
                err: "Authorization failed!"
            })
        }
    }
}