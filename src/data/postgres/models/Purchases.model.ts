import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AuthModel } from "./Auth.model";
import { VideoGameModel } from "./Videogame.model";

enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

@Entity()
export class PurchasesModel extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({
    type: "enum",
    nullable: false,
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  // Relations

  @ManyToOne(() => AuthModel, (user) => user.purchases)
  user: AuthModel;

  @ManyToOne(() => VideoGameModel, (videogame) => videogame.purchases)
  videogame: VideoGameModel;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
