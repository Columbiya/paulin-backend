import { DataTypes } from "sequelize";
import { Column, Table, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { New } from "./news.entity";

@Table
export class Chapter extends Model {
    @Column(DataTypes.TEXT)
    text: string

    @ForeignKey(() => New)
    newId: number
} 