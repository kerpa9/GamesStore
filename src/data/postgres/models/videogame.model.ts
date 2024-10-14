import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { PurchasesModel } from "./Purchases.model";

enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

@Entity()
export class VideoGameModel extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({
    unique: true,
    nullable: false,
    length: 100,
  })
  title: string;

  @Column({
    nullable: false,
    type: "text",
  })
  description: string;

  @Column({
    nullable: true,
    length: 255,
  })
  image: string;

  @Column({
    nullable: false,
  })
  price: number;

  @Column({
    type: "enum",
    nullable: false,
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @Column({
    type: "varchar",
    array: true,
  })
  imgs: string[];

  @OneToMany(() => PurchasesModel, (purchases) => purchases.videogame)
  purchases: PurchasesModel[];

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
