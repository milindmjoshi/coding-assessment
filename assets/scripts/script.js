//test questions
var testQuestion1 = {
    question: "What does JS stand for?",
    answers: ["Junior School","JavaScript","Java School","It doesn't stand for anything"],
    answerIndex: 1
}
var testQuestion2 = {
    question: "How do you declare a variable in JS",
    answers: ["var","variable","let","Both var and let"],
    answerIndex: 3
}
var testQuestion3 = {
    question: "Which method can be used to merge an Array to another Array?",
    answers: ["join","map","concat","flat"],
    answerIndex: 2
}

var score = 0;

var highscores = [];

// start current question at index 0
var currentQuestion = 0;

var test = [testQuestion1, testQuestion2, testQuestion3];



//get timer div
var mytimer = document.querySelector("#countdown-timer");
var timerValue = 10;
console.log(mytimer);
mytimer.innerHTML = timerValue;
mytimer.style.display = "none";

var startScreen = document.querySelector(".startscreen");
var questionScreen = document.querySelector(".questionscreen");
var question = document.querySelector("#question");
var answers = document.querySelector("#answers");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");
var correct = document.querySelector("#iscorrect");
var testcomplete = document.querySelector("#testcomplete");
var finalscore = document.querySelector("#finalscore");
var startbutton = document.querySelector(".startbutton");
var submitbutton = document.querySelector(".submitbutton");
var backbutton = document.querySelector(".backbutton");
var clearbutton = document.querySelector(".clearbutton");
var userinitial = document.querySelector("#userinitial");
var highscoresScreen = document.querySelector("#highscoresScreen");
var scores = document.querySelector("#scores");
var highScoresLink = document.querySelector(".highscores");
console.log("final score element: "+ finalscore);

function clearMessage(){
    console.log("Clear Message");
    correct.style.display = "none";
}

function showMessage(message){
    console.log("show message: " + message);
    correct.innerHTML = message;
    correct.style.display = "block";
}

function showFinalScore(){
    testcomplete.style.display = "block";
    questionScreen.style.display = "none";
    startScreen.style.display = "none";
    finalscore.innerHTML = "Your final score is " + score;

}

function showHighScores(){
    questionScreen.style.display = "none";
    startScreen.style.display = "none";
    testcomplete.style.display = "none";
    var scoreString = "";
    console.log(highscores);
    highscores.forEach(function(userscore){
        console.log(userscore);
        scoreString += "<p>" + userscore ;
    });
    console.log(scoreString);
    scores.innerHTML = scoreString;
    highscoresScreen.style.display = "block";
}

function showStartScreen(){
    questionScreen.style.display = "none";
    startScreen.style.display = "block";
    testcomplete.style.display = "none";
    highscoresScreen.style.display = "none";
    //reset currentQuestion and score when start screen is displayed
    currentQuestion = 0;
    score = 0;
}

highScoresLink.addEventListener("click",function(){
    showHighScores();
});

startbutton.addEventListener("click",function(){
    console.log("start button clicked");
    startScreen.style.display = "none";
    questionScreen.style.display = "block";
    showQuestion(currentQuestion);
    timerValue = 10;
    mytimer.style.display = "block";
    mytimer.innerHTML = timerValue;
    startTestTimer();
});

submitbutton.addEventListener("click",function(){
    console.log("submit button clicked");
    console.log(userinitial.value)
    highscores.push(userinitial.value + " - " + score);
    userinitial.value = "";
    showHighScores();
});

backbutton.addEventListener("click",function(){
    console.log("back button clicked");
    showStartScreen();
});

clearbutton.addEventListener("click",function(){
    console.log("clear button clicked");
    highscores = [];
    showHighScores();
});


 

/* Called when question answer is selected */
var answered = function (event){
    // alert("question answered");
    event.stopPropagation();
    console.log("question answered");
    var answerIndex = event.target.getAttribute("index");
    console.log("answer index: " + answerIndex);
    if (answerIndex == test[currentQuestion].answerIndex){
        console.log("Correct");
        correct.style.color = "green";
        score++;
        showMessage("Correct");
        
    }
    else{
        console.log("Incorrect");
        correct.style.color = "red";
        // reduce time by 3 seconds on incorrect answer
        timerValue -= 3;
       showMessage("Incorrect");
        
    }
    setTimeout(clearMessage,2000); //clear message after 2 seconds
    // show next question
    showQuestion(++currentQuestion);

}
answer1.addEventListener("click",answered);
answer2.addEventListener("click",answered);
answer3.addEventListener("click",answered);
answer4.addEventListener("click",answered);

function showQuestion(index){
    console.log("show question index " + index);
    if (index < test.length){
        question.innerHTML =  (index+1) + ". " + test[index].question;
        answer1.innerHTML = test[index].answers[0];
        answer2.innerHTML = test[index].answers[1];
        answer3.innerHTML = test[index].answers[2];
        answer4.innerHTML = test[index].answers[3];
    }
    else{
        // At end of test. Show final score
        showFinalScore();

    }
     

}

var startTimer;

function stopTimer(){
    console.log("stop timer: " + startTimer);
    if (startTimer != undefined){
        clearInterval(startTimer);
        console.log("hide timer");
        //Either way works below to hide timer
        //mytimer.style.display = "none";
        mytimer.setAttribute("style","display:none");
    }
}

function startTestTimer(){
     startTimer = setInterval(function(){
        if (timerValue >0){
            timerValue--;
            mytimer.innerHTML = timerValue;
        }
        else{
            stopTimer();
            showFinalScore();
        }

    },
    1000);
}
 