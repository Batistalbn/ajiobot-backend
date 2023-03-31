import { MigrationInterface, QueryRunner } from "typeorm";

export class srcColumnInAttendant1677763058207 implements MigrationInterface {
    name = 'srcColumnInAttendant1677763058207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendants" ADD "src" character varying`);
        await queryRunner.query(`ALTER TABLE "attendants" ADD CONSTRAINT "UQ_174ab0cf2fbdb6096007121c5d1" UNIQUE ("src")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendants" DROP CONSTRAINT "UQ_174ab0cf2fbdb6096007121c5d1"`);
        await queryRunner.query(`ALTER TABLE "attendants" DROP COLUMN "src"`);
    }

}
