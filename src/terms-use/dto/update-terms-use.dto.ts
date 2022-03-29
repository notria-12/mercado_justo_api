import { PartialType } from '@nestjs/swagger';
import { CreateTermsUseDto } from './create-terms-use.dto';

export class UpdateTermsUseDto extends PartialType(CreateTermsUseDto) {}
