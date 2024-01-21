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


//test question objects
var testQuestion1 = {
    question: "What does JS stand for?",
    answers: ["1. Junior School","2. JavaScript","3. Java School","4. It doesn't stand for anything"],
    answerIndex: 1
}
var testQuestion2 = {
    question: "How do you declare a variable in JS",
    answers: ["1. var","2. variable","3. let","4. Both var and let"],
    answerIndex: 3
}
var testQuestion3 = {
    question: "Which method can be used to merge an Array to another Array?",
    answers: ["1. join","2. map","3. concat","4. flat"],
    answerIndex: 2
}
var testQuestion4 = {
    question: "Which of the follow is not a Javascript arithmetic operator?",
    answers: ["1. +","2. *","3. ~","4. -"],
    answerIndex: 2
}
var testQuestion5 = {
    question: "Which of the following is not a JavaScript logical operator?",
    answers: ["1. &&","2. !","3. ||","4. --"],
    answerIndex: 3
}
var testQuestion6 = {
    question: "Which of the following is a model of how the browser represents a web page internally?",
    answers: ["1. FOL","2. DOM","3. SDOM","4. ISAM"],
    answerIndex: 1
}
var testQuestion7 = {
    question: "Which of the following is not a native JavaScript Object?",
    answers: ["1. Math","2. Array","3. Date","4. Integer"],
    answerIndex: 3
}
var testQuestion8 = {
    question: "Which of the following is not a primitive in JavaScript?",
    answers: ["1. float","2. string","3. number","4. boolean"],
    answerIndex: 0
}
var testQuestion9 = {
    question: "How do you declare a block scoped variable in JavaScript ",
    answers: ["1. let","2. var","3. variable","4. get"],
    answerIndex: 0
}
var testQuestion10 = {
    question: "Which object does console.log belong to in JavaScript?",
    answers: ["1. DOM","2. window","3. page","4. link"],
    answerIndex: 1
}

// test array is composed of test question objects
var test = [testQuestion1, testQuestion2, testQuestion3, testQuestion4,testQuestion5,testQuestion6,testQuestion7,testQuestion8,testQuestion9,testQuestion10];

// variable for keeping score
var score = 0;

// array for tracking high scores
var highscores = [];

// index for current test question
var currentQuestion = 0;

// timer for test in seconds
var timerValue = 60;

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
    correct.style.display = "block";
    correct.innerHTML = message;
   
}

// shows final score scre
function showFinalScore(){
    testcomplete.style.display = "block";
    questionScreen.style.display = "none";
    startScreen.style.display = "none";
    var message = "Your final score is " + score;
    if (score === 10){
        message += ". Great Job!"
    }
    else if (score <=3){
        message += ". You can do better than that. Study some more. "
    }
    finalscore.innerHTML = message;

}

// Show high scores screen
function showHighScores(){
    //stop timer if it is running, user could have clicked while in test
    stopTimer();
    questionScreen.style.display = "none";
    startScreen.style.display = "none";
    testcomplete.style.display = "none";
    var scoreString = "";
    console.log(highscores);
    highscores.forEach(function(userscore, index){
        console.log(userscore);
        scoreString += "<p>" + (index +1) + ". " + userscore ;
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
    mytimer.style.display = "block";
    //rest timer value to 60
    timerValue = 60;
    mytimer.innerHTML = "Timer: " + timerValue;
    startTestTimer();
});

// Save initials and score into highscores array when submit button is clicked
submitbutton.addEventListener("click",function(){
    console.log("submit button clicked");
    console.log(userinitial.value)
    // Don't do anything if nothing entered
    if (userinitial.value == "" || userinitial.value.trim() == ""){
        alert("Initials cannot be blank, please enter user initials. Max length is 10.");
        // move cursor back to beginning of input
        userinitial.setSelectionRange(0, 0);
        userinitial.focus();
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
        //set color to red on incorrect answer
        correct.style.color = "red";
        // reduce time by 5 seconds on incorrect answer
        timerValue -= 5;
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
            mytimer.innerHTML = "Timer: " + timerValue;
        }
        // stop timer when timer reaches zero and show final score
        else{
            stopTimer();
            showFinalScore();
        }

    },
    1000);
}
 