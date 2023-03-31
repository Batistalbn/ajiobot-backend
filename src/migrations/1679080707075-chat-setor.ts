import { MigrationInterface, QueryRunner } from "typeorm";

export class chatSetor1679080707075 implements MigrationInterface {
  name = "chatSetor1679080707075";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "chat" ADD "sectorId" integer`);
    await queryRunner.query(
      `ALTER TABLE "chat" ADD CONSTRAINT "FK_f052920b39dd02897fca6a49f1e" FOREIGN KEY ("sectorId") REFERENCES "Sectors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`
        INSERT INTO "chat"
            ("protocol", "created_date", "end_date", "concluded", "active", "custumerId", "attendantId", "sectorId")
        VALUES
            ('2204150002', '2023-03-20 10:22:11.036', '2023-03-20 10:22:11.036', 'false', 'true', 1, 1, 2)
        `);
    await queryRunner.query(`
        INSERT INTO "message"
            ("type", "text", "date_time", "destination", "sender",  "is_customer_message", "usersId", "chatId", "from" ,"customerId")
        VALUES
            ('text', 'Oi', '2023-03-20 09:22:11.036', '43988327515','45999343147' ,'false',  '2', '1', '43988327515','1')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chat" DROP CONSTRAINT "FK_f052920b39dd02897fca6a49f1e"`
    );
    await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "sectorId"`);
  }
}
