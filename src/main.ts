import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PORT } from './common/config';
import { stringify } from 'yaml';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
    .setTitle('The Home Library')
    .setDescription('Home Library basic REST API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  try {
    const yamlString = stringify(document, {});
    if (!existsSync('/doc')) {
      mkdirSync('/doc');
    }
    const outputPath = resolve(process.cwd(), 'doc/api.yaml');
    writeFileSync(outputPath, yamlString, { encoding: 'utf8', flag: 'w+' });
  } catch (e) {
    console.error(e);
  }

  await app.listen(PORT);
}
bootstrap();
