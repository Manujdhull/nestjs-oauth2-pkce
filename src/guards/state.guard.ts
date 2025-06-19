import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class StateGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (!request.query.state) {
      throw new BadRequestException('Missing `state` in OAuth callback.');
    }
    // TODO: Optional - verify state exists in temporary store
    return true;
  }
}