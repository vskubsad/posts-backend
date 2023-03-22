import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const { ENV, PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (ENV === 'DEVELOPMENT') {
    app.enableCors(); //This will be enabled only for testing
  }
  await app.listen(PORT);
}
bootstrap();
