import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import User from "./User";

@Entity('messages')
class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @JoinColumn({ name: 'user_id'})
  @ManyToOne(() => User)
  user: User;

  @Column()
  user_id: string;

  @Column()
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;
}

export default Message;