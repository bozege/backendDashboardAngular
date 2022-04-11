const admin = require("../db/firebaseAdmin")

import { Injectable, Logger } from '@nestjs/common';





@Injectable()
export class TestsService {
    db: any
    logger: any
    //userRef: any
    
    

    constructor() {
        this.db = this.getFireStore();
        this.logger = new Logger("TestsService");
        

    }


    async getFireStore() {
        try {
            const firestore = await admin.firestore()
            this.logger.log("Firestore instance is occured from tests.service!")
            return firestore;
        } catch (error) {
            console.log(error)
        }
    }

    async addTest(test_name: string, test_detail: string) {

        try {
            if (!this.db) {
                this.db = await this.getFireStore();
            }
            this.db = await this.getFireStore();
            let statusCode = 200; // OK
        

            
            
            const test = { test_name, test_detail }
            const response = await this.db.collection("Tests").add(test)
            statusCode = 201 // Done
        
            return {
                statusCode,
                msg: "Test added to database successfully!",
                testId: response.id
            }
        } catch (error) {
            const newError = error.code.split("/")[1];
            console.log("Error occurred god knows why"); //Hehe
            let statusCode = 400;

            return {
                statusCode,
                error: newError
            }
        }

    }

    async getTests() {
        
        try {
            if (!this.db) {
                this.db = await this.getFireStore();
            }
            this.db = await this.getFireStore();
            let statusCode = 200; // OK

            const testData = [];
            const querySnapshot = await this.db.collection("Tests").get();
            querySnapshot.forEach((doc) => {
                testData.push({
                    test_name: doc.data().test_name,
                    test_detail: doc.data().test_detail,
                    test_id: doc.id,
                })
                console.log({
                    test_name: doc.data().test_name,
                    test_detail: doc.data().test_detail,
                    test_id: doc.id,
                });
            })

            statusCode = 201;
            
            return {
                statusCode,
                msg: "Tests fetched from database successfully!",
                tests: testData
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
    
    async deleteTest(test_id: string) {
        try {
            if (!this.db) {
                this.db = await this.getFireStore();
            }
            this.db = await this.getFireStore();
            let statusCode = 200; // OK
        

            
            
            const deleted = await this.db.collection("Tests").doc(test_id).get();
            const deletedData = []
            deletedData.push({
                test_name: deleted.data().test_name,
                test_detail: deleted.data().test_detail,
                test_id: deleted.id,
            })
            
            const response = await this.db.collection("Tests").doc(test_id).delete();
            statusCode = 201 // Done
        
            return {
                statusCode,
                msg: "Test deleted successfully!",
                testId: test_id,
                deletedData: deletedData
            }
        } catch (error) {
            const newError = error.code.split("/")[1];
            console.log("Error occurred god knows why"); //Hehe
            let statusCode = 400;

            return {
                statusCode,
                error: newError
            }
        }
    }
    

    






}