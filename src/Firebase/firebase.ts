// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKxk6O2GaHj86uTPlKOnwIDz9E62oxRx0",
  authDomain: "hdb-test-2.firebaseapp.com",
  projectId: "hdb-test-2",
  storageBucket: "hdb-test-2.appspot.com",
  messagingSenderId: "659707377217",
  appId: "1:659707377217:web:bac94e98b7d865513bf8c0",
  measurementId: "G-G3T7JVS3SY"
};
console.log(process.env)

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
