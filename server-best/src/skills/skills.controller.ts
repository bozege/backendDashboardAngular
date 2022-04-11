import { Controller, Post, Request, Response, Get, Delete } from '@nestjs/common';
import { SkillsService } from './skills.service';


@Controller('skills')
export class SkillsController {
    constructor(private readonly skillsService: SkillsService) { }


    @Post()
    async addSkill(@Request() req: any, @Response() res: any) {
        const { skill_name, skill_detail, skill_test } = req.body;
        try {
            const result = await this.skillsService.addSkill(skill_name, skill_detail, skill_test)
            res.status(result.statusCode).json(result)
        } catch (error) {
            console.log("error")
            return { msg: "Internal Error!" }
        }
    }

    @Get()
    async getAllSkills(@Response() res: any) {
        try {
            const tests = await this.skillsService.getSkills();
            res.status(tests.statusCode).json(tests)

            

        } catch (error) {
            console.log("error")
            return { msg: "Internal Erro!" }

            
        }
        
    }

    @Delete()
     async deleteCandidate(@Request() req: any, @Response() res: any) {

        const deleted_id = req.body.skill_id;
        try {
            const result = await this.skillsService.deleteSkill(deleted_id)
            res.status(result.statusCode).json(result)
        } catch (error) {
            console.log("error")
            return { msg: "Internal Error!" }
        }
    }

}