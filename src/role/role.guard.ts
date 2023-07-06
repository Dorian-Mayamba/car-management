import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(@Inject(JwtService) private jwtService:JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    var request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if(!token){
      throw new UnauthorizedException();
    }else{
      // const payload = this.jwtService.verify(token);
      if(!request.user){
        throw new UnauthorizedException('not authenticated');
      }
      const role:string = request?.user?.roleType;
      console.log(role);
      if(role === 'admin'){
        return true;
      }
    }
    return false;
  }

  private extractTokenFromHeader = (request:any):string | undefined=>{
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined; 
  }
}
