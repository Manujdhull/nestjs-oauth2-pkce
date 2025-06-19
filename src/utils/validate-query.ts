import { BadRequestException } from '@nestjs/common';

export function assertQueryParams(requiredParams: string[], query: Record<string, any>) {
  for (const key of requiredParams) {
    if (!query[key]) {
      throw new BadRequestException(`Missing required query parameter: ${key}`);
    }
  }
}