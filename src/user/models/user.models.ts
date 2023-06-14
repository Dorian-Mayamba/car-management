import { Table,Model,Column, BelongsTo } from "sequelize-typescript";
import { Role } from "src/role/models/role.models.role";

@Table
export class User extends Model{
    @Column({
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    })
    id:number;

    @Column({
        allowNull:false
    })
    name:string;

    @Column({
        allowNull:false,
        unique:true
    })
    email:string

    @Column({
        allowNull:false
    })
    password:string;

    @BelongsTo(()=> Role, 'role_id')
    role:Role

}