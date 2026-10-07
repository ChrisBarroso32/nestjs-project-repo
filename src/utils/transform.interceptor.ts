import { 
  CallHandler, 
  ExecutionContext, 
  Injectable, 
  NestInterceptor 
} from '@nestjs/common';
import { Response } from 'express'
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const reponse = context.switchToHttp().getResponse<Response>();
    const statusCode = reponse.statusCode ?? 200;

    return next.handle().pipe(
      map((data) => ({
        statusCode,
        message: 'Success',
        data,
      })),
    );
  }
}
