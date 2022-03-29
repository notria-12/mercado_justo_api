import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
const cep = require('cep-promise');

export function IsCEP(validationOptions?: ValidationOptions) {
  if (typeof validationOptions == 'undefined') {
    validationOptions = {
      message: 'CEP deve ser válido.',
    }
  }
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsCEP',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          return new Promise((resolve, reject) => {
            cep(value)
              .then(() => resolve(true))
              .catch(() => resolve(false))
          })
        },
      },
    });
  };
}