const questionElement = document.getElementById("question");
const options = document.querySelectorAll(".option");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");

let score = 0;
let currentQuestion = {};
let timeLeft = 30; 
let timerInterval;

function generateRandomQuestion() {
    
    clearInterval(timerInterval);
    timerElement.textContent = '';

    
    const operand1 = Math.floor(Math.random() * 10) + 1;
    const operand2 = Math.floor(Math.random() * 10) + 1;

   
    const correctAnswer = operand1 * operand2;

    
    const wrongAnswers = generateWrongAnswers(correctAnswer);

    
    const answers = [correctAnswer, ...wrongAnswers];
    shuffleArray(answers);

   
    questionElement.textContent = `What is ${operand1} x ${operand2}?`;
    currentQuestion = {
        question: `What is ${operand1} x ${operand2}?`,
        options: answers,
        correctAnswer: correctAnswer.toString(),
    };

    
    options.forEach((option, index) => {
        option.textContent = answers[index];
        option.addEventListener("click", () => checkAnswer(option.textContent));
    });

    
    timeLeft = 30; 
    startTimer();
}
function generateWrongAnswers(correctAnswer) {
    const wrongAnswers = [];
    while (wrongAnswers.length < 2) {
        const wrongAnswer = Math.floor(Math.random() * 100) + 1;
        if (!wrongAnswers.includes(wrongAnswer) && wrongAnswer !== correctAnswer) {
            wrongAnswers.push(wrongAnswer);
        }
    }
    return wrongAnswers;
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function checkAnswer(selectedOption) {
    clearInterval(timerInterval); 
    timerElement.textContent = ''; 

    if (selectedOption === currentQuestion.correctAnswer) {
        score++;
        scoreElement.textContent = score;
       
    } else {
        console.log("incorrect")
    }

    
    setTimeout(() => {
        generateRandomQuestion();
    }, 1000); 
}
function startQuiz() {
    score = 0;
    scoreElement.textContent = score;
    startButton.disabled = true;
    timeLeft = 30; 
    generateRandomQuestion();
}
function restartQuiz() {
    score = 0;
    scoreElement.textContent = score;
    startButton.disabled = false;
    questionElement.textContent = "Click 'Start' to begin the quiz.";
    options.forEach((option) => (option.textContent = ""));
  
    clearInterval(timerInterval);
    timerElement.textContent = '';
}


function startTimer() {
    timerInterval = setInterval(function () {
        timerElement.textContent = timeLeft;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timerInterval); 
            alert("Time's up!"); 
            checkAnswer("");
        }
    }, 1000);
}

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);