import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseMessageKey } from '../decorator/response.decorator';

export interface Response<T> {
  statusCode: number;
  message: string;
  result?: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const responseMessage =
      this.reflector.get<string>(ResponseMessageKey, context.getHandler()) ??
      '';
    return next.handle().pipe(
      map((data) => {
        if (data) {
          return {
            statusCode: context.switchToHttp().getResponse().statusCode,
            message: responseMessage,
            result: data.result || data,
          };
        } else {
          return {
            statusCode: context.switchToHttp().getResponse().statusCode,
            message: responseMessage,
          };
        }
      }),
    );
  }
}
