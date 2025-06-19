import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';
import { assertQueryParams } from '../utils/validate-query';

interface OAuthInitiateParams {
  codeChallenge: string;
  codeChallengeMethod: string;
  state: string;
}

export const OAuthInitiate = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): OAuthInitiateParams => {
    const request = ctx.switchToHttp().getRequest();

    assertQueryParams(['code_challenge', 'code_challenge_method', 'state'], request.query);

    const { code_challenge, code_challenge_method, state } = request.query;

    if (
      typeof code_challenge !== 'string' ||
      typeof code_challenge_method !== 'string' ||
      typeof state !== 'string'
    ) {
      throw new BadRequestException('Invalid query parameter types in OAuth initiate request.');
    }

    return {
      codeChallenge: code_challenge,
      codeChallengeMethod: code_challenge_method,
      state,
    };
  },
);
