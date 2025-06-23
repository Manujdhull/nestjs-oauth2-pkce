import { Controller, Get, Res, UseGuards, Query } from '@nestjs/common';
import { TokenStoreService } from '../services/token-store.service';
import { StateGuard } from '../guards/state.guard';
import axios from 'axios';
import { Response } from 'express';
import { OAuthInitiate } from '../decorators/oauth-initiate.decorator';
import { OAuthCallback } from '../decorators/oauth-callback.decorator';

@Controller('oauth')
export class OAuthController {
  constructor(private readonly tokenStore: TokenStoreService) {}

  @Get('authorize')
  public async authorize(
    @OAuthInitiate()
    pkceData: { codeChallenge: string; codeChallengeMethod: string; state: string },
    @Res() res: Response,
  ) {
    const clientId = process.env.OAUTH_CLIENT_ID;
    const redirectUri = process.env.OAUTH_REDIRECT_URI;
    const authUrlBase = process.env.OAUTH_AUTH_URL;

    if (!clientId || !redirectUri || !authUrlBase) {
      return res.status(500).send({ error: 'Missing OAuth environment configuration.' });
    }

    const scope = encodeURIComponent('openid email profile');
    const responseType = 'code';

    const authUrl = `${authUrlBase}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&code_challenge=${pkceData.codeChallenge}&code_challenge_method=${pkceData.codeChallengeMethod}&state=${pkceData.state}&scope=${scope}&access_type=offline&include_granted_scopes=true`;

    return res.redirect(authUrl);
  }

  @UseGuards(StateGuard)
  @Get('callback')
  public async callback(
    @OAuthCallback() callbackData: { code: string; state: string },
    @Query('code_verifier') codeVerifier: string,
    @Res() res: Response,
  ) {
    if (!codeVerifier) {
      return res.status(400).send({ error: 'Missing code_verifier from frontend.' });
    }

    const tokenUrl = process.env.OAUTH_TOKEN_URL;
    const redirectUri = process.env.OAUTH_REDIRECT_URI;
    const clientId = process.env.OAUTH_CLIENT_ID;

    if (!tokenUrl || !redirectUri || !clientId) {
      return res.status(500).send({ error: 'Missing OAuth environment configuration.' });
    }

    try {
      const tokenResponse = await axios.post(
        tokenUrl,
        new URLSearchParams({
          code: callbackData.code,
          grant_type: 'PKCE',
          redirect_uri: redirectUri,
          client_id: clientId,
          code_verifier: codeVerifier,
        }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );

      this.tokenStore.set(callbackData.state, tokenResponse.data);

      return res.send({ message: 'Token received and session stored.' });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('OAuth token exchange failed:', error.response?.data || error.message);
        return res.status(500).send({
          error: 'Token exchange failed.',
          details: error.response?.data || error.message,
        });
      } else {
        console.error('Unknown error during OAuth callback:', error);
        return res.status(500).send({
          error: 'Unknown error occurred during token exchange.',
        });
      }
    }
    
  }
}
