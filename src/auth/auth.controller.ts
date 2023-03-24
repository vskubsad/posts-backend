/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Get, UseGuards, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    // handles the Google OAuth2 callback
    const jwt: string = req.user.jwt;
    if (jwt) {
      // res.setHeader('Access-Control-Allow-Origin', '*');
      // res.setHeader('Access-Control-Allow-Credentials', 'true');
      // res.setHeader('Access-Control-Max-Age', '1800');
      // res.setHeader('Access-Control-Allow-Headers', 'content-type');
      // res.setHeader(
      //   'Access-Control-Allow-Methods',
      //   'PUT, POST, GET, DELETE, PATCH, OPTIONS',
      // );
      // res.setHeader('Content-Type', 'application/json;charset=utf-8');
      res.redirect('http://localhost:4200/login/?jwt_token=' + jwt);
    } else {
      res.redirect('http://localhost:4200/login/failure');
    }
  }

  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  protectedResource() {
    return 'JWT is working!';
  }
}
