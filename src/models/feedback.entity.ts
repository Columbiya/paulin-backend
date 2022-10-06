import { DataTypes } from "sequelize";
import { Column, Table, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Partner } from "./partner.entity";

@Table
export class Feedback extends Model {
    @Column
    rating: number

    @Column(DataTypes.TEXT)
    text: string

    @Column(DataTypes.TEXT)
    expert: string

    @BelongsTo(() => Partner)
    partner: Partner

    @ForeignKey(() => Partner)
    @Column({allowNull: false})
    partnerId: number
} 