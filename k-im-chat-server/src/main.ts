import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Log4jsLogger } from '@nestx-log4js/core';
import configuration from '../config/configuration';
import { HttpExceptionFilter } from './filters/http-exception.filter';

const logger = new Logger('main.ts');

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  // 异常处理
  app.useGlobalFilters(new HttpExceptionFilter());

  // 使用全局验证管道中间件
  app.useGlobalPipes(new ValidationPipe());

  // 使用log4js日志
  app.useLogger(app.get(Log4jsLogger));

  // 允许跨域
  app.enableCors();

  await app.listen(configuration.port);
};
bootstrap().then(() => {
  logger.log(`Server started on http://localhost:${configuration.port}.`);
});
