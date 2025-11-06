import { BadRequestException } from '@nestjs/common';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';

export function validateDto<T extends object>(
  DtoClass: ClassConstructor<T>,
  payload: unknown,
  errorMessage?: string,
): asserts payload is T {
  const instance = plainToInstance(DtoClass, payload);
  const errors = validateSync(instance, {
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  if (errors.length > 0) {
    const formatted = formatValidationErrors(errors).join('\n');
    throw new BadRequestException(errorMessage ?? `Validation failed:\n${formatted}`);
  }
}

export function formatValidationErrors(errors: ValidationError[], parent?: string): string[] {
  return errors.flatMap((error) => {
    const field = parent ? `${parent}.${error.property}` : error.property;
    const messages = Object.values(error.constraints ?? {}).map((msg) => ` - ${field}: ${msg}`);

    const children = error.children?.length ? formatValidationErrors(error.children, field) : [];

    return [...messages, ...children];
  });
}
