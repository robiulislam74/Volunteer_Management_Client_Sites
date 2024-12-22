// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5gqkFkD_cHtoK3zhTCJ7eewjD9Z5SKDc",
  authDomain: "coffees-crud-task.firebaseapp.com",
  projectId: "coffees-crud-task",
  storageBucket: "coffees-crud-task.firebasestorage.app",
  messagingSenderId: "618491895702",
  appId: "1:618491895702:web:ffa4bb9e451999ad1f47b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth