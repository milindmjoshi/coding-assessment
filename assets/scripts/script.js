// User query selectors to get doc elements
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
var mytimer = document.querySelector("#countdown-timer");


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
// test array is composed of test questions
var test = [testQuestion1, testQuestion2, testQuestion3];

// variable for keeping score
var score = 0;

// array for tracking high scores
var highscores = [];

// index for current test question
var currentQuestion = 0;

// timer for test in seconds
var timerValue = 10;

// variable for start timer function
var startTimer;

// Clears correct or incorrect message
function clearMessage(){
    console.log("Clear Message");
    correct.style.display = "none";
}

// shows correct or incorrect message
function showMessage(message){
    console.log("show message: " + message);
    correct.innerHTML = message;
    correct.style.display = "block";
}

// shows final score scre
function showFinalScore(){
    testcomplete.style.display = "block";
    questionScreen.style.display = "none";
    startScreen.style.display = "none";
    finalscore.innerHTML = "Your final score is " + score;

}

// Show high scores screen
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

// show start screen
function showStartScreen(){
    questionScreen.style.display = "none";
    startScreen.style.display = "block";
    testcomplete.style.display = "none";
    highscoresScreen.style.display = "none";
    //reset currentQuestion and score when start screen is displayed
    currentQuestion = 0;
    score = 0;
}

// Show high scores screen when link is clicked for high scores
highScoresLink.addEventListener("click",function(){
    showHighScores();
});

// start test when start button is clicked
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

// Save initials and score into highscores array when submit button is clicked
submitbutton.addEventListener("click",function(){
    console.log("submit button clicked");
    console.log(userinitial.value)
    // Don't do anything if nothing entered
    if (userinitial.value == "" || userinitial.value.trim() == ""){
        return;
    }
    highscores.push(userinitial.value.toUpperCase() + " - " + score);
    userinitial.value = "";
    showHighScores();
});

// Go back to start screen when back button is clicked
backbutton.addEventListener("click",function(){
    console.log("back button clicked");
    showStartScreen();
});

// Clear high scores array when clear button is clicked
clearbutton.addEventListener("click",function(){
    console.log("clear button clicked");
    highscores = [];
    showHighScores();
});


 

/* call back functino when question answer is selected */
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
// Add callback function for all answer clicks
answer1.addEventListener("click",answered);
answer2.addEventListener("click",answered);
answer3.addEventListener("click",answered);
answer4.addEventListener("click",answered);

// show question with specified index, if last question then show final score
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
        stopTimer();
        showFinalScore();

    }
     

}


// function to stop timer and hide
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

// function to start test timer, when timer value is 0 the timer is stopped and final 
// score is shown
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
 