import { Controller, Post, Request, Response, Get, Delete } from '@nestjs/common';
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
            console.log("Error occurred god knows where: questions.controller.ts"); //Hehe
            let statusCode = 400;

            return {
                statusCode,
                error: error
            }
        }
    }

    @Get()
    async getAllQuestions(@Response() res: any) {
        try {
            const tests = await this.questionsService.getQuestions();
            res.status(tests.statusCode).json(tests)

            //return candidates; //copied from my old project, might be incorrect.

        } catch (error) {
            console.log("Error occurred god knows where: questions.controller.ts"); //Hehe
            let statusCode = 400;

            return {
                statusCode,
                error: error
            }
        }

            
    }
        
    

    @Delete()
     async deleteQuestion(@Request() req: any, @Response() res: any) {

        const deleted_id = req.body.question_id;
        try {
            const result = await this.questionsService.deleteQuestion(deleted_id)
            res.status(result.statusCode).json(result)
        } catch (error) {
            //const newError = error.code.split("/")[1];
            console.log("Error occurred god knows where: questions.controller.ts"); //Hehe
            let statusCode = 400;

            return {
                statusCode,
                error: error
            }
        }
    }
}