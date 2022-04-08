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

    async addQuestion(question: string, options: Array<string>, question_skill: string) {

        try {
            if (!this.db) {
                this.db = await this.getFireStore();
            }
            this.db = await this.getFireStore();
            let statusCode = 200; // OK
        

            
            
            const myquestion = { question, options, question_skill }
            const response = await this.db.collection("Questions").add(myquestion)
            statusCode = 201 // Done
        
            return {
                statusCode,
                msg: "Question added to database successfully!",
                questionId: response.id
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

    async getQuestions() {
        
        try {
            if (!this.db) {
                this.db = await this.getFireStore();
            }
            this.db = await this.getFireStore();
            let statusCode = 200; // OK

            const questionData = [];
            const querySnapshot = await this.db.collection("Questions").get();
            querySnapshot.forEach((doc) => {
                questionData.push({
                    question: doc.data().question,
                    options: doc.data().options,
                    question_skill: doc.data().question_skill,
                    question_id: doc.id,
                })
                console.log({
                    question: doc.data().question,
                    options: doc.data().options,
                    question_skill: doc.data().question_skill,
                    question_id: doc.id,
                });
            })

            statusCode = 201;
            
            return {
                statusCode,
                msg: "Questions fetched from database successfully!",
                questions: questionData
            }
        
        } catch (error) {
            const newError = error.code.split("/")[1];
            console.log("Error occurred god knows why");
            let statusCode = 400;

            return {
                statusCode,
                error: newError,
                olderror: error

                
            }
        }
    }




}