var startQuiz = document.getElementById("StartQuiz");
var timerDisplay = document.getElementById("safeTimerDisplay");
var currentSlide = 0;

function startTimer() {

  var refreshID = setInterval(function () { myTimer() }, 1000);
  var startingTime = 60;

  function myTimer() {
    if (startingTime == 0) {
      myStopFunction();
    }

    timerDisplay.innerHTML = '00:' + zeroPad(startingTime, 2);
    startingTime = startingTime - 1;

  };

  function myStopFunction() {
    clearInterval(refreshID);
  };

  function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  };


};

function hideIntro() {
  document.getElementById("startUp").hidden = true;
}

function run() {

  function buildQuiz() {

    var quizRawHTML = document.getElementById('quiz');

    var quizQuestions = [
      {
        question: "Is an Event part of DOM elements?",
        answers: {
          a: "False",
          b: "I have no clue?!",
          c: "True"
        },
        correctAnswer: "c"
      },
      {
        question: "What languages does a browser understand?",
        answers: {
          a: "HTML, CSS, Java",
          b: "CSS, Javascript, Bootstrap",
          c: "HTML, CSS, JavaScrip"
        },
        correctAnswer: "c"
      },
      {
        question: "What is DOM?",
        answers: {
          a: "Variable name",
          b: "a parent, child, and sibling nodes",
          c: "Domain",
          d: "Document Object Mode"
        },
        correctAnswer: "d"
      }
    ];

    var output = [];

    quizQuestions.forEach(
      (currentQuestion, questionNumber) => {

        var answers = [];

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
          <div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("<br>")} </div>
        </div>`
        );
      }
    );

     output.push(
      `<button type="button" id="previous">Previous Question</button>
     <button type="button" id="next">Next Question</button>
     <button type="button" id="submit">Submit</button>
    `
    )
 
    quizRawHTML.innerHTML = output.join('');

  };

  function showResults() {
    document.getElementById('quiz-container').hidden = true;

    var answerContainers = document.querySelectorAll('.answers');

 
    let numCorrect = 0;

    console.log(answerContainers);
 
      answerContainers.forEach((currentQuestion,questionNumber) => {
        var question = answerContainers[questionNumber];
        console.log(question);
        var selector = `input[name=question${questionNumber}]:checked`;
        var userAnswer = (question.querySelector(selector) || {}).value;
       console.log(userAnswer);

      });
      // // find selected answer
        // // if answer is correct
      // if (userAnswer === currentQuestion.correctAnswer) {
      //   // add to the number of correct answers
      //   numCorrect++;

      //   // color the answers green
      //   answerContainers[questionNumber].style.color = 'lightgreen';
      // }
      // // if answer is wrong or blank
      // else {
      //   // color the answers red
      //   answerContainers[questionNumber].style.color = 'red';
      // }
    // });

    resultsContainer.innerHTML = `${numCorrect} out of ${answerContainers.length}`;
  }

  function showSlide(n) {
    var submitButton = document.getElementById('submit');
    var previousButton = document.getElementById("previous");
    var nextButton = document.getElementById("next");

  
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);

    var slides = document.querySelectorAll(".slide");
    console.log(slides[n]);
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if (currentSlide === 0) {
      previousButton.style.display = 'none';
    }
    else {
      previousButton.style.display = 'inline-block';
    }
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else {
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  hideIntro();

  buildQuiz();


  showSlide(currentSlide);

  var resultsContainer = document.getElementById('results');

}; 