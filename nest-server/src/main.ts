import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Simple CRUD API')
    .setDescription('CRUD Using NestJS and MySQL').
    setVersion('1.0')
    .addTag('CRUD').build();
  const document = SwaggerModule.createDocument(app, config); SwaggerModule.setup('api', app, document);
  app.enableCors(
    {
      origin: true,
      // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      // preflightContinue: false,
      // optionsSuccessStatus: 204,
      // credentials: true,
    },
  )
  await app.listen(process.env.PORT);
}
bootstrap();
