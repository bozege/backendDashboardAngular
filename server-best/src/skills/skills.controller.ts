import { Controller, Post, Request, Response } from '@nestjs/common';
import { SkillsService } from './skills.service';


@Controller('skills')
export class SkillsController {
    constructor(private readonly skillsService: SkillsService) { }


    @Post()
    async addSkill(@Request() req: any, @Response() res: any) {
        const { skill_name, skill_detail, test } = req.body;
        try {
            const result = await this.skillsService.addSkill(skill_name, skill_detail, test)
            res.status(result.statusCode).json(result)
        } catch (error) {
            console.log("error")
            return { msg: "Internal Error!" }
        }
    }

}