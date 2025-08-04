import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AllExceptionFilter } from './filters/all-exceptions.filter';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  // Enable CORS with specific settings
  app.enableCors({
    origin: [
      'https://whimsical-kangaroo-b5d5d3.netlify.app',
      'http://localhost:4200',
      'https://*.netlify.app'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'X-Auth-Token'
    ],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  });
  app.useGlobalFilters(new AllExceptionFilter());
  
  const port = parseInt(process.env.PORT || '') || 3000;
  await app.listen(port, '0.0.0.0');
  
  console.log(`Application is running on port ${port}`);
}
bootstrap();
