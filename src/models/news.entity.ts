import { Column, Table, Model, HasMany } from "sequelize-typescript";
import { Chapter } from "./chapter.entity";

@Table
export class New extends Model {
    @Column
    title: string

    @Column
    text: string

    @Column
    image: string

    @Column
    author: string

    @HasMany(() => Chapter)
    chapter: Chapter[]
}