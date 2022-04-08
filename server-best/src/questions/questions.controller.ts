import { Controller, Post, Request, Response, Get } from '@nestjs/common';
import { QuestionsService } from './questions.service';


@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) { }

    
    @Post()
    async addQuestion(@Request() req: any, @Response() res: any) {
        const { question, options, question_skill } = req.body;
        try {
            const result = await this.questionsService.addQuestion(question, options, question_skill)
            res.status(result.statusCode).json(result)
        } catch (error) {
            console.log("error")
            return { msg: "Internal Error!" }
        }
    }

    @Get()
    async getAllQuestions(@Response() res: any) {
        try {
            const tests = await this.questionsService.getQuestions();
            res.status(tests.statusCode).json(tests)

            //return candidates; //copied from my old project, might be incorrect.

        } catch (error) {
            console.log("error")
            return { msg: "Internal Erro!" }

            
        }
        
    }
}