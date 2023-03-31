import { MigrationInterface, QueryRunner } from "typeorm";

export class fixTalbleMessage1677245401126 implements MigrationInterface {
    name = 'fixTalbleMessage1677245401126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" ADD "from" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "from"`);
    }

}
