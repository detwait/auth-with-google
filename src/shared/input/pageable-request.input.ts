import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Transform, TransformFnParams } from "class-transformer";
import { IsDefined, IsNumber } from "class-validator";


@Exclude()
export class PageableRequestInput {
  @ApiProperty({ required: true, type: Number })
  @IsNumber()
  @IsDefined()
  @Transform(({ value }: TransformFnParams) => {
    return Number(value) || 100;
  })
  @Expose()
  limit!: number;

  @ApiProperty({ required: true, type: Number, example: 1 })
  @IsNumber()
  @IsDefined()
  @Transform(({ value }: TransformFnParams) => {
    return Number(value) || 1;
  })
  @Expose()
  page!: number;
}