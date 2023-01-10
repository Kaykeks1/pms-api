import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { UpdateTeamDto } from "./dto";

@Injectable()
export class TaskService {
    constructor (private prisma: PrismaService) {}
    async updateTeam (dto: UpdateTeamDto) {
        const { tasksWithTeam } = dto
        for (const item of tasksWithTeam) {
            await this.prisma.task.update({
                where: {
                    id: Number(item.id),
                },
                data: {
                    teamMembers: {
                        set: item.team
                    }
                }
            })
        }
    }
    async fetchProjectTasks (project_id: number) {
        try {
            const tasksWithTeam = await this.prisma.task.findMany({
                where: {
                    projectId: Number(project_id),
                },
                include: { teamMembers: true },
            })
            return tasksWithTeam
        } catch (error) {
            throw error
        }
    }
}
