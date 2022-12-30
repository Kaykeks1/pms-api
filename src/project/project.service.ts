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
                    status: 'not_started',
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
        const tasksWithId = tasks ? tasks.filter(i => i.id) : []
        const tasksWithoutId = tasks ? tasks.filter(i => !i.id) : []

        try {
            if (tasksWithId.length) {
                for (let item of tasksWithId) {
                    await this.prisma.task.update({
                        where: {
                            id: Number(item.id),
                        },
                        data: {
                            description: item.description,
                            due_date: item.due_date,
                            is_completed: item.is_completed
                        }
                    })
                }
            }
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
                    tasks: { create: tasksWithoutId }
                },
                include: { tasks: true },
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