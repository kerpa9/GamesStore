import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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
    nullable: false,
    length: 255,
  })
  image: string;

  @Column({
    nullable: false,
  })
  price: number;

  @Column({
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
