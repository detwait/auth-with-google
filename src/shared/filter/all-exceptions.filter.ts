import { ArgumentsHost, Catch, HttpException, HttpStatus, Inject, LoggerService } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { BaseExceptionFilter } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) {
    super();
  }

  private extractExceptionMessage(exception: any): any {
    let message: any = exception?.response?.data?.message || exception?.response?.message || exception?.message?.error || exception.message;

    if (exception?.response?.data?.details) {
      message += ` ${JSON.stringify(exception?.response?.data?.details)}`;
    }

    return message;
  }

  catch(exception: any, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const request: any = ctx.getRequest();
    const response: any = ctx.getResponse();
    const status: number = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message: any = this.extractExceptionMessage(exception);
    const exceptionCode: string = exception.response?.exceptionCode || 'ERROR';

    if (exception?.status !== HttpStatus.BAD_REQUEST) {
      const errorData: Record<string, any> = {
        message,
        status: exception?.status,
        url: request.url,
        query: request.query,
        body: request.body,
        details: exception.details,
        stack: exception.stack,
        exception,
      };

      if (exception.status < HttpStatus.INTERNAL_SERVER_ERROR) {
        this.logger.debug({ ...errorData });
      } else {
        this.logger.error({ ...errorData });
      }
    }

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
        exceptionCode,
      });
  }
}
