import { getSchemaPath } from '@nestjs/swagger';

export const ApiResSchema = {
  apply: schema => ({
    schema: {
      type: 'object',
      properties: {
        mensagem: {
          type: 'string',
        },
        dados: {
          type: 'object',
          $ref: getSchemaPath(schema),
        },
        timestamp: {
          type: 'string',
          format: 'date-time'
        }
      }
    }
  }),
  applyArr: schema => ({
    schema: {
      type: 'object',
      properties: {
        mensagem: {
          type: 'string',
        },
        dados: {
          type: 'array',
          items: {
            type: 'object',
            $ref: getSchemaPath(schema),
          }
        },
        timestamp: {
          type: 'string',
          format: 'date-time'
        }
      }
    }
  }),
  applyType: thisType => ({
    schema: {
      type: 'object',
      properties: {
        mensagem: {
          type: 'string',
        },
        dados: {
          type: thisType,
        },
        timestamp: {
          type: 'string',
          format: 'date-time'
        }
      }
    }
  })
}