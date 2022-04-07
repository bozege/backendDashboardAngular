import { Controller, Post, Request, Response } from '@nestjs/common';
import { QuestionsService } from './questions.service';


@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) { }

    
    @Post()
    async addQuestion(@Request() req: any, @Response() res: any) {
        const { question, options, skill } = req.body;
        try {
            const result = await this.questionsService.addQuestion(question, options, skill)
            res.status(result.statusCode).json(result)
        } catch (error) {
            console.log("error")
            return { msg: "Internal Error!" }
        }
    }
}