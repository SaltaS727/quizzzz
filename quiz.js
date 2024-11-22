(function () {
    let timer; // To store the interval ID
    let timeRemaining = 60; // Starting time in seconds
 
    // Functions
    function buildQuiz() {
       const output = [];
       myQuestions.forEach((currentQuestion, questionNumber) => {
          const answers = [];
          for (letter in currentQuestion.answers) {
             answers.push(
                `<label>
                   <input type="radio" name="question${questionNumber}" value="${letter}">
                   ${letter}: ${currentQuestion.answers[letter]}
                </label>`
             );
          }
          output.push(
             `<div class="slide">
                <div class="question">${currentQuestion.question}</div>
                <div class="answers">${answers.join("")}</div>
             </div>`
          );
       });
       quizContainer.innerHTML = output.join("");
    }
 
    function showResults() {
       clearInterval(timer); // Stop the timer
       const answerContainers = quizContainer.querySelectorAll(".answers");
       let numCorrect = 0;
 
       myQuestions.forEach((currentQuestion, questionNumber) => {
          const answerContainer = answerContainers[questionNumber];
          const selector = `input[name=question${questionNumber}]:checked`;
          const userAnswer = (answerContainer.querySelector(selector) || {}).value;
 
          if (userAnswer === currentQuestion.correctAnswer) {
             numCorrect++;
             answerContainers[questionNumber].style.color = "lightgreen";
          } else {
             answerContainers[questionNumber].style.color = "red";
          }
       });
 
       resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }
 
    function showSlide(n) {
       slides[currentSlide].classList.remove("active-slide");
       slides[n].classList.add("active-slide");
       currentSlide = n;
       previousButton.style.display = currentSlide === 0 ? "none" : "inline-block";
       nextButton.style.display = currentSlide === slides.length - 1 ? "none" : "inline-block";
       submitButton.style.display = currentSlide === slides.length - 1 ? "inline-block" : "none";
    }
 
    function showNextSlide() {
       showSlide(currentSlide + 1);
    }
 
    function showPreviousSlide() {
       showSlide(currentSlide - 1);
    }
 
    function resetQuiz() {
       clearInterval(timer); // Stop any ongoing timer
       timeRemaining = 60; // Reset the timer
       document.getElementById("timer").innerHTML = `Time Remaining: ${timeRemaining} seconds`;
       resultsContainer.innerHTML = ""; // Clear results
       const answerContainers = quizContainer.querySelectorAll(".answers");
       answerContainers.forEach((container) => (container.style.color = "")); // Reset colors
       buildQuiz(); // Rebuild the quiz
       showSlide(0); // Show the first slide
       startTimer(); // Restart the timer
    }
 
    function startTimer() {
       document.getElementById("timer").innerHTML = `Time Remaining: ${timeRemaining} seconds`;
       timer = setInterval(() => {
          timeRemaining--;
          document.getElementById("timer").innerHTML = `Time Remaining: ${timeRemaining} seconds`;
          if (timeRemaining <= 0) {
             clearInterval(timer);
             showResults();
             alert("Time's up! Quiz submitted.");
          }
       }, 1000);
    }
 
    // Variables
    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const submitButton = document.getElementById("submit");
    const resetButton = document.getElementById("reset");
    const myQuestions = [
       {
          question: "Who invented JavaScript?",
          answers: {
             a: "Douglas Crockford",
             b: "Sheryl Sandberg",
             c: "Brendan Eich",
          },
          correctAnswer: "c",
       },
       {
          question: "Which one of these is a JavaScript package manager?",
          answers: {
             a: "Node.js",
             b: "TypeScript",
             c: "npm",
          },
          correctAnswer: "c",
       },
       {
          question: "Which tool can you use to ensure code quality?",
          answers: {
             a: "Angular",
             b: "jQuery",
             c: "RequireJS",
             d: "ESLint",
          },
          correctAnswer: "d",
       },
    ];
 
    // Initialize Quiz
    buildQuiz();
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    showSlide(0);
    startTimer();
 
    // Event listeners
    submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
    resetButton.addEventListener("click", resetQuiz);
 })();
 