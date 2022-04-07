import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthMiddleWare } from './middlewares/auth.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CandidatesController } from './candidates/candidates.controller';
import { CandidatesModule } from './candidates/candidates.module';
import { CandidatesService } from './candidates/candidates.service';
import { SkillsController } from './skills/skills.controller';
import { SkillsModule } from './skills/skills.module';
import { SkillsService } from './skills/skills.service';
import { UsersModule } from './users/users.module';
import { TestsModule } from './tests/tests.module';
import { TestsController } from './tests/tests.controller';
import { TestsService } from './tests/tests.service';
import { QuestionsModule } from './questions/questions.module';
import { QuestionsController } from './questions/questions.controller';
import { QuestionsService } from './questions/questions.service';


@Module({
  imports: [UsersModule, SkillsModule, CandidatesModule, TestsModule, QuestionsModule],
  controllers: [AppController, SkillsController, CandidatesController, TestsController, QuestionsController],
  providers: [AppService, SkillsService, CandidatesService, TestsService, QuestionsService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleWare).forRoutes();
  }
}
