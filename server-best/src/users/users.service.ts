const admin = require("../db/firebaseAdmin")

import { Injectable, Logger } from '@nestjs/common';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";



@Injectable()
export class UsersService {
    db: any
    logger: any
    userRef: any
    
    

    constructor() {
        this.db = this.getFireStore()
        this.logger = new Logger("UsersService")

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

    async loginWithEmailPass(email, password) {
        
        
        if (!this.db) {
            this.db = await this.getFireStore();
        }

        let statusCode = 200;
        const auth = getAuth();

        let response = await signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const userToken = await user.getIdToken()
                this.logger.log("Logged in successfully!")

                localStorage.setItem('isLoggedin', 'true'); //added for frontend login function.

                return { statusCode, msg: "Logged in succesfully!", uid: user.uid, token: userToken }
            })
            .catch((err) => {
                console.log(err);
                //const newErr = err.code.split("/")[1];
                console.log("Error occurred god knows where: users.service.ts");

                // switch (newErr) {
                //     case "wrong-password":
                //         statusCode = 400;
                //         break;
                //     case "user-not-found":
                //         statusCode = 404;
                //         break;
                //     case "internal-error":
                //         statusCode = 406;
                //         break;
                //     case "missing-email":
                //         statusCode = 408;
                //         break;
                //     case "invalid-email":
                //         statusCode = 410;
                //         break;    
                //     default:
                //         break;
                // }
                return {
                    statusCode,
                //     error: newErr, 
                    
                }
            });
        return response

    }


    async createUserWithEmailPass(email, password) {

        
        try {
            if (!this.db) {
                this.db = await this.getFireStore();
            }
            this.db = await this.getFireStore();
            let statusCode = 200; // OK
        

            //Firebase Authentication Register
            const auth = getAuth()
            const userCred = await createUserWithEmailAndPassword(auth, email, password)
            let user = userCred.user
            this.logger.log("User is created!")
        
            //console.log(await user.getIdToken())
            const accToken = await user.getIdToken()

            //Firestore user register
            const data = { email, uid: user.uid }
            const response = await this.db.collection("Users").add(data)
            statusCode = 201 // Done
        
            return {
                statusCode,
                msg: "User is created to firestore and it is authenticated",
                token: accToken,
                //array : arr, // to see all of the data
                //user : user
            }
            
        } catch (error) {
            const newError = error.code.split("/")[1];
            console.log("Error occurred god knows where: users.service.ts"); //Hehe
            let statusCode = 400;

            switch (newError) {
                case "email-already-in-use":
                    statusCode = 400;
                    
                    break;

                case "internal-error":
                    statusCode = 406;
                    break;
            
                default:
                    break;
            }
            return {
                statusCode,
                error: newError
            }
        }
        
    }

    async resetPassword(email: string) {
        const auth = getAuth()
        let statusCode = 200;
        return sendPasswordResetEmail(auth, email)
            .then((res) => {
                console.log("Email link has been sent!")
                statusCode = 200;
                return {
                    statusCode,
                    msg: "Email link has been sent!"
                }
            }).catch(err => {
                const newErr = err.code.split("/")[1];
                console.log(newErr)
                switch (newErr) {
                    case "user-not-found":
                        statusCode = 404;
                        break;
                    case "too-many-requests":
                        statusCode = 429;
                        break;
                    default:
                        break;
                }
                return {
                    statusCode,
                    error: newErr
                }

            })
    }

}