import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { StatisticsService } from "./statistics.service";
import { OrganizationIdParams } from "./dto";
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('/organization/:organization_id/statistics')
export class StatisticsController {
    constructor (private statisticsService: StatisticsService) {}

    @Get('/overview')
    async overview (@Param() params: OrganizationIdParams) {
        const { organization_id } = params
        return await this.statisticsService.getOverview(organization_id)
    }
}
