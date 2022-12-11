import { MigrationInterface, QueryRunner } from "typeorm";

export class dev1670787721325 implements MigrationInterface {
    name = 'dev1670787721325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "create_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "deleted_date" TIMESTAMP, "name" character varying(300) NOT NULL, "email" character varying(300) NOT NULL, "birthdayDate" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_92335a9854b1aee03a110f1ff8" ON "user" ("email") WHERE deleted_date is NULL`);
        await queryRunner.query(`CREATE TABLE "user_google_sub" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "create_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "deleted_date" TIMESTAMP, "userId" uuid NOT NULL, "sub" character varying(300), CONSTRAINT "REL_f2e95f30959e42f0ee76e913b6" UNIQUE ("userId"), CONSTRAINT "PK_d84bc894743d657dc9d87be2b7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_689d6117b970b60b4f2d74165e" ON "user_google_sub" ("sub") WHERE deleted_date is NULL`);
        await queryRunner.query(`ALTER TABLE "user_google_sub" ADD CONSTRAINT "FK_f2e95f30959e42f0ee76e913b62" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_google_sub" DROP CONSTRAINT "FK_f2e95f30959e42f0ee76e913b62"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_689d6117b970b60b4f2d74165e"`);
        await queryRunner.query(`DROP TABLE "user_google_sub"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_92335a9854b1aee03a110f1ff8"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
