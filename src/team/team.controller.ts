import { Body, Controller, HttpCode, HttpStatus, Patch, Post, Get, Param, UseGuards } from "@nestjs/common";
import { TeamService } from "./team.service";
import { CreateMemberDto, MemberIdParams, OrganizationIdParams } from "./dto";
import { JwtGuard } from '../auth/guard';


@Controller('/organization/:organization_id/team')
export class TeamController {
    constructor (private teamService: TeamService) {}

    @Post('create')
    async create (@Param() params: OrganizationIdParams, @Body() dto: CreateMemberDto) {
        const { organization_id } = params
        return await this.teamService.create(organization_id, dto)
    }
    @Get('/all')
    async index (@Param() params: MemberIdParams) {
        const { organization_id } = params
        return await this.teamService.fetchOrganizationTeam(organization_id)
    }

    @Get('/details/:member_id')
    async getProject (@Param() params: MemberIdParams) {
        const { member_id } = params
        return await this.teamService.getMember(member_id)
    }
}
