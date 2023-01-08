import { Body, Controller, HttpCode, HttpStatus, Patch, Post, Get, Param, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { TaskService } from "./task.service";
import { UpdateTeamDto } from "./dto";
import { JwtGuard } from '../auth/guard';


@UseGuards(JwtGuard)
@Controller('/organization/:organization_id/task')
export class TaskController {
    constructor (private taskService: TaskService) {}
    @Patch('/update-team')
    async updateTeam (@Body() dto: UpdateTeamDto) {
        return await this.taskService.updateTeam(dto)
    }
}
