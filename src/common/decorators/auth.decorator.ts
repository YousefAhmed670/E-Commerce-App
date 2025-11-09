import { applyDecorators, SetMetadata } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard, RolesGuard } from '../guards';

export function Auth(...roles: string[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
  );
}
