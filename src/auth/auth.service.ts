import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { config } from "process";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
    // constructor (prisma: PrismaService) {
    //     this.prisma = prisma
    // }
    constructor (private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}
    // constructor (private prisma: PrismaService, private jwt: JwtService) {}
    async signup(dto: AuthDto) {
        try {
            const hash = await argon.hash(dto.password);
            const user = await this.prisma.user.create({
                data: {
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    email: dto.email,
                    hash,
                    organizations: { create: [{ name: dto.name }] }
                },
            });
            delete user.hash
            // return user
            const { access_token } = await this.signToken(user.id, user.email)
            const userWithOrganization = await this.prisma.user.findUnique({
                where: {
                  id: user.id,
                },
                include: { organizations: true },
            })
            return {
                token: access_token,
                user: userWithOrganization,
            }
        } catch(error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error
        }
    }
    async signin(dto: AuthDto) {

        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        });

        if (!user) throw new ForbiddenException('Credentials incorrect')

        const passwordMatches = await argon.verify(user.hash, dto.password)

        if (!passwordMatches) throw new ForbiddenException('Credentials incorrect')

        delete user.hash
        // return user
        const { access_token } = await this.signToken(user.id, user.email)
        const userWithOrganization = await this.prisma.user.findUnique({
            where: {
              id: user.id,
            },
            include: { organizations: true },
        })
        return {
            token: access_token,
            user: userWithOrganization,
        }
    }
    async signToken (
        userId: number,
        email: string
    ): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        }

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: this.config.get('JWT_SECRET')
        })

        return {
            access_token: token
        }
    }
} 