import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AllExceptionFilter } from './filters/all-exceptions.filter';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS with proper configuration
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://y7-foot-info.onrender.com',
      'https://y7-foot-info.onrender.com/leagues'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization'
  });

  // Set Content Security Policy headers
  app.use((req, res, next) => {
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; " +
      "connect-src 'self' https://y7-foot-info.onrender.com; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: https:;"
    );
    next();
  });

  app.useGlobalFilters(new AllExceptionFilter());
  
  const port = parseInt(process.env.PORT || '') || 3000;
  await app.listen(port, '0.0.0.0');
  
  console.log(`Application is running on port ${port}`);
}
bootstrap();
