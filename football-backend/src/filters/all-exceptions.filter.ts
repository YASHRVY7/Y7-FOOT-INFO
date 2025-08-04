import{
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    Logger,
}from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter{
     private readonly logger=new Logger(AllExceptionFilter.name);

     catch(exception:any,host:ArgumentsHost){
        const ctx=host.switchToHttp();
        const response=ctx.getResponse();
        const request=ctx.getRequest();

        const status=exception instanceof HttpException ? exception.getStatus():500;

        const message=exception instanceof HttpException ? exception.getResponse():exception.message;

        this.logger.error(`[${request.method}] ${request.url} ${status} ${message}`);

        response.status(status).json({
            statusCode:status,
            timestamp:new Date().toISOString(),
            path:request.url,
            message,
        });
     }
}

