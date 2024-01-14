import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor (config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get("DATABASE_URL"), // 'postgresql://postgres:1234@localhost:5433/pms-api?schema=public'
                }
            }
        })
    }
}
