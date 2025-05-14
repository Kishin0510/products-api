import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("auth_users")
export class AuthUserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
}
