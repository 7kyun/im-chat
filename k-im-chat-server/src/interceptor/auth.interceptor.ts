import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const req = http.getRequest();
    let { authorization: token } = req.headers;
    if (token) {
      if (
        token.substring(0, 7) === 'Bearer ' ||
        token.substring(0, 7) === 'bearer '
      ) {
        token = token.substring(7);
      }
      const data = this.jwtService.decode(token) as AuthUser;

      req.headers.authUser = JSON.stringify(data);
    }
    return next.handle();
  }
}
