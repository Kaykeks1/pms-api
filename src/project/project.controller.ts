import { Body, Controller, HttpCode, HttpStatus, Patch, Post, Get, Param, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { ProjectService } from "./project.service";
import { CreateProjectDto, UpdateProjectDto, ProjectIdParams, OrganizationIdParams } from "./dto";
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('/organization/:organization_id/project')
export class ProjectController {
    constructor (private projectService: ProjectService) {}

    @Post('create')
    async create (@Param() params: OrganizationIdParams, @Body() dto: CreateProjectDto) {
        const { organization_id } = params
        return await this.projectService.create(organization_id, dto)
    }

    @Patch('/edit/:project_id')
    async edit (@Param() params: ProjectIdParams, @Body() dto: UpdateProjectDto) {
        const { project_id } = params
        return await this.projectService.edit(project_id, dto)
    }

    @Get('/all')
    async index (@Param() params: ProjectIdParams) {
        const { organization_id } = params
        return await this.projectService.fetchOrganizationProjects(organization_id)
    }

    @Get('/details/:project_id')
    async getProject (@Param() params: ProjectIdParams) {
        const { project_id } = params
        return await this.projectService.getProject(project_id)
    }
}