import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import { bcryptAdapter } from "../../../config";
import { PurchasesModel } from "./Purchases.model";

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
    default: Role.CLIENT,
  })
  role: Role;

  @Column({
    type: "varchar",
    default: "https://cdn-icons-png.flaticon.com/256/17/17004.png",
  })
  avatar: string;

  @Column({
    type: "enum",
    nullable: false,
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @Column({
    type: "boolean",
    default: false,
  })
  emailValidated: boolean;

  // Relations

  @OneToMany(() => PurchasesModel, (purchase) => purchase.user)
  // @JoinColumn({ name })
  purchases: PurchasesModel[];

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  //Use the trigger to encrypt the password before inserting it into the database
  @BeforeInsert()
  encryptPassword() {
    this.password = bcryptAdapter.hash(this.password);
  }
}
