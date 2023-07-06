import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(JwtService) private jwtService: JwtService) { }
  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);
    if(!token){
      throw new UnauthorizedException("not authenticated");
    }else{
      try{
        const payload = await this.jwtService.verifyAsync(token);
        request['user'] = payload;
        return true;
      }catch(err){
        throw new UnauthorizedException();
      }
    }
  }

  private extractTokenFromRequest(request:Request):string|undefined{
    return request?.cookies['token'];
  }
}
