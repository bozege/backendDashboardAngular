import { Controller, Post, Request, Response } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }


    @Post("/registerViaEmailPass")
    async addUser(@Request() req: any, @Response() res: any) {
        const { email, password } = req.body;

        try {
            const result = await this.usersService.createUserWithEmailPass(email, password)
            res.status(result.statusCode).json(result)

        } catch (error) {
            const newError = error.code.split("/")[1];
            console.log("Error occurred god knows where: users.controller.ts"); //Hehe
            let statusCode = 400;

            return {
                statusCode,
                error: newError
            }
        }
    }

    @Post("/loginViaEmailPass")
    async loginUser(@Request() req: any, @Response() res: any) {
        const { email, password } = req.body;
        
        try {

            const result = await this.usersService.loginWithEmailPass(email, password)
            res.status(result.statusCode).json(result)
            return result;
            
        } catch (error) {
            const newError = error.code.split("/")[1];
            console.log("Error occurred god knows where: users.controller.ts"); //Hehe
            let statusCode = 400;

            return {
                statusCode,
                error: newError
            }
        }
    }

    @Post("/resetpassword")
    async resetPassword(@Request() req: any, @Response() res: any) {
        try {

            let { email } = req.body;
            const result = await this.usersService.resetPassword(email);
            //console.log(result)
            res.status(result.statusCode).json(result)
        } catch (error) {
            console.log(error)
            return { msg: "Internal Error!" };
        }
    }


}