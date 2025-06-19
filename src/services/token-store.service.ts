import { Injectable } from '@nestjs/common';

interface TokenSession {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  userInfo?: any;
}

@Injectable()
export class TokenStoreService {
  private readonly sessions = new Map<string, TokenSession>();

  set(sessionId: string, data: TokenSession) {
    this.sessions.set(sessionId, data);
  }

  get(sessionId: string): TokenSession | undefined {
    return this.sessions.get(sessionId);
  }

  delete(sessionId: string): void {
    this.sessions.delete(sessionId);
  }
}