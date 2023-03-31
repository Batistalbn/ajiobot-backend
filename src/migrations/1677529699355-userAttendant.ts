import { MigrationInterface, QueryRunner } from "typeorm";

export class userAttendant1677529699355 implements MigrationInterface {
  name = "userAttendant1677529699355";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "chat" ADD "attendantId" integer`);
    await queryRunner.query(
      `ALTER TABLE "chat" ADD CONSTRAINT "FK_a36f1efd69cb2999ad1f982c06d" FOREIGN KEY ("attendantId") REFERENCES "attendants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`
        INSERT INTO "chat"
            ("protocol", "created_date", "end_date", "concluded", "active", "custumerId", "attendantId")
        VALUES
            ('2204150001', '2023-03-20 09:22:11.036', '2023-03-20 09:22:11.036', 'false', 'true', 1, 1)
        `);
    await queryRunner.query(`
        INSERT INTO "message"
            ("type", "text", "date_time", "destination", "sender",  "is_customer_message", "usersId", "chatId", "from" ,"customerId")
        VALUES
            ('text', 'Ola', '2023-03-20 09:22:11.036', '45999343142','45999343147' ,'false',  '2', '1', '45999343142','1')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chat" DROP CONSTRAINT "FK_a36f1efd69cb2999ad1f982c06d"`
    );
    await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "attendantId"`);
  }
}
