const admin = require("../db/firebaseAdmin")

import { Injectable, Logger } from '@nestjs/common';
import { collection, getDoc, QuerySnapshot, doc, deleteDoc } from "firebase/firestore";

@Injectable()
export class CandidatesService {
    db: any
    logger: any
    userRef: any
    
    

    constructor() {
        this.db = this.getFireStore();
        this.logger = new Logger("CandidatesService");
    }

    async getFireStore() {
        try {
            const firestore = await admin.firestore()
            this.logger.log("Firestore instance is occured from candidates.service!")
            return firestore;
        } catch (error) {
            console.log(error)
        }
    }

    async addCandidate(name: string, email: string) {

        try {
            if (!this.db) {
                this.db = await this.getFireStore();
            }
            this.db = await this.getFireStore();
            let statusCode = 200; // OK
        

            
            //Firestore adding candidate to db.
            const candidate = { name, email }
            const response = await this.db.collection("Candidates").add(candidate)
            statusCode = 201 // Done
        
            return {
                statusCode,
                msg: "Candidate added to database successfully!",
                candidateId: response.id
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

    async getCandidates() {
        
        try {
            if (!this.db) {
                this.db = await this.getFireStore();
            }
            this.db = await this.getFireStore();
            let statusCode = 200; // OK

            const candidateData = [];
            const querySnapshot = await this.db.collection("Candidates").get();
            querySnapshot.forEach((doc) => {
                candidateData.push({
                    name: doc.data().name,
                    email: doc.data().email,
                    candidate_id: doc.id,
                })
                console.log({
                    name: doc.data().name, 
                    email: doc.data().email,
                    candidate_id: doc.id
                });
            })

            statusCode = 201;
            
            return {
                statusCode,
                msg: "Candidates fetched from database successfully!",
                candidates: candidateData
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

    async deleteCandidate(candidate_id: string) {
        try {
            if (!this.db) {
                this.db = await this.getFireStore();
            }
            this.db = await this.getFireStore();
            let statusCode = 200; // OK
        

            
            const deleted = await this.db.collection("Candidates").doc(candidate_id).get();
            const deletedData = []
            deletedData.push({
                name: deleted.data().name,
                email: deleted.data().email,
                candidate_id: deleted.id,
            })
            
            const response = await this.db.collection("Candidates").doc(candidate_id).delete();
            statusCode = 201 // Done
        
            return {
                statusCode,
                msg: "Candidate deleted successfully!",
                candidateId: candidate_id,
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

    






