import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;

  SwaggerModule.setup('doc', app, null, {
    swaggerOptions: { spec: parse(await readFile('doc/api.yaml', 'utf8')) },
  });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(port, (): void => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`Documentation is available at http://localhost:${port}/doc`);
  });
}

void bootstrap();
