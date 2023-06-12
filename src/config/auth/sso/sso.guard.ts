import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  BadGatewayException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import axios from 'axios';

@Injectable()
export class AuthSSOGuard extends AuthGuard('sso') implements CanActivate {
  private checkTokenEndpoint: string;

  constructor(private configService: ConfigService) {
    super();

    this.checkTokenEndpoint = this.configService.get(
      'SSO_CHECK_TOKEN_ENDPOINT',
    );
    axios.defaults.baseURL = this.configService.get('SSO_URL');

    console.log(this.checkTokenEndpoint, axios.defaults.baseURL);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isValidRequest = await this.validateRequest(request);

    if (!isValidRequest) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }

  async validateRequest(request: Request): Promise<boolean> {
    const authorization = request.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException();
    }

    let userInfo;
    try {
      userInfo = await axios.get(this.checkTokenEndpoint, {
        headers: { Authorization: authorization },
      });
    } catch {}

    if (userInfo?.status == HttpStatus.BAD_GATEWAY) {
      throw new BadGatewayException();
    }

    if (userInfo?.status !== HttpStatus.OK) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
