import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getDatabase, ref, set, onValue, push, remove } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
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

const dataDisplay = document.getElementById("dataDisplay");
const uploadButton = document.getElementById("uploadButton");
const textInput = document.getElementById("textInput");


const signOutButton = document.getElementById("logoutbtn");

signOutButton.addEventListener("click", () => {
    // Sign out the user
    signOut(auth)
        .then(() => {
            // Redirect to sign-in page after signing out
            window.location.href = "signin.html";
        })
        .catch(error => {
            console.error("Error signing out:", error);
        });
});



onAuthStateChanged(auth, user => {
    if (user) {
        // User is signed in
        const userUID = user.uid;
        const userRef = ref(database, `users/${userUID}/data`);

        uploadButton.addEventListener("click", () => {
            const text = textInput.value;
            const newDataRef = push(userRef, { text });
            set(newDataRef, { text })
                .then(() => {
                    alert("Data uploaded successfully!");
                    textInput.value = "";
                })
                .catch(error => {
                    console.error("Error uploading data:", error);
                });
        });


        onValue(userRef, snapshot => {
            dataDisplay.innerHTML = ""; // Clear existing data
            
            // Create a new unordered list element
            const dataList = document.createElement("ul");
            dataList.className = "list-group"; // Add the Bootstrap class
            
            snapshot.forEach(childSnapshot => {
                const data = childSnapshot.val();
                const text = data.text;
        
                // Create a list item element
                const dataElement = document.createElement("li");
                dataElement.className = "list-group-item d-flex justify-content-between align-items-center ";
                dataElement.innerText = text;
        
                const deleteIcon = document.createElement("span");
                deleteIcon.innerHTML = " Delete";
                deleteIcon.style.color = "red";
                deleteIcon.style.cursor = "pointer";
                deleteIcon.addEventListener("click", () => {
                    remove(childSnapshot.ref)
                        .then(() => {
                            console.log("Item removed from Firebase");
                        })
                        .catch(error => {
                            console.error("Error removing item:", error);
                        });
                });
        
                const edit = document.createElement("span");
                edit.innerHTML = "Edit";
                edit.style.color = "rgb(117, 61, 6)";
                edit.style.marginLeft = "16px";
                edit.style.cursor = "pointer";
                edit.addEventListener("click", () => {
                    const newText = prompt("Edit the text:", text);
                    if (newText !== null) {
                        set(childSnapshot.ref, { text: newText })
                            .then(() => {
                                console.log("Item updated in Firebase");
                            })
                            .catch(error => {
                                console.error("Error updating item:", error);
                            });
                    }
                });
        
                const badge = document.createElement("span");
                badge.appendChild(edit);
        
                badge.appendChild(deleteIcon);
                dataElement.appendChild(badge);
        
                dataList.appendChild(dataElement);
            });
        
            dataDisplay.appendChild(dataList);
        });
    }
});

