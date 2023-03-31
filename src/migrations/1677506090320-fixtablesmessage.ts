import { MigrationInterface, QueryRunner } from "typeorm";

export class fixtablesmessage1677506090320 implements MigrationInterface {
    name = 'fixtablesmessage1677506090320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" ADD "customerId" integer`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_38eae633b624437d687be9c5471" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_38eae633b624437d687be9c5471"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "customerId"`);
    }

}
