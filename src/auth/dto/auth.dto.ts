import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsString()
    name: string;
}