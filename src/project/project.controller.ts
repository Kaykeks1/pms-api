import { Body, Controller, HttpCode, HttpStatus, Patch, Post, Param, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { ProjectService } from "./project.service";
import { CreateProjectDto, UpdateProjectDto, ProjectIdParams } from "./dto";
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('project')
export class ProjectController {
    constructor (private projectService: ProjectService) {}

    @Post('create')
    async create (@Body() dto: CreateProjectDto) {
        console.log('herherhehre')
        return await this.projectService.create(dto)
    }

    @Patch('/edit/:project_id')
    async edit (@Param() params: ProjectIdParams, @Body() dto: UpdateProjectDto) {
        const { project_id } = params
        return await this.projectService.edit(project_id, dto)
    }
}