import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import argon2 from "argon2";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  /*
    Property used by the encryption mechanism.
  */
  private temporaryPassword: string;

  /*
    Hooks.
  */
  @AfterLoad()
  loadTemporaryPassword(): void {
    this.temporaryPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password === this.temporaryPassword) {
      return;
    }

    try {
      this.password = await argon2.hash(this.password);
    } catch {
      throw new Error("Failed to encrypt password");
    }
  }
}
