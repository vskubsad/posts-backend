import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const { ENV, PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // if (ENV === 'DEVELOPMENT') {
  // app.enableCors({
  //   allowedHeaders: [
  //     'Access-Control-Allow-Origin',
  //     'Access-Control-Allow-Credentials',
  //     'Access-Control-Allow-Headers',
  //   ],
  //   preflightContinue: true,
  //   methods: ['Get', 'Post', 'Delete', 'Patch', 'Put'],
  //   origin: '*',
  //   credentials: true,
  // }); //This will be enabled only for testing
  // }
  await app.listen(PORT);
}
bootstrap();
