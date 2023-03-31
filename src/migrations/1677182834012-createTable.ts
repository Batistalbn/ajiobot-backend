import { hashSync } from "bcrypt";
import { MigrationInterface, QueryRunner } from "typeorm";

export class createTable1677182834012 implements MigrationInterface {
  name = "createTable1677182834012";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "scheme" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_76643bf1d7e629d8bc8af8ac917" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "mail" character varying NOT NULL, "name" character varying NOT NULL, "cpf_cnpj" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "money" integer NOT NULL DEFAULT '0', "permission" integer NOT NULL DEFAULT '1', "schemeId" integer, CONSTRAINT "UQ_2e5b50f4b7c081eceea476ad128" UNIQUE ("mail"), CONSTRAINT "UQ_c0f67bf13347e567a6487bcef20" UNIQUE ("cpf_cnpj"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "attendants" ("id" SERIAL NOT NULL, "mail" character varying NOT NULL, "name" character varying NOT NULL, "cpf_cnpj" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "money" integer NOT NULL DEFAULT '0', "permission" integer NOT NULL DEFAULT '0', "userId" integer, CONSTRAINT "UQ_d6b7538376d726e939a9fd46716" UNIQUE ("mail"), CONSTRAINT "UQ_083b49960342b691d897101f536" UNIQUE ("cpf_cnpj"), CONSTRAINT "PK_acc3b5e2f641a8e9019a56211f6" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" SERIAL NOT NULL, "phone" character varying NOT NULL, "name" character varying NOT NULL, "create_date" TIMESTAMP NOT NULL, "blocked" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_88acd889fbe17d0e16cc4bc9174" UNIQUE ("phone"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "message" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "text" character varying NOT NULL, "date_time" TIMESTAMP NOT NULL, "destination" character varying NOT NULL, "sender" character varying NOT NULL, "is_customer_message" boolean NOT NULL, "usersId" integer, "chatId" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "chat" ("id" SERIAL NOT NULL, "protocol" character varying NOT NULL, "created_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "concluded" boolean NOT NULL, "active" boolean NOT NULL, "custumerId" integer, CONSTRAINT "UQ_4d92345fff6415734a036a8b465" UNIQUE ("protocol"), CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_64a0879d1c4b0764aebc15f94bf" FOREIGN KEY ("schemeId") REFERENCES "scheme"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "attendants" ADD CONSTRAINT "FK_41ff05bad34982b5619023227db" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_53a1cb690159f98531b71def7b6" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_619bc7b78eba833d2044153bacc" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "chat" ADD CONSTRAINT "FK_955e162a135bda62cb453bfc4d8" FOREIGN KEY ("custumerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`
            INSERT INTO "users"
                ("mail", "name", "cpf_cnpj", "phone", "password", "money", "permission")
            VALUES
								('adminuser@ajio.com', 'Admin Ajio', '39778028000190', '3333-3333', '${hashSync(
                  "12345678",
                  8
                )}', '100', '2'),

                ('johndoe@ajio.com', 'John Doe', '34241345225214', '3333-4444', '${hashSync(
                  "12345678",
                  8
                )}', '100', '1');
		`);
    await queryRunner.query(`
		INSERT INTO "attendants"
				("mail", "name", "cpf_cnpj", "phone", "password", "money", "permission", "userId")
		VALUES
		('bob@ajio.com', 'Bob Bob', '65498732165', '3333-4442', '${hashSync(
      "12345678",
      8
    )}', '0', '0', '2'),
		('jacob@ajio.com', 'Jacob Jacob', '65498732765', '1111-4442', '${hashSync(
      "12345678",
      8
    )}', '0', '0', '2');
    `);
    await queryRunner.query(`
      INSERT INTO "customers"
        ("phone", "name", "create_date", "blocked")
      VALUES
        ('45999343142', 'xandao', '2023-03-20 09:22:11.036', 'false');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chat" DROP CONSTRAINT "FK_955e162a135bda62cb453bfc4d8"`
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_619bc7b78eba833d2044153bacc"`
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_53a1cb690159f98531b71def7b6"`
    );
    await queryRunner.query(
      `ALTER TABLE "attendants" DROP CONSTRAINT "FK_41ff05bad34982b5619023227db"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_64a0879d1c4b0764aebc15f94bf"`
    );
    await queryRunner.query(`DROP TABLE "chat"`);
    await queryRunner.query(`DROP TABLE "message"`);
    await queryRunner.query(`DROP TABLE "customers"`);
    await queryRunner.query(`DROP TABLE "attendants"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "scheme"`);
  }
}
