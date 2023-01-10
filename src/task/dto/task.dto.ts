import { IsArray, IsNumberString } from "class-validator";

export class UpdateTeamDto {
    @IsArray()
    tasksWithTeam: any;
}

export class ProjectIdParams {
    @IsNumberString()
    project_id: number;
}
