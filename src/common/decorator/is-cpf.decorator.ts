import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsCPF(validationOptions?: ValidationOptions) {
  if (typeof validationOptions == 'undefined') {
    validationOptions = {
      message: 'CPF deve ser válido.',
    }
  }
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsCPF',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false
          }
          return CPF(value);
        },
      },
    });
  };
}

export function CPF(cpf: string) {
  const strCPF = cpf.replace(/[\.-]/g, '')
  let sum: number;
  let remainder: number;
  sum = 0
  if (_isDigitsEqual(strCPF))
    return false
  for (let i = 1; i <= 9; i++)
    sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
  remainder = (sum * 10) % 11
  if ((remainder == 10) || (remainder == 11))
    remainder = 0
  if (remainder != parseInt(strCPF.substring(9, 10)))
    return false
  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
  remainder = (sum * 10) % 11
  if ((remainder == 10) || (remainder == 11))
    remainder = 0
  if (remainder != parseInt(strCPF.substring(10, 11)))
    return false
  return true
}

function _isDigitsEqual(str: string) {
  let lastDigit = '';
  for (let i = 0; i < str.length; i++) {
    if (lastDigit == '') {
      lastDigit = str[i]
    }
    if (str[i] != lastDigit) {
      return false
    }
    lastDigit = str[i]
  }
  return true
}