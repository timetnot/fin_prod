import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { ConfigService } from '@nestjs/config';

// VerifyCallback тип из passport
import { VerifyCallback } from 'passport-oauth2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID') || '',
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET') || '',
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL') || 'http://localhost:3001/auth/github/callback',
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { username, emails, photos, id } = profile;
    const user = {
      provider: 'github',
      providerId: id.toString(),
      email: emails[0]?.value || `${username}@github.com`,
      name: username,
      picture: photos[0]?.value,
      accessToken,
      refreshToken,
    };
    done(null, user);
  }
}
