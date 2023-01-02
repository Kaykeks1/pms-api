import { IsNotEmpty, IsString, IsNumberString, IsEnum } from "class-validator";
// import { PrismaClient } from '@prisma/client';
import { Role } from '@prisma/client';

export class CreateMemberDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;
    
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEnum(Role)
    role?: Role;
}

export class OrganizationIdParams {
    @IsNumberString()
    organization_id: number
}

export class MemberIdParams {
    @IsNumberString()
    organization_id: number;

    @IsNumberString()
    member_id: number;
}