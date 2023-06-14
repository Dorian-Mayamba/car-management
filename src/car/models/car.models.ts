import { BelongsTo, Column,Model,Table } from "sequelize-typescript";
import { User } from "src/user/models/user.models";

@Table
export class Car extends Model{
    @Column({
        primaryKey:true,
        unique:true,
        allowNull:false,
        autoIncrement:true
    })
    id:number;

    @Column({
        allowNull:false,
    })
    make:string;

    @Column({
        allowNull:false
    })
    model:string;

    @Column({
        allowNull:false
    })
    name:string;

    @Column({
        allowNull:true
    })
    color:string;

    @Column({
        allowNull:false
    })
    user_id:number;

    @BelongsTo(() => User, 'user_id')
    user:User;
}
