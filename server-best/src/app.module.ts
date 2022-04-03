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


@Module({
  imports: [UsersModule, SkillsModule, CandidatesModule],
  controllers: [AppController, SkillsController, CandidatesController],
  providers: [AppService, SkillsService, CandidatesService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleWare).forRoutes();
  }
}
