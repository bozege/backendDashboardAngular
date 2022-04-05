import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { initializeFirebaseSDK } from "./db/firebaseClient";

var cors = require('cors')

async function bootstrap() {
  const logger = new Logger("VoiceFromAbove");

  try {

    await initializeFirebaseSDK();
    logger.log("Database initialized successfully!");

    
    const app = await NestFactory.create(AppModule);
    app.use(cors());
  
    await app.listen(3000);
  }
  catch(err) {
    console.log(err)
  }

}
bootstrap();
