import { Column,Table, HasMany, Model } from "sequelize-typescript";
import { User } from "src/user/models/user.models";

@Table
export class Role extends Model{
    @Column({
        unique:true,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    })
    id:number;
    
    @Column({
        allowNull:false,
        unique:true
    })
    type:string;

    @HasMany(()=> User, 'role_id')
    users:User[];
}