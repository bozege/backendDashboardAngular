import { Controller, Body, Post, Request, Response, Get, Delete, Param } from '@nestjs/common';
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

            //return candidates; //copied from my old project, might be incorrect.

        } catch (error) {
            const newError = error.code.split("/")[1];
            console.log("Error occurred god knows where: candidates.controller.ts"); //Hehe
            let statusCode = 400;

            return {
                statusCode,
                error: newError,
                msg: error
            }
        }
        
    }

    //  @Delete()
    //  async deleteCandidate(@Request() req: any, @Response() res: any) {

    //     const deleted_id = req.body.candidate_id;
    //     try {
    //         const result = await this.candidatesService.deleteCandidate(deleted_id)
    //         res.status(result.statusCode).json(result)

    //     } catch (error) {
    //         //const newError = error.code.split("/")[1];
    //         console.log("Error occurred god knows where: candidates.controller.ts DELETE"); //Hehe
    //         let statusCode = 700;

    //         return {
    //             statusCode,
    //             //error: newError,
    //             msg: error
    //         }
    //     }
    // }

    @Delete(":candidate_id")
     async deleteCandidate(@Param("candidate_id") candidate_id: string, @Response() res: any) {

        //const deleted_id = req.body.candidate_id;
        try {
            const result = await this.candidatesService.deleteCandidate(candidate_id)
            res.status(result.statusCode).json(result)

        } catch (error) {
            //const newError = error.code.split("/")[1];
            console.log("Error occurred god knows where: candidates.controller.ts DELETE"); //Hehe
            let statusCode = 700;

            return {
                statusCode,
                //error: newError,
                msg: error
            }
        }
    }




}