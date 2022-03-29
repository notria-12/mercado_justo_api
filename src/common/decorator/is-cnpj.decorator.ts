import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsCNPJ(validationOptions?: ValidationOptions) {
  if(typeof validationOptions == 'undefined'){
    validationOptions = {
      message: 'CNPJ deve ser válido.',
    }
  }
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsCNPJ',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if(typeof value !== 'string'){
            return false
          }
          return CNPJ(value);
        },
      },
    });
  };
}

export function CNPJ(cnpj: string) {
  if (cnpj.length < 18) {
    return false
  }

  const firstStepMultiplication = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const secondStepMultiplication = [6, ...firstStepMultiplication]
  const lastTwoDigits = cnpj.replace(/(\.|\/|-)/g, '').slice(-2)
  const stripedCNPJArr = cnpj.replace(/(\.|\/|-)/g, '').slice(0, -2).split('')
  let firstDigit = _calcCPNJDigit(firstStepMultiplication, stripedCNPJArr)
  let secondDigit = _calcCPNJDigit(secondStepMultiplication, [...stripedCNPJArr, firstDigit])

  if (lastTwoDigits[0] == firstDigit.toString() && lastTwoDigits[1] == secondDigit.toString()) {
    return true
  } else {
    return false
  }
}

function _calcCPNJDigit(stepMultiplicationArr, stripedCNPJArr) {
  const magicNumber = 11;
  let result = 0

  for (let i = 0; i < stepMultiplicationArr.length; i++) {
    result += stepMultiplicationArr[i] * stripedCNPJArr[i]
  }

  const moduleFirstStep = result % magicNumber
  if (moduleFirstStep > 2) {
    return magicNumber - moduleFirstStep
  } else {
    return 0
  }
}