import { ApiProperty } from '@nestjs/swagger';
import { PriceDocument } from 'src/schema';

class Access {
  @ApiProperty()
  mes: number;
  @ApiProperty()
  ano: number;
  @ApiProperty()
  total: number;
}

class ProductsAccess {
  @ApiProperty()
  acessos: Access[];
  @ApiProperty()
  produto: PriceDocument;
}

export class AccessResponse {
  @ApiProperty()
  usuarios: Access[];
  @ApiProperty()
  produtos: ProductsAccess[];
}