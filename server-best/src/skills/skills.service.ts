const admin = require("../db/firebaseAdmin")

import { Injectable, Logger } from '@nestjs/common';





@Injectable()
export class SkillsService {
    db: any
    logger: any
    userRef: any
    
    

    constructor() {
        this.logger = new Logger("SkillsService");
        //this.db = this.getFireStore();

    }


    async getFireStore() {
        try {
            const firestore = await admin.firestore()
            this.logger.log("Firestore instance is occured!")
            return firestore;
        } catch (error) {
            console.log(error)
        }
    }

    






}