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
    answerIndex: 3
}

var startQuestion = 0;

var test = [testQuestion1, testQuestion2, testQuestion3];



//get timer div
var mytimer = document.querySelector("#countdown-timer");
var timerValue = 10;
console.log(mytimer);
mytimer.innerHTML = timerValue;

var startScreen = document.querySelector(".startscreen");
var questionScreen = document.querySelector(".questionscreen");
var question = document.querySelector("#question");
var answers = document.querySelector("#answers");


var mybutton = document.querySelector(".startbutton");
mybutton.addEventListener("click",function(){
    alert("button clicked");
    startScreen.style.display = "none";
    questionScreen.style.display = "block";
    showQuestion(startQuestion);
});

answers.addEventListener("click",function(){
    alert("question answered");
    console.log("Test length: " + test.length);
    console.log("Question index: " + startQuestion);
    if ((startQuestion) < test.length)
    {
        showQuestion(startQuestion);
    }
    else{
        alert("Test Complete");
    }
     
});

function showQuestion(index){
    // Clear existing question
    console.log(index);
    question.innerHTML =  (index+1) + ". " + test[index].question;
    answers.innerHTML = test[index].answers;
    //increment to next question
    startQuestion++;


}

function startTestTimer(){
var startTimer = 
    setInterval(function(){
        if (timerValue >0){
            timerValue--;
            mytimer.innerHTML = timerValue;
        }
        else{
            clearInterval(startTimer);
            console.log("hide timer");
            //Either way works below to hide timer
            //mytimer.style.display = "none";
            mytimer.setAttribute("style","display:none");
        }

    },
    1000);
}

startTestTimer();

 