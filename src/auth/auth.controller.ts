/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Controller,
  Get,
  UseGuards,
  Res,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    return HttpStatus.OK;
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    this.redirectToApplication(req, res);
  }

  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  protectedResource() {
    return 'JWT is working!';
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: any, @Res() res): Promise<any> {
    this.redirectToApplication(req, res);
  }

  redirectToApplication(req, res) {
    const jwt: string = req.user.jwt;

    if (jwt) {
      res.redirect('http://localhost:4200/login/?jwt_token=' + jwt);
    } else {
      res.redirect('http://localhost:4200/login-error');
    }
  }
}
