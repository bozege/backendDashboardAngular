const admin = require("../db/firebaseAdmin")

import { Injectable, Logger } from '@nestjs/common';





@Injectable()
export class SkillsService {
    db: any
    logger: any
    userRef: any
    
    

    constructor() {
        this.db = this.getFireStore();
        this.logger = new Logger("SkillsService");
        

    }


    async getFireStore() {
        try {
            const firestore = await admin.firestore()
            this.logger.log("Firestore instance is occured from skills.service!")
            return firestore;
        } catch (error) {
            console.log(error)
        }
    }

    async addSkill(skill_name: string, skill_detail: string, skill_test: Array<string>) {

        try {
            if (!this.db) {
                this.db = await this.getFireStore();
            }
            this.db = await this.getFireStore();
            let statusCode = 200; // OK
        

            
            
            const skill = { skill_name, skill_detail, skill_test }
            const response = await this.db.collection("Skills").add(skill)
            statusCode = 201 // Done
        
            return {
                statusCode,
                msg: "Skill added to database successfully!",
                skillId: response.id
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

    async getSkills() {
        
        try {
            if (!this.db) {
                this.db = await this.getFireStore();
            }
            this.db = await this.getFireStore();
            let statusCode = 200; // OK

            const skillData = [];
            const querySnapshot = await this.db.collection("Skills").get();
            querySnapshot.forEach((doc) => {
                skillData.push({
                    skill_name: doc.data().skill_name,
                    skill_detail: doc.data().skill_detail,
                    skill_test: doc.data().skill_test,
                    skill_id: doc.id,
                })
                console.log({
                    skill_name: doc.data().skill_name,
                    skill_detail: doc.data().skill_detail,
                    skill_test: doc.data().skill_test,
                    skill_id: doc.id,
                });
            })

            statusCode = 201;
            
            return {
                statusCode,
                msg: "Skills fetched from database successfully!",
                skills: skillData
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