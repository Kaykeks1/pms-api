import { IsEmail, IsNotEmpty, IsString, IsDate, IsNumberString, IsEnum } from "class-validator";
// import { PrismaClient } from '@prisma/client';
import { Priority, Effort, Status } from '@prisma/client';

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    title: string;
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
    project_id: number
}