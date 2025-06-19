import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { assertQueryParams } from '../utils/validate-query';

export const OAuthCallback = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    assertQueryParams(['code', 'state'], request.query);
    return {
      code: request.query.code,
      state: request.query.state,
    };
  },
);