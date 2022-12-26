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
        const { title, description, priority, effort, status, deadline, tasks } = dto;

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
                    deadline,
                    tasks: { create: tasks }
                }
            })
            return updatedProject

        } catch(error) {
            throw error
        }
    }

    async fetchOrganizationProjects (organization_id: number) {
        try {
            const projectsWithTasks = await this.prisma.project.findMany({
                where: {
                    organizationId: Number(organization_id),
                },
                include: { tasks: true },
            })
            return projectsWithTasks.map(i => {
                const no_of_tasks = i.tasks.length;
                delete i.tasks
                return { ...i, no_of_tasks }
            })
        } catch (error) {
            throw error
        }
    }

    async getProject (project_id: number) {
        try {
            const projectWithTasks = await this.prisma.project.findUnique({
                where: {
                  id: Number(project_id),
                },
                include: { tasks: true },
            })
            return projectWithTasks
        } catch (error) {
            throw error
        }
    }
} 