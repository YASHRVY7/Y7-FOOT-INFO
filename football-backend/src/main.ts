import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AllExceptionFilter } from './filters/all-exceptions.filter';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  
  // Set Content Security Policy headers first
  app.use((req, res, next) => {
    res.header('Content-Security-Policy', "default-src 'self'; connect-src 'self' https://y7-foot-info.onrender.com;");
    next();
  });

  // Then enable CORS
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://y7-foot-info.onrender.com'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization'
  });

  app.useGlobalFilters(new AllExceptionFilter());
  
  const port = parseInt(process.env.PORT || '') || 3000;
  await app.listen(port, '0.0.0.0');
  
  console.log(`Application is running on port ${port}`);
}
bootstrap();
