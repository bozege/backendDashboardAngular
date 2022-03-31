import { Controller, Post, Request, Response } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }


    @Post("/registerViaEmailPass")
    async addUser(@Request() req: any, @Response() res: any) {
        const { name, email, password } = req.body;
        try {
            const result = await this.usersService.createUserWithEmailPass(name, email, password)
            res.status(result.statusCode).json(result)
        } catch (error) {
            console.log("error")
            return { msg: "Internal Error!" }
        }
    }

    @Post("/loginViaEmailPass")
    async loginUser(@Request() req: any, @Response() res: any) {
        const { email, password } = req.body;
        try {

            const result = await this.usersService.loginWithEmailPass(email, password)
            res.status(result.statusCode).json(result)
        } catch (error) {
            console.log(error)
            return { msg: "Internal Error!" }
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
            return "Something went wrong!";
        }
    }


}