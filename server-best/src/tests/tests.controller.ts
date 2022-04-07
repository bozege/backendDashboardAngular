import { Controller, Post, Request, Response } from '@nestjs/common';
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
}