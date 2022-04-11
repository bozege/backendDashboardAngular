import { Controller, Post, Request, Response, Get, Delete } from '@nestjs/common';
import { TestsService } from './tests.service';


@Controller('tests')
export class TestsController {
    constructor(private readonly testsService: TestsService) { }


    @Post()
    async addTest(@Request() req: any, @Response() res: any) {
        const { test_name, test_detail } = req.body;
        try {
            const result = await this.testsService.addTest(test_name, test_detail)
            res.status(result.statusCode).json(result)
        } catch (error) {
            console.log("error")
            return { msg: "Internal Error!" }
        }
    }

    @Get()
    async getAllTests(@Response() res: any) {
        try {
            const tests = await this.testsService.getTests();
            res.status(tests.statusCode).json(tests)

            //return candidates; //copied from my old project, might be incorrect.

        } catch (error) {
            console.log("error")
            return { msg: "Internal Erro!" }

            
        }
        
    }

    @Delete()
     async deleteCandidate(@Request() req: any, @Response() res: any) {

        const deleted_id = req.body.test_id;
        try {
            const result = await this.testsService.deleteTest(deleted_id)
            res.status(result.statusCode).json(result)
        } catch (error) {
            console.log("error")
            return { msg: "Internal Error!" }
        }
    }
}