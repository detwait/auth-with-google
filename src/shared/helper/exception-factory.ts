import { ValidationError } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function mapErrors(errors: ValidationError[], parentProperty: string = ''): any {
  return errors.flatMap((error: ValidationError) => {
    if (error?.children && error?.children.length > 0) {
      return mapErrors(error.children, error.property).flat();
    }
    return {
      property: parentProperty ? `${parentProperty}.${error.property}` : error.property,
      message: Object.values(error.constraints)[0],
    };
  });
}

export function exceptionFactory(validationErrors: ValidationError[] = []): any {
  const errors: any[] = mapErrors(validationErrors);
  return new HttpErrorByCode[400](errors);
}
