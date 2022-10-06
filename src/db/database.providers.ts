import { Sequelize } from "sequelize-typescript";
import { Chapter } from "src/models/chapter.entity";
import { Feedback } from "src/models/feedback.entity";
import { New } from "src/models/news.entity";
import { Partner } from "src/models/partner.entity";
import { Request } from "src/models/request.entity";

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
        const sequelize = new Sequelize({
            dialect: 'mysql',
            host: 'localhost',
            port: 3306,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        sequelize.addModels([Partner, Feedback, New, Request, Chapter]);
        await sequelize.sync();
        return sequelize;
        },
    },
];