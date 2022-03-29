import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class GetListModel {
  @ApiProperty()
  @Prop()
  value: string;
  @ApiProperty()
  @Prop()
  text: string;
}