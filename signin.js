import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";

const config = {
    apiKey: "AIzaSyC9-uK5LoUDBrLrCtYXn35H14w5n6mI780",
    authDomain: "test-30323.firebaseapp.com",
    databaseURL: "https://test-30323-default-rtdb.firebaseio.com",
    projectId: "test-30323",
    storageBucket: "test-30323.appspot.com",
    messagingSenderId: "523076581955",
    appId: "1:523076581955:web:6f214a901141244ca832f6"
};

const app = initializeApp(config);
const auth = getAuth(app);
const database = getDatabase();

document.getElementById('signinbtn').addEventListener('click', function () {
    const email = document.getElementById('signinemail').value;
    const password = document.getElementById('signinpass').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in:", user);
            alert('User Signed in')
            localStorage.setItem("userUID", user.uid);
            window.location.href = 'index.html';

    })
    .catch((error) => {
        // console.error("Error signing in:", error);
        const errorCode = error.code;
        if(error.code=='auth/user-not-found'){
            alert('User not found.')
        }
        else if(error.code=='auth/invalid-email'){
            alert('Invalid Email.')
        }
        else if(error.code=='auth/wrong-password'){
            alert('Wrong password')
        }
        // console.log("Error code:", errorCode);
    });
});
