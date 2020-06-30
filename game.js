  const question = document.getElementById("question");
  const choices = Array.from(document.getElementsByClassName("choice-text"));
  const progressText = document.getElementById("progressText");
  const scoreText = document.getElementById("score");
  const progressBarFull = document.getElementById("progressBarFull");
  let currentQuestion = {};
  let acceptingAnswers = false;
  let score = 0;
  let questionCounter = 0;
  let availableQuesions = [];

  let questions = [{
          question: "When is my Birthday?",
          choice1: "jan, mar, may",
          choice2: "feb, april, june",
          choice3: "july, sep, nov",
          choice4: "aug, oct, dec",
          answer: 2
      },
      {
          question: "Which would i prefer?",
          choice1: "Hockey",
          choice2: "Baseball",
          choice3: "Cricket",
          choice4: "Football",
          answer: 3
      },
      {
          question: "What would make me most happy?",
          choice1: "More Sleep",
          choice2: "Traveling",
          choice3: "studying",
          choice4: "Sports",
          answer: 2
      },
      {
          question: "Which member of your friend group am I?",
          choice1: "Funny One",
          choice2: "The Leader",
          choice3: "Smart One",
          choice4: "The Good Friend",
          answer: 1
      },
      {
          question: "Which App do I use the most ?",
          choice1: "Facebook",
          choice2: "Instagram",
          choice3: "Pubg",
          choice4: "Snapchat",
          answer: 1
      }
  ];

  //CONSTANTS
  const CORRECT_BONUS = 10;
  const MAX_QUESTIONS = 5;

  startGame = () => {
      questionCounter = 0;
      score = 0;
      availableQuesions = [...questions];
      getNewQuestion();
  };

  getNewQuestion = () => {
      if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
          //go to the end page
          return window.location.assign("./end.html");
      }
      questionCounter++;
      progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
      //Update the progress bar
      progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

      const questionIndex = Math.floor(Math.random() * availableQuesions.length);
      currentQuestion = availableQuesions[questionIndex];
      question.innerText = currentQuestion.question;

      choices.forEach(choice => {
          const number = choice.dataset["number"];
          choice.innerText = currentQuestion["choice" + number];
      });

      availableQuesions.splice(questionIndex, 1);
      acceptingAnswers = true;
  };

  choices.forEach(choice => {
      choice.addEventListener("click", e => {
          if (!acceptingAnswers) return;

          acceptingAnswers = false;
          const selectedChoice = e.target;
          const selectedAnswer = selectedChoice.dataset["number"];

          const classToApply =
              selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

          if (classToApply === "correct") {
              incrementScore(CORRECT_BONUS);
          }

          selectedChoice.parentElement.classList.add(classToApply);

          setTimeout(() => {
              selectedChoice.parentElement.classList.remove(classToApply);
              getNewQuestion();
          }, 1000);
      });
  });

  incrementScore = num => {
      score += num;
      scoreText.innerText = score;
  };

  startGame();