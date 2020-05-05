const questionText = document.querySelector(".question-text");
let questionIndex = 0;
const optionBox = document.querySelector(".option-box");
const currentQuestionNum = document.querySelector(".current-question-num");
const nextQuestionBtn = document.querySelector(".next-question-btn");
const correctAnswers = document.querySelector(".correct-answers");
const quizOverBox = document.querySelector(".quiz-over-box");
const quizBox = document.querySelector(".quiz-box");
const quizHomeBox = document.querySelector(".quiz-home-box");
const totalQuestions = document.querySelector(".total-questions");
const totalAttempt = document.querySelector(".total-attempt");
const totalCorrect = document.querySelector(".total-correct");
const totalWrong = document.querySelector(".total-wrong");
const percentage = document.querySelector(".percentage");
const startAgainBtn = document.querySelector(".start-again-quiz-btn");
const goToHomeBtn = document.querySelector(".go-to-home-btn");
const startQuizBtn = document.querySelector(".start-quiz-btn");
const remainingTime = document.querySelector(".remaining-time");
const timeUpText = document.querySelector(".time-up-text");
let attempt = 0;
let score = 0;
let number = 0;
let count = 0;
let myArray = [];
let interval;

myQuiz = [
  {
    question: "Which year was the premier league founded?",
    options: ["1990", "1991", "1992", "1993"],
    answer: "1992",
  },
  {
    question:
      "Real Madrid won the first  five European' Cups - but which club was the second to win Europe's elite competition?",
    options: ["Chelsea", "Benfica", "Barcelona", "Manchester United"],
    answer: "Benfica",
  },
  {
    question:
      " Who holds the record for most consecutive Premier League appearances (310)?",
    options: [
      "Brad Fridel",
      "Christiano Ronaldo",
      "Roberto Mancini",
      "Ronaldinho",
    ],
    answer: "Brad Fridel",
  },
  {
    question: "Which club won the 2017 UEFA Super Cup?",
    options: ["Real Madrid", "Man United", "Barcelona", "Borussia Dortmund"],
    answer: "Real Madrid",
  },
  {
    question:
      "Who was manager of Manchester City when they won their first Premier League title?",
    options: [
      "Pep Guadiola",
      "Roberto Mancini",
      "Manuel Pellegrini",
      "Brain Kidd",
    ],
    answer: "Roberto Mancini",
  },
  {
    question:
      "Which Dutch player was voted 'European Player of the Century' in 1999?",
    options: [
      "Clarence Seedorf",
      "Frank de Boer",
      "Phillip Cocu",
      "Johan Cruyff",
    ],
    answer: "Johan Cruyff",
  },
  {
    question: "Who scored the first Premier League hat-trick?",
    options: ["Wayne Rooney", "Eric Cantona", "Thiery Henry", "Frank Lampard"],
    answer: "Eric Cantona",
  },
  {
    question: "Which English referee officiated the 2010 World Cup final?",
    options: [
      "Howard Webb",
      "Jerome Garces",
      "Nicola Rizzoli",
      "Nestor Pitana",
    ],
    answer: "Howard Webb",
  },
  {
    question:
      "Wayne Rooney scored his Premier League first goal against which team?",
    options: ["Chelsea", "Liverpool", "Arsenal", "Everton"],
    answer: "Arsenal",
  },
  {
    question: "Who is the world's most expensive teenager?",
    options: ["Kylian Mbappe", "Jadon Sancho", "Joao Felix", "Anthony Martial"],
    answer: "Kylian Mbappe",
  },
  {
    question:
      "Which club ended a 10-year stint in the Premer League following relegation at the end of 2017-18 season?",
    options: ["West Ham", "Burnley", "Stoke City"],
    answer: "Stoke City",
  },
  {
    question:
      "Which team saw themselves eliminated from the 2018 World Cup due to fair play rules?",
    options: ["Senegal", "Ghana", "Ivory Coast"],
    answer: "Senegal",
  },
  {
    question: "Which club did Diego Maradona last play for in Europe?",
    options: ["Barcelona", "Sevilla", "Napoli"],
    answer: "Sevilla",
  },
  {
    question: "Who is the oldest manager in Premier League history?",
    options: [
      "Alex Ferguson",
      "Roy Hodgson",
      "Harry Redsknap",
      "Arsene Wenger",
    ],
    answer: "Roy Hodgson",
  },
];

function load() {
  number++;
  questionText.innerHTML = myQuiz[questionIndex].question;
  createOptions();
  scoreBoard();
  currentQuestionNum.innerHTML = number + " / " + 5;

  if (number == 6) {
    gameOver();
  }
}

function createOptions() {
  optionBox.innerHTML = "";
  let animationDelay = 0.2;
  for (let i = 0; i < myQuiz[questionIndex].options.length; i++) {
    const option = document.createElement("div");
    option.innerHTML = myQuiz[questionIndex].options[i];
    option.classList.add("option");
    option.id = i;
    option.style.animationDelay = animationDelay + "s";
    animationDelay = animationDelay + 0.2;
    option.setAttribute("onclick", "check(this)");
    optionBox.appendChild(option);
  }
}

function generateRandomQuestion() {
  const randomNumber = Math.floor(Math.random() * myQuiz.length);
  let hitDuplicate = 0;

  if (myArray.length == 0) {
    questionIndex = randomNumber;
  } else {
    for (let i = 0; i < myArray.length; i++) {
      if (randomNumber == myArray[i]) {
        hitDuplicate = 1;
      }
    }

    if (hitDuplicate == 1) {
      generateRandomQuestion();
      return;
    } else {
      questionIndex = randomNumber;
    }
  }
  myArray.push(randomNumber);
  load();
}

function check(opt) {
  if (opt.innerHTML == myQuiz[questionIndex].answer) {
    opt.classList.add("correct");
    const audio = document.createElement("audio");
    audio.src =
      "./img/Indoor-Very-Large-Size-Audience-Applause-Clapping-www.fesliyanstudios.com.mp3";
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 1000);
    score++;
    scoreBoard();
  } else {
    opt.classList.add("wrong");
    const audio = document.createElement("audio");
    audio.src = "./img/Oh-no-sound-effect.mp3";
    audio.play();
    for (let i = 0; i < optionBox.children.length; i++) {
      if (optionBox.children[i].innerHTML == myQuiz[questionIndex].answer) {
        optionBox.children[i].classList.add("show-correct");
      }
    }
  }
  attempt++;
  showNextQuestionBtn();
  stopTimer();
  disableOptions();
}

function disableOptions() {
  for (let i = 0; i < optionBox.children.length; i++) {
    optionBox.children[i].classList.add("already-answered");
  }
}

function showNextQuestionBtn() {
  nextQuestionBtn.classList.add("show");
}

function hideNextQuestionBtn() {
  nextQuestionBtn.classList.remove("show");
}

function scoreBoard() {
  correctAnswers.innerHTML = score;
}

nextQuestionBtn.addEventListener("click", nextQuestion);

function nextQuestion() {
  generateRandomQuestion();
  hideNextQuestionBtn();
  hideTimeUp();
  startTimer();
}

function quizResult() {
  if (score === 0) {
    document.querySelector(".gif").setAttribute("src", "./img/tenor (1).gif");
  }
  if (score !== 0 && score < 5) {
    document.querySelector(".gif").setAttribute("src", "./img/tenor.gif");
  }
  if (score === 5) {
    document
      .querySelector(".gif")
      .setAttribute(
        "src",
        "./img/c2c8349a34233a7276a94d1666939cd6_job-clipart-gif-find-share-on-giphy_442-302.gif"
      );
  }

  const n = 5;
  totalQuestions.innerHTML = n;
  totalAttempt.innerHTML = attempt;
  totalCorrect.innerHTML = score;
  totalWrong.innerHTML = attempt - score;
  const percent = (score / n) * 100;
  percentage.innerHTML = percent.toFixed(2) + "%";
}

function gameOver() {
  quizBox.classList.remove("show");
  quizOverBox.classList.add("show");
  quizResult();
}

startAgainBtn.addEventListener("click", () => {
  quizBox.classList.add("show");
  quizOverBox.classList.remove("show");
  resetQuiz();
  nextQuestion();
});

goToHomeBtn.addEventListener("click", () => {
  quizOverBox.classList.remove("show");
  quizHomeBox.classList.remove("hide");
  resetQuiz();
});

startQuizBtn.addEventListener("click", () => {
  quizHomeBox.classList.add("hide");
  quizBox.classList.add("show");
  nextQuestion();
});

function timeIsUp() {
  showTimeUp();
  for (let i = 0; i < optionBox.children.length; i++) {
    if (optionBox.children[i].innerHTML == myQuiz[questionIndex].answer) {
      optionBox.children[i].classList.add("show-correct");
    }
  }
  disableOptions();
  nextQuestionBtn.classList.add("show");
}

function startTimer() {
  let timeLimit = 15;
  remainingTime.innerHTML = timeLimit;
  remainingTime.classList.remove("less-time");
  interval = setInterval(() => {
    timeLimit--;

    if (timeLimit < 10) {
      timeLimit = "0" + timeLimit;
    }
    if (timeLimit < 6) {
      remainingTime.classList.add("less-time");
    }
    remainingTime.innerHTML = timeLimit;
    if (timeLimit == 0) {
      clearInterval(interval);
      timeIsUp();

      remainingTime.classList.remove("less-time");
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
}

function showTimeUp() {
  timeUpText.classList.add("show");
}

function hideTimeUp() {
  timeUpText.classList.remove("show");
}

function resetQuiz() {
  timeLimit = 15;
  attempt = 0;
  score = 0;
  number = 0;
  myArray = [];
}
