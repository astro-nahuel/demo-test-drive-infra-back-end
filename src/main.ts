import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { ServiceAccount } from "firebase-admin";
import getFirebaseParams from './config/firebase/firebase';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  app.enableCors();
  app.useGlobalPipes( //Validación de datos en las request
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('API boilerplate with Nest.js')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Firebase
  // Set the config options
  let adminConfig = getFirebaseParams(configService)
  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig)
  });

  await app.listen(3000);
}
bootstrap();
