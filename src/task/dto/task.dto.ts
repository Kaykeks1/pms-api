import { IsArray } from "class-validator";

export class UpdateTeamDto {
    @IsArray()
    tasksWithTeam: any;
}