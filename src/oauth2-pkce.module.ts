import { Module } from '@nestjs/common';
import { OAuthController } from './controllers/oauth.controller';
import { TokenStoreService } from './services/token-store.service';
import { CodeVerifierStoreService } from './services/code-verifier-store.service';
import { StateGuard } from './guards/state.guard';

@Module({
  controllers: [OAuthController],
  providers: [TokenStoreService, CodeVerifierStoreService, StateGuard],
  exports: [TokenStoreService, CodeVerifierStoreService],
})
export class Oauth2PKCEModule {}