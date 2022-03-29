import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/schema';

export type AccessDocument = Access & mongoose.Document;

@Schema()
export class Access {
  @ApiProperty()
  @Prop()
  colecao: string;
  @ApiProperty({ type: User })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' })
  usuario: User | string;
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, refPath: 'colecao' })
  documento: string;
  @ApiProperty()
  @Prop({ default: new Date() })
  data_hora: Date;
}

export const AccessSchema = SchemaFactory.createForClass(Access);
AccessSchema.index({ colecao: 1 });