
const firebase = require("firebase/compat/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const initializeFirebaseSDK = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyB6SHqzxRCKcpYe8u32bE4T_xeZ3Zgdbew",
    authDomain: "dashboardangular-3192c.firebaseapp.com",
    projectId: "dashboardangular-3192c",
    storageBucket: "dashboardangular-3192c.appspot.com",
    messagingSenderId: "434004390925",
    appId: "1:434004390925:web:e9b5280b52800155cf1144"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
}
