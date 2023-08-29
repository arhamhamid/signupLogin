import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js"; // Import getDatabase

// Firebase configuration
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
const database = getDatabase();
const auth = getAuth(app);

document.getElementById('signupbtn').addEventListener('click', function() {
    const email = document.getElementById('signupemail').value;
    const pass1 = document.getElementById('signuppass1').value;
    const pass2 = document.getElementById('signuppass2').value;

    if (pass1 == pass2) {
        console.log("pass is sem");
        createUserWithEmailAndPassword(auth, email, pass1)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User created:", user);
                alert('User Created.')
                window.location.href = 'signin.html';

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Error creating user:", errorCode);
                if(error.code==='auth/invalid-email'){
                    alert('invalid Email')
                }
                else if(error.code==='auth/weak-password'){
                    alert('Weak Password')
                }
                else if(error.code==='auth/weak-password'){
                    alert('email already in use')
                }
                else if(error.code=='auth/email-already-in-use'){
                    alert('Email already in use.')
                }
            });
    }
});
