import { MigrationInterface, QueryRunner } from "typeorm";

export class addStageInChat1679340306794 implements MigrationInterface {
    name = 'addStageInChat1679340306794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" ADD "stage" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "stage"`);
    }

}
