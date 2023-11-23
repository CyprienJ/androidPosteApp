import { NestFactory } from '@nestjs/core';
import { OfficeModule } from './office.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(OfficeModule);
  app.useGlobalPipes(new ValidationPipe());
  console.log(`Starting server on port ${process.env.PORT ?? 3000}`)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
