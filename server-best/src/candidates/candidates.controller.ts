import { Controller, Body, Post, Request, Response, Get } from '@nestjs/common';
import { CandidatesService } from './candidates.service';


@Controller('candidates')
export class CandidatesController {
    constructor(private readonly candidatesService: CandidatesService) { }


    @Post()
    async addUser(@Request() req: any, @Response() res: any) {
        const { name, email } = req.body;
        try {
            const result = await this.candidatesService.addCandidate(name, email)
            res.status(result.statusCode).json(result)
        } catch (error) {
            console.log("error")
            return { msg: "Internal Error!" }
        }
    }

    // @Post()
    // async addCandidate(@Body("name") candName: string, @Body("email") candEmail: string, ) {
    //     const generatedId = await this.candidatesService.addCandidate(candName, candEmail);
    //     return { id: generatedId };
    // }

    @Get()
    async getAllCandidates(@Response() res: any) {
        try {
            const candidates = await this.candidatesService.getCandidates();
            //console.log("getallcustomerscontroller");
            res.status(candidates.statusCode).json(candidates)

        } catch (error) {
            console.log("error")
            return { msg: "Internal Erro!" }

            
        }
        
    }




}