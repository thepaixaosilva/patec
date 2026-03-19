import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

interface Violation {
    field: string;
    message: string;
}

interface HttpExceptionResponse {
    message: string | string[];
    violations?: Violation[];
    statusCode?: number;
}

interface RequestWithUser extends Request {
    user?: {
        id: string;
    };
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger('HttpExceptionFilter');

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<RequestWithUser>();
        const isProduction = process.env.NODE_ENV === 'production';
        const requestId = randomUUID();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'An error occurred';
        let errors: Array<{ field: string; message: string }> = [];

        try {
            if (exception instanceof HttpException) {
                status = exception.getStatus();
                const exceptionResponse =
                    exception.getResponse() as HttpExceptionResponse;

                if (isProduction) {
                    if (status === HttpStatus.CONFLICT) {
                        message = 'Validation error';
                        errors =
                            exceptionResponse.violations?.map((v) => ({
                                field: v.field,
                                message: 'Invalid value',
                            })) || [];
                    } else {
                        message = 'An error occurred';
                    }
                } else {
                    message = Array.isArray(exceptionResponse.message)
                        ? exceptionResponse.message.join(', ')
                        : exceptionResponse.message || 'An error occurred';
                    errors = exceptionResponse.violations || [];
                }
            }

            let errorResponse: unknown = '';
            if (exception instanceof HttpException) {
                errorResponse = exception.getResponse();
            } else if (exception instanceof Error) {
                errorResponse = {
                    name: exception.name,
                    message: exception.message,
                    stack: isProduction ? undefined : exception.stack,
                };
            } else {
                errorResponse = exception;
            }

            this.logger.error({
                response: errorResponse,
                path: request.path,
                method: request.method,
                userId: request.user?.id,
                requestId,
            });

            response.status(status).json({
                statusCode: status,
                message,
                errors,
                requestId,
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            console.error(error);
            // Failsafe - never expose internal errors
            response.status(500).json({
                statusCode: 500,
                message: 'Internal server error',
                requestId,
            });
        }
    }
}