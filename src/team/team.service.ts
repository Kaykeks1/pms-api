import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { CreateMemberDto } from "./dto";

@Injectable()
export class TeamService {
    constructor (private prisma: PrismaService) {}
    async create(organization_id: number, dto: CreateMemberDto) {
        const { role, firstName, lastName } = dto;
        try {
            const project = await this.prisma.teamMember.create({
                data: {
                    firstName,
                    lastName,
                    role,
                    organizationId: Number(organization_id),
                },
            });
            return project
        } catch(error) {
            throw error
        }
    }

    async fetchOrganizationTeam (organization_id: number) {
        try {
            const teamWithTasks = await this.prisma.teamMember.findMany({
                where: {
                    organizationId: Number(organization_id),
                },
                include: { tasks: true },
            })
            return teamWithTasks.map(i => {
                const no_of_tasks = i.tasks.length;
                delete i.tasks
                return { ...i, no_of_tasks }
            })
        } catch (error) {
            throw error
        }
    }

    async getMember (member_id: number) {
        try {
            const memberWithTasks = await this.prisma.teamMember.findUnique({
                where: {
                  id: Number(member_id),
                },
                include: { tasks: true },
            })
            return memberWithTasks
        } catch (error) {
            throw error
        }
    }
}
