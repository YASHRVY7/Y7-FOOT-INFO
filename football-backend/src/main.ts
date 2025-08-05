import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AllExceptionFilter } from './filters/all-exceptions.filter';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for all origins in development
  const corsOptions = {
    origin: [
      'http://localhost:4200',
      'https://whimsical-kangaroo-b5d5d3.netlify.app',
      'https://689062671d9c620496a9a70e--whimsical-kangaroo-b5d5d3.netlify.app',
      'https://y7-foot-info.onrender.com',
      'https://y7-foot-info.netlify.app'  // Add your production frontend domain here
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
    preflightContinue: false,
    optionsSuccessStatus: 204
  };
  
  app.enableCors(corsOptions);
  app.useGlobalFilters(new AllExceptionFilter());

  const port = parseInt(process.env.PORT || '') || 3000;
  await app.listen(port, '0.0.0.0');

  console.log(`Application is running on port ${port}`);
}

bootstrap();