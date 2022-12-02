import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor (private authservice: AuthService) {}

    @Post('/signup')
    async signup (@Body() dto: AuthDto) {
        console.log(dto)
        return await this.authservice.signup(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('/signin')
    signin (@Body() dto: AuthDto) {
        return this.authservice.signin(dto)
    }
}