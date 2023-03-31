firebaseApp.firestore().settings({ experimentalForceLongPolling: true }); 
const db = firebaseApp.firestore();

const submitForm = document.querySelector('#questionForm');
let submitBtn = document.querySelector('#questionSubmit');
var userUid;

submitForm.addEventListener('submit', (e) => {
    e.preventDefault();
})

submitBtn.addEventListener("click", (e) => {
    e.preventDefault()

    let que = getElementVal("q1");
    userUid = auth.currentUser.uid;
    let o1 = getElementVal("o1");
    let o2 = getElementVal("o2");
    let o3 = getElementVal("o3");
    let o4 = getElementVal("o4");
    let correctAns = getElementVal("correctAns");

    saveMessages(userUid ,que, o1, o2, o3, o4, correctAns);


});

const saveMessages = (userUid ,que, o1, o2, o3, o4, correctAns) => {
    db.collection('MCQS').add({
        userID: userUid,
        question: que,
        option_1: o1,
        option_2: o2,
        option_3: o3,
        option_4: o4,
        correct_ans: correctAns
    })
}

const getElementVal = (id) => {
    return document.getElementById(id).value;
}



// For reading from database
// db.collection('MCQS').get().then((querySnapshot) => {
//     const data = [];
//     querySnapshot.forEach(doc =>  {
//         // doc.data() is never undefined for query doc snapshots
//         console.log('????????', doc.data())
//     });
//     setChannels(data);
// })



// db.collection("MCQS")
// //.where("userID","=",userUid)
// .get()
// .then(snap => {
//     snap.forEach(doc => {
//         console.log(doc.data());
//         console.log(doc.id);
//     });
// });


// db.collection("MCQS").get().then((querySnapshot) => {
//     const mcq = [];
//     querySnapshot.forEach(doc => {
//         mcq.push(doc.data());
//         console.log(mcq);
//     });

//     });
//     //   .then((snapshot) => { 


// const booksRef = db.collection("MCQS ");

// booksRef
//   .get()
//   .then((snapshot) => {
//     const data = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     console.log("All data in 'books' collection", data); 
//     // [ { id: 'glMeZvPpTN1Ah31sKcnj', title: 'The Great Gatsby' } ]
//   });

//var userUid = auth.currentUser.uid;
