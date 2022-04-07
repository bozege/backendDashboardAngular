const admin = require("../db/firebaseAdmin")

import { Injectable, Logger } from '@nestjs/common';





@Injectable()
export class QuestionsService {
    db: any
    logger: any
    //userRef: any
    
    

    constructor() {
        this.db = this.getFireStore();
        this.logger = new Logger("QuestionsService");
        

    }


    async getFireStore() {
        try {
            const firestore = await admin.firestore()
            this.logger.log("Firestore instance is occured from questions.service!")
            return firestore;
        } catch (error) {
            console.log(error)
        }
    }

    async addQuestion(question: string, options: Array<string>, skill: string) {

        try {
            if (!this.db) {
                this.db = await this.getFireStore();
            }
            this.db = await this.getFireStore();
            let statusCode = 200; // OK
        

            
            
            const myquestion = { question, options, skill }
            const response = await this.db.collection("Questions").add(myquestion)
            statusCode = 201 // Done
        
            return {
                statusCode,
                msg: "Question added to database successfully!",
                QuestionId: response.id
            }
        } catch (error) {
            const newError = error.code.split("/")[1];
            console.log("Error occurred god knows why"); //Hehe
            let statusCode = 400;

            return {
                statusCode
            }
        }

    }




}