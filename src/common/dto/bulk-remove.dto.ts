import { IsNotEmpty, IsArray, ArrayNotEmpty, IsMongoId } from '../decorator';

export class BulkRemoveDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  ids: string[];
}