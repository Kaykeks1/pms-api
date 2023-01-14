import { IsNumberString } from "class-validator";

export class OrganizationIdParams {
    @IsNumberString()
    organization_id: number
}