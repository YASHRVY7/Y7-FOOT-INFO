import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AllExceptionFilter } from './filters/all-exceptions.filter';
import * as helmet from 'helmet';

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
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With',
    preflightContinue: false,
    optionsSuccessStatus: 204
  });

  // Apply helmet with custom CSP configuration
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          connectSrc: [
            "'self'",
            'https://y7-foot-info.onrender.com',
            'https://y7-foot-info.onrender.com/leagues',
            'https://api.football-data.org',
          ],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'https:'],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
        },
      },
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );

  app.useGlobalFilters(new AllExceptionFilter());
  
  const port = parseInt(process.env.PORT || '') || 3000;
  await app.listen(port, '0.0.0.0');
  
  console.log(`Application is running on port ${port}`);
}
bootstrap();
