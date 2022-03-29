import { applyDecorators } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiExtraModels, ApiHeader } from '@nestjs/swagger';
import { Apps } from 'src/auth/roles';

export function ApiController(
  apiTag: string,
  apiExtraModels: Function[],
  apiBearerAuth = false
) {
  return applyDecorators(
    ApiTags(apiTag),
    ApiExtraModels(...apiExtraModels),
    ApiHeader({
      name: 'X-App-Origem',
      description: 'Indica de onde a requisição foi feita.',
      required: false,
      schema: {
        default: Apps.SWAGGER_MERCADO_JUSTO,
        enum: Object.keys(Apps)
      }
    }),
    apiBearerAuth ? ApiBearerAuth() : () => {},
  );
}