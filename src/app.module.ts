import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

import { ProjectController } from './project/project.controller';
import { ProjectService } from './project/project.service';
import { ProjectModule } from './project/project.module';
import { TeamService } from './team/team.service';
import { TeamController } from './team/team.controller';
import { TeamModule } from './team/team.module';
import { TaskService } from './task/task.service';
import { TaskModule } from './task/task.module';
import { StatisticsService } from './statistics/statistics.service';
import { StatisticsController } from './statistics/statistics.controller';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule, ProjectModule, TeamModule, TaskModule, StatisticsModule],
  controllers: [ProjectController, TeamController, StatisticsController],
  providers: [ProjectService, TeamService, TaskService, StatisticsService],
})
export class AppModule {}
