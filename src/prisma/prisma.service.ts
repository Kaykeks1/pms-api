import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor (config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get("DATABASE_URL"), // 'postgresql://postgres:123@localhost:5434/my-nestjs-app?schema=public'
                }
            }
        })
    }
}
