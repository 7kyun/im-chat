import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import config from '../config/configuration';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 使用全局验证管道中间件
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(config.port);
}
bootstrap();
