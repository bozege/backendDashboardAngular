import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { initializeFirebaseSDK } from "./db/firebaseClient";

async function bootstrap() {
  const logger = new Logger("VoiceFromAbove");

  try {

    await initializeFirebaseSDK();
    logger.log("Database initialized successfully!");

    
    const app = await NestFactory.create(AppModule);
    
  
    await app.listen(3000);
  }
  catch(err) {
    console.log(err)
  }

}
bootstrap();
