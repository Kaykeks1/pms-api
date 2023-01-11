import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { UpdateTeamDto } from "./dto";

@Injectable()
export class TaskService {
    constructor (private prisma: PrismaService) {}
    async updateTeam (dto: UpdateTeamDto) {
        try {
            const { tasksWithTeam } = dto
            let res = []
            for (const item of tasksWithTeam) {
                const data = await this.prisma.task.update({
                    where: {
                        id: Number(item.id),
                    },
                    data: {
                        teamMembers: {
                            set: item.team
                        }
                    },
                    include: { teamMembers: true }
                })
                res = [ ...res, data ]
            }
            return res
        } catch (error) {
            throw error
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
