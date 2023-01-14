import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
// import { OrganizationIdParams } from "./dto";

@Injectable()
export class StatisticsService {
    constructor (private prisma: PrismaService) {}
    async getTasksMetrics (organization_id: number) {
        const projectWithTasks = await this.prisma.project.findMany({
            where: {
                organizationId: Number(organization_id),
            },
            include: { tasks: true },
        });
        let tasks = []
        projectWithTasks.forEach(project => {
            tasks = [ ...tasks, ...project.tasks ]
        })
        const total = tasks.length;
        let completed = 0
        tasks.forEach(task => {
            if (task.is_completed) {
                completed += 1;
            }
        })
        return { total, completed, completedPercentage: (completed / total) * 100 }
    }
    
    async getMembersMetrics (organization_id: number) {
        const members = await this.prisma.teamMember.findMany({
            where: {
                organizationId: Number(organization_id),
            },
        });
        const total = members.length;
        return { total }
    }
    
    async getProjectStatusChart (organization_id: number) {
        const projects = await this.prisma.project.findMany({
            where: {
                organizationId: Number(organization_id),
            },
        });
        const total = projects.length;
        let totalProjectsByStatus = {
            not_started: 0,
            started: 0,
            delayed: 0,
            completed: 0,
            on_hold: 0
        }
        projects.forEach(project => {
            if (project.status === 'not_started'
                || project.status === 'started'
                || project.status === 'delayed'
                || project.status === 'completed'
                || project.status === 'on_hold'
            ) {
                totalProjectsByStatus[project.status] += 1 
            }
        })
        let percentageOfProjectsByStatus = {}
        for (const key in totalProjectsByStatus) {
            percentageOfProjectsByStatus[key] = ((totalProjectsByStatus[key] || 0) / total) * 100
        }
        return percentageOfProjectsByStatus
    }

    async getOverview (organization_id: number) {
        try {
            const { completedPercentage: completedTasksPercentage, total: totalTasks } = await this.getTasksMetrics(organization_id)
            const { total: totalMembers } = await this.getMembersMetrics(organization_id)
            const percentageOfProjectsByStatus = await this.getProjectStatusChart(organization_id)
            return {
                completedTasksPercentage,
                totalTasks,
                totalMembers,
                percentageOfProjectsByStatus,
            }
        } catch (error) {
            throw error
        }
    }
}
