import { Column, Table, Model, ForeignKey, HasOne } from "sequelize-typescript";
import { Feedback } from "./feedback.entity";

@Table
export class Partner extends Model {
    @Column
    name: string

    @Column
    link: string

    @Column
    logo: string

    @HasOne(() => Feedback)
    partnersFeedback: number
}