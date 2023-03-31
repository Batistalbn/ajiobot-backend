import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1678093092935 implements MigrationInterface {
    name = 'migrations1678093092935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Sectors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_ad2730b7f1790d06da70779326c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "attendants" ADD "sectorId" integer`);
        await queryRunner.query(`ALTER TABLE "Sectors" ADD CONSTRAINT "FK_1f9cfe48882c12575b308726d24" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendants" ADD CONSTRAINT "FK_3d6386165eebace9075e4512cf0" FOREIGN KEY ("sectorId") REFERENCES "Sectors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendants" DROP CONSTRAINT "FK_3d6386165eebace9075e4512cf0"`);
        await queryRunner.query(`ALTER TABLE "Sectors" DROP CONSTRAINT "FK_1f9cfe48882c12575b308726d24"`);
        await queryRunner.query(`ALTER TABLE "attendants" DROP COLUMN "sectorId"`);
        await queryRunner.query(`DROP TABLE "Sectors"`);
    }

}
