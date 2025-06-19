import { Injectable } from '@nestjs/common';

@Injectable()
export class CodeVerifierStoreService {
  private readonly store = new Map<string, string>();

  set(state: string, codeVerifier: string) {
    this.store.set(state, codeVerifier);
  }

  get(state: string): string | undefined {
    return this.store.get(state);
  }

  delete(state: string): void {
    this.store.delete(state);
  }
}