import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
// import { OrganizationIdParams } from "./dto";
import { Task } from '@prisma/client'

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

    async getTaskDoneTrend (organization_id: number) {
        // const data = await this.prisma.$queryRaw<Task[]>`SELECT * FROM "Task" RIGHT JOIN "Project" ON "projectId" = "Project".id;`
        // const data = await this.prisma.$queryRaw<Task[]>`SELECT date_part('week', due_date) AS week, date_part('year', due_date) AS year, COUNT(*) AS no_of_tasks_done FROM "Task" RIGHT JOIN "Project" ON "projectId" = "Project".id WHERE "organizationId" = ${Number(organization_id)} GROUP BY date_part('week', due_date), date_part('year', due_date);`
         const data = await this.prisma.$queryRaw<any[]>`SELECT date_part('week', due_date) AS week, date_part('year', due_date) AS year, COUNT(*) AS no_of_tasks_done FROM "Task" INNER JOIN "Project" ON "projectId" = "Project".id WHERE "organizationId" = ${Number(organization_id)} GROUP BY date_part('week', due_date), date_part('year', due_date);`
        return data.map(i => ({  ...i, no_of_tasks_done: Number(i.no_of_tasks_done) }))
    }

    async mostDueProjects (organization_id: number) {
         const projects = await this.prisma.project.findMany({
            where: {
                organizationId: Number(organization_id),
                NOT: [
                    {
                        deadline: null
                    },
                ],
            },
            orderBy: [
                {
                    deadline: 'desc'
                }
            ],
            take: 5
        });
        return projects;
    }

    async getOverview (organization_id: number) {
        try {
            const { completedPercentage: completedTasksPercentage, total: totalTasks } = await this.getTasksMetrics(organization_id)
            const { total: totalMembers } = await this.getMembersMetrics(organization_id)
            const percentageOfProjectsByStatus = await this.getProjectStatusChart(organization_id)
            const taskTrend = await this.getTaskDoneTrend(organization_id)
            const mostDueProjects = await this.mostDueProjects(organization_id)
            return {
                completedTasksPercentage,
                totalTasks,
                totalMembers,
                percentageOfProjectsByStatus,
                taskTrend,
                mostDueProjects,
            }
        } catch (error) {
            throw error
        }
    }
}
