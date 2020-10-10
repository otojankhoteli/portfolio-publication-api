import {MigrationInterface, QueryRunner} from 'typeorm';

export class initSchema1602285233443 implements MigrationInterface {
    name = 'initSchema1602285233443'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`CREATE TABLE "public"."portfolio" ("id" SERIAL NOT NULL, "imgUrl" character varying, "data" jsonb NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT current_timestamp, "update_date" TIMESTAMP NOT NULL DEFAULT current_timestamp, "user" integer NOT NULL, CONSTRAINT "PK_052d053568cecfe54916987ba64" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "public"."user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "mail" character varying NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "img_url" character varying, "create_date" TIMESTAMP NOT NULL DEFAULT current_timestamp, "update_date" TIMESTAMP NOT NULL DEFAULT current_timestamp, CONSTRAINT "UQ_b67337b7f8aa8406e936c2ff754" UNIQUE ("username"), CONSTRAINT "UQ_7777e9e4e5e204d79fb27b6a5c9" UNIQUE ("mail"), CONSTRAINT "PK_03b91d2b8321aa7ba32257dc321" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE INDEX "IDX_7777e9e4e5e204d79fb27b6a5c" ON "public"."user" ("mail") `);
      await queryRunner.query(`CREATE TABLE "public"."password_reset" ("id" SERIAL NOT NULL, "mail" character varying NOT NULL, "resetToken" character varying NOT NULL, "expire_date" TIMESTAMP NOT NULL, CONSTRAINT "REL_1aea94b87088b8922899d687fb" UNIQUE ("mail"), CONSTRAINT "PK_be9c007a4c9db51fe1ce72126fe" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE INDEX "IDX_1aea94b87088b8922899d687fb" ON "public"."password_reset" ("mail") `);
      await queryRunner.query(`CREATE INDEX "IDX_351705dd15fee53930d41ac88d" ON "public"."password_reset" ("resetToken") `);
      await queryRunner.query(`ALTER TABLE "public"."portfolio" ADD CONSTRAINT "FK_3296a642ccb90b9f53758f143c9" FOREIGN KEY ("user") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "public"."password_reset" ADD CONSTRAINT "FK_1aea94b87088b8922899d687fb8" FOREIGN KEY ("mail") REFERENCES "public"."user"("mail") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "public"."password_reset" DROP CONSTRAINT "FK_1aea94b87088b8922899d687fb8"`);
      await queryRunner.query(`ALTER TABLE "public"."portfolio" DROP CONSTRAINT "FK_3296a642ccb90b9f53758f143c9"`);
      await queryRunner.query(`DROP INDEX "public"."IDX_351705dd15fee53930d41ac88d"`);
      await queryRunner.query(`DROP INDEX "public"."IDX_1aea94b87088b8922899d687fb"`);
      await queryRunner.query(`DROP TABLE "public"."password_reset"`);
      await queryRunner.query(`DROP INDEX "public"."IDX_7777e9e4e5e204d79fb27b6a5c"`);
      await queryRunner.query(`DROP TABLE "public"."user"`);
      await queryRunner.query(`DROP TABLE "public"."portfolio"`);
    }
}
