import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1678287244152 implements MigrationInterface {
  name = "migrations1678287244152";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attendants" DROP CONSTRAINT "FK_3d6386165eebace9075e4512cf0"`
    );
    await queryRunner.query(
      `CREATE TABLE "attendants_sector_sectors" ("attendantsId" integer NOT NULL, "sectorsId" integer NOT NULL, CONSTRAINT "PK_c206ceca5542d292e732ededd97" PRIMARY KEY ("attendantsId", "sectorsId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a4631399c08f50023616154f41" ON "attendants_sector_sectors" ("attendantsId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a0d1100087b42b172780c19ac0" ON "attendants_sector_sectors" ("sectorsId") `
    );
    await queryRunner.query(`ALTER TABLE "attendants" DROP COLUMN "sectorId"`);
    await queryRunner.query(
      `ALTER TABLE "Sectors" ADD "description" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "attendants_sector_sectors" ADD CONSTRAINT "FK_a4631399c08f50023616154f412" FOREIGN KEY ("attendantsId") REFERENCES "attendants"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "attendants_sector_sectors" ADD CONSTRAINT "FK_a0d1100087b42b172780c19ac02" FOREIGN KEY ("sectorsId") REFERENCES "Sectors"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(`
        INSERT INTO "Sectors"
            ("name", "userId", "description")
        VALUES
            ('Financeiro', '2', 'Setor destinado para assuntos relacionados a financias.')
    `);
    await queryRunner.query(`
        INSERT INTO "Sectors"
            ("name", "userId", "description")
        VALUES
            ('Administrativo', '2', 'Setor destinado para assuntos administrativos.')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attendants_sector_sectors" DROP CONSTRAINT "FK_a0d1100087b42b172780c19ac02"`
    );
    await queryRunner.query(
      `ALTER TABLE "attendants_sector_sectors" DROP CONSTRAINT "FK_a4631399c08f50023616154f412"`
    );
    await queryRunner.query(`ALTER TABLE "Sectors" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "attendants" ADD "sectorId" integer`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a0d1100087b42b172780c19ac0"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a4631399c08f50023616154f41"`
    );
    await queryRunner.query(`DROP TABLE "attendants_sector_sectors"`);
    await queryRunner.query(
      `ALTER TABLE "attendants" ADD CONSTRAINT "FK_3d6386165eebace9075e4512cf0" FOREIGN KEY ("sectorId") REFERENCES "Sectors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
