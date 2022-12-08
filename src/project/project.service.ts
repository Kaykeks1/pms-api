import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProjectDto, UpdateProjectDto, ProjectIdParams } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable({})
export class ProjectService {
    constructor (private prisma: PrismaService) {}
    async create(organization_id: number, dto: CreateProjectDto) {
        const { title } = dto;
        try {
            const project = await this.prisma.project.create({
                data: {
                    title,
                    organizationId: Number(organization_id),
                },
            });
            return project
        } catch(error) {
            throw error
        }
    }
    async edit(project_id: number, dto: UpdateProjectDto) {
        const { title, description, priority, effort, status, deadline } = dto;
        try {
            const updatedProject = await this.prisma.project.update({
                where: {
                    id: Number(project_id),
                },
                data: {
                    title,
                    description,
                    priority,
                    effort,
                    status,
                    deadline
                }
            })
            return updatedProject

        } catch(error) {
            throw error
        }
    }
} 