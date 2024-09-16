import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

enum Role {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
}

@Entity()
export class AuthModel extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({
    type: "varchar",
    length: 60,
    nullable: false,
  })
  first_name: string;

  @Column({
    type: "varchar",
    length: 60,
    nullable: false,
  })
  last_name: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  password: string;

  @Column({
    type: "enum",
    nullable: false,
    enum: Role,
  })
  role: Role;

  @Column({
    type: "enum",
    nullable: false,
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
