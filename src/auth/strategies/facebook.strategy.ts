/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { AuthService, Provider } from '../auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.APP_ID,
      clientSecret: process.env.APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    try {
      const jwt: string = await this.authService.validateOAuthLogin(
        profile.id,
        Provider.FACEBOOK,
      );

      const user = {
        jwt,
      };

      done(null, user);
    } catch (err) {
      // console.log(err)
      done(err, false);
    }
  }
}
