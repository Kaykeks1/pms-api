import { Body, Controller, HttpCode, HttpStatus, Patch, Post, Get, Param, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { TaskService } from "./task.service";
import { UpdateTeamDto, ProjectIdParams } from "./dto";
import { JwtGuard } from '../auth/guard';


@UseGuards(JwtGuard)
@Controller('/organization/:organization_id/task')
export class TaskController {
    constructor (private taskService: TaskService) {}
    @Patch('/update-team')
    async updateTeam (@Body() dto: UpdateTeamDto) {
        return await this.taskService.updateTeam(dto)
    }

    @Get('/project/:project_id')
    async index (@Param() params: ProjectIdParams) {
        const { project_id } = params
        return await this.taskService.fetchProjectTasks(project_id);
    }
}
