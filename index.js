//Setting up firebase with our website

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCbLy4NWPeyil58BigKdyrFa_o9vjcc3bs",
    authDomain: "authentication-app-1210f.firebaseapp.com",
    databaseURL: "https://authentication-app-1210f-default-rtdb.firebaseio.com",
    projectId: "authentication-app-1210f",
    storageBucket: "authentication-app-1210f.appspot.com",
    messagingSenderId: "835606812450",
    appId: "1:835606812450:web:e241f4b0e5e03d7938f77b"
});
//const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const database = firebase.database();
var userUid ;

//Sign Up function
const signUp = () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmpass = document.getElementById('confirmpass').value;
    console.log(email, password);

    //Validate input fields
    if (validate_password(password) == false) {
        alert("Password must have atleast 6 characters")
        return
    }

    if (validate_field(email) == false || validate_field(confirmpass) == false) {
        alert("One or more fields is empty")
        return
    }

    function validate_password(password) {
        if (password.length < 6) {
            return false;
        } else {
            return true;
        }
    }

    function validate_field(field) {
        if (field == null) {
            return false;
        }

        if (field.length == 0) {
            return false;
        } else {
            return true;
        }
    }

    //Firebase code
    console.log("etdyfu")
    firebase.auth().createUserWithEmailAndPassword(email, password)

        .then((result) => {
            // Signed up 
            var user = auth.currentUser; //declared user variable
            //Adding to databse
            var database_ref = database.ref();

            //Creating user data
            var user_data = {
                email: email,
                name: name,
                last_login: Date.now()
            }
            database_ref.child('users/' + user.uid).set(user_data);
            console.log(result)

            const userUid = auth.currentUser.uid;
            localStorage.setItem("userId", userUid);
            console.log(userUid);

            window.location.href = "/questions.html";
        });
}

//Sign In Function
const signIn = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(email, password);

    //Validate fields
    if (validate_field(email) == false || validate_field(password) == false) {
        alert("One or more fields is empty")
        return
    }

    function validate_field(field) {
        if (field == null) {
            return false;
        }

        if (field.length == 0) {
            return false;
        } else {
            return true;
        }
    }
    // Firebase code
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            // Signed in
            //Adding to databse
            var database_ref = database.ref();

            //Creating user data
            var user_data = {
                last_login: Date.now()
            }
           const userUid = auth.currentUser.uid;
            localStorage.setItem("userId", userUid);
            console.log(userUid);
            console.log(result);

            window.location.href = "/questions.html";

        })

        .catch((error) => {
            console.log(error.code);
            console.log(error.message);
            alert(error.message);
            
        });
}