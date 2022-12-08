import { IsEmail, IsNotEmpty, IsString, IsDate, IsNumberString, IsEnum } from "class-validator";
// import { PrismaClient } from '@prisma/client';
import { Priority, Effort, Status } from '@prisma/client';

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsNumberString()
    @IsNotEmpty()
    organization: number;
}

export class UpdateProjectDto {
    @IsString()
    title?: string;

    @IsString()
    description?: string;

    @IsEnum(Priority)
    priority?: Priority;

    @IsEnum(Effort)
    effort?: Effort;

    @IsEnum(Status)
    status?: Status;

    @IsDate()
    deadline?: string;
}

export class ProjectIdParams {
    @IsNumberString()
    organization_id: number;

    @IsNumberString()
    project_id: number;
}

export class OrganizationIdParams {
    @IsNumberString()
    organization_id: number
}