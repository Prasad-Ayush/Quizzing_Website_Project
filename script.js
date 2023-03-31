const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCbLy4NWPeyil58BigKdyrFa_o9vjcc3bs",
    authDomain: "authentication-app-1210f.firebaseapp.com",
    databaseURL: "https://authentication-app-1210f-default-rtdb.firebaseio.com",
    projectId: "authentication-app-1210f",
    storageBucket: "authentication-app-1210f.appspot.com",
    messagingSenderId: "835606812450",
    appId: "1:835606812450:web:e241f4b0e5e03d7938f77b"
});

const db = firebaseApp.firestore();
const userId = localStorage.getItem("userId");
console.log(userId);
const questionsRef = db.collection("MCQS");
const query = questionsRef.where('userID', '==', userId); // <-- use your user id here
var mcq = [];
var totalque =0;
query.get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            mcq.push(doc.data());
        });
        //console.log(mcq);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    console.log(mcq);
    totalque = totalque + (mcq.length);
    console.log(totalque);

      
//const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const database = firebase.database();
//Start Section
let start = document.querySelector("#start");

//guide Section
let guide = document.querySelector("#guide");
let exit = document.querySelector("#exit");
let continueBtn = document.querySelector("#continue");

//Quiz Section
let quiz = document.querySelector("#quiz");
let time = document.querySelector("#time");

//question Section
let questionNo = document.querySelector(".questionNo");
let questionText = document.querySelector(".questionText");

//Multiple Choices Of Questions
let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");
let option4 = document.querySelector("#option4");

//correct and next Button
let next_question = document.querySelector("#next_question");

//Result Section
let result = document.querySelector("#result");
let points = document.querySelector("#points");
let quit = document.querySelector("#quit");
let startAgain = document.querySelector("#startAgain");
let quizReport = document.querySelector('#quizReport');

//Get All 'h4' From Quiz Section (MCQS)
let choice_que = document.querySelectorAll(".answer");
console.log(choice_que);



let index = 0;
let timer = 0;
let interval = 0;

//total points
let correct = 0;
// let totalque= mcq.length;
// console.log(mcq.length);


//store Answer Value
let UserAns = undefined;

//what happen when 'Start' Button Will Click
start.addEventListener("click", () => {
    start.style.display = "none";
    guide.style.display = "block";
});

//what happen when 'Exit' Button Will Click
exit.addEventListener("click", () => {
    start.style.display = "block";
    guide.style.display = "none";
});


//Creating Timer For Quiz Timer Section

let countDown = () => {
    if (timer === 15) {
        clearInterval(interval);
        next_question.click();
    } else {
        timer++;
        time.innerText = timer;
    }
}

//setInterval(countDown,1000);
let loadData = () => {
    questionNo.innerText = index + 1 +". ";
    questionText.innerText = mcq[index].question;
    option1.innerText = mcq[index].option_1;
    option2.innerText = mcq[index].option_2;
    option3.innerText = mcq[index].option_3;
    option4.innerText = mcq[index].option_4;

    //    timer start
    timer = 0;
}


//what happen when 'Continue' Button Will Click
continueBtn.addEventListener("click", () => {
    quiz.style.display = "block";
    guide.style.display = "none";

    interval = setInterval(countDown, 1000);
    loadData();

    //    remove All Active Classes When Continue Button Will Click

    choice_que.forEach(removeActive => {
        removeActive.classList.remove("active");
    })

});

choice_que.forEach((choices, choiceNo) => {
    choices.addEventListener("click", () => {
        choices.classList.add("active");
        //check answer
        if (choiceNo === parseInt(mcq[index].correct_ans)) {
            correct++;
        } else {
            correct += 0;
        }
        //stop Counter
        //clearInterval(interval);

        //disable All Options When User Select An Option
        for (i = 0; i <= 3; i++) {
          choice_que[i].classList.add("disabled");
        }
    })
});

var para = "Correct Answers\n";
//what happen when 'Next' Button Will Click
next_question.addEventListener("click", () => {
    //    if index is less then MCQS.length
    if (index !== mcq.length - 1) {
        index++;
        choice_que.forEach(removeActive => {
            removeActive.classList.remove("active");
        })

        //question
        loadData();

        //result

        clearInterval(interval);
        interval = setInterval(countDown, 1000);
    } else {
        index = 0;


        //when Quiz Question Complete Display Result Section
        clearInterval(interval);
        quiz.style.display = "none";
        console.log(correct);
        let percent= ((correct/totalque)*100);
        console.log(percent);
        points.innerHTML = `You Got ${correct} Out Of ${totalque} , Your percentage is ${percent} %.`;

        let i = 0;
        for (i=0;i<(mcq.length); i ++){
            para = para + mcq[i].question +'\n'+ 'Correct Option :' + mcq[i].correct_ans +'\n' + mcq[i].option_1 +'\n' + mcq[i].option_2 +'\n' + mcq[i].option_3 +'\n' + mcq[i].option_4  +"\n";
        }
        report.innerText=para;
        result.style.display = "block";
        quizReport.style.display = "block";
    }
    for (i = 0; i <= 3; i++) {
        choice_que[i].classList.remove("disabled");
    }
})

//what happen when 'Quit' Button Will Click
quit.addEventListener("click", () => {
    start.style.display = "block";
    result.style.display = "none";
    quizReport.style.display="none";
});

//Start Again When 'Start Again' Button Will Clicked
startAgain.addEventListener("click", () => {
    guide.style.display = "block";
    result.style.display = "none";
    quizReport.style.display="none";

    

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
      
            // Generate random number 
            var j = Math.floor(Math.random() * (i + 1));
      
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
      
        return array;
    }
      
    mcq= shuffleArray(mcq)
});

