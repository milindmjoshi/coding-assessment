//get timer div
var mytimer = document.querySelector("#countdown-timer");
var timerValue = 10;
console.log(mytimer);
mytimer.innerHTML = timerValue;

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

 