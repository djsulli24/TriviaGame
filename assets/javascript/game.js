// Trivia Game
// -----Pseudocode-----
// 1. Object holding all of the questions, correct answers, and a "played" boolean
// that's marked as true when the question has been played - preventing repeats. Also
// holds "correct answer" and "incorrect answer" messages/images
// 2. Variables that track correctly answered questions and incorrectly answered questions
// as well as the number of played questions
// 3. Countdown timer function to run as each question is being answered
// 4. displayQuestion() function, which displays one of the questions from the questions object
// 5. initializeGame() function, which puts up the introductory screen
// 6. correctAnswer() function, which displays the correct answer message and screen
// 7. incorrectAnswer() function, which displays the incorrect answer message and screen
// 6 and 7 could be a single function
// 

$(document).ready(function() {

    var trivia = {
        wins: 0,
        losses: 0,
        completedQuestions: 0,
        intervalId: 0,
        gameQuestions: [
            {
                question: "What was the average life expectancy of white males born in the U.S. just before the Civil War?",
                incorrectAnswers: ["50 Years", "60 Years", "30 Years"],
                correctAnswer: "40 Years",
                answered: false
            },
            {
                question: "Question 2?",
                incorrectAnswers: ["Answer 1", "Answer 2", "Answer 3"],
                correctAnswer: "Answer 4",
                answered: false
            },
            {
                question: "Question 3?",
                incorrectAnswers: ["Answer 1", "Answer 2", "Answer 3"],
                correctAnswer: "Answer 4",
                answered: false
            },
            {
                question: "Question 4?",
                incorrectAnswers: ["Answer 1", "Answer 2", "Answer 3"],
                correctAnswer: "Answer 4",
                answered: false
            },
            {
                question: "Question 5?",
                incorrectAnswers: ["Answer 1", "Answer 2", "Answer 3"],
                correctAnswer: "Answer 4",
                answered: false
            },
        ],
        timer: function() {
            let count = 9;
            this.intervalId = setInterval(function() {
                if (count > -1) {
                    $("#timer").text(count);
                    count--;
                }
                else {
                    clearInterval(trivia.intervalId);
                    trivia.clickedAnswer("noAnswer");
                }
            }, 1000);
        },
        startGame: function() {
            $("#question").html("<button id='startgame'>Begin</button>");
        },
        addQuestion: function() {
            if (this.completedQuestions < 5) {
            // This starts off the timer section with a 10, even though the countdown
            // hasn't started. Makes it appear synchronous. 
            $("#timer").text("10");
            this.timer();
            $("#question").empty();
            $("#question").text(this.gameQuestions[this.completedQuestions].question);
            this.randomizeAnswers(this.completedQuestions);
            this.completedQuestions++;
            }
            else {
                this.finishGame();
            }
            
        },
        finishGame: function() {
            alert("Game is over");
        },
        clickedAnswer: function(userAnswer) {
            clearInterval(this.intervalId);
            if (userAnswer === "wrong") {
                alert("wrong answer");
                trivia.losses++;
            }
            else if (userAnswer === "correct") {
                alert("correct");
                trivia.wins++;
            }
            else {
                alert("you didn't pick an answer");
                trivia.losses++;
            }
            setTimeout(function() {trivia.addQuestion()}, 5000);
        },
        // This function returns an array with 0, 1, 2, 3 in a random order.
        // This is used to randomize the order of the answers.
        randomFour: function() {
            var randomFour = [];
            while (randomFour.length < 4) {
                let number = Math.floor(Math.random()*4);
                if (randomFour.indexOf(number) === -1) {
                    randomFour.push(number);
                }
            }
            return randomFour;
        },
        randomizeAnswers: function(questionNumber) {
            let array = this.randomFour();
            $("#answers").html("<ol><li></li><li></li><li></li><li></li></ol>");
            for (var i = 0; i<3; i++) {
                $("ol").children().eq(array[i]).text(trivia.gameQuestions[questionNumber].incorrectAnswers[i]);
                $("ol").children().eq(array[i]).attr("id", "wrong");
            }
            $("ol").children().eq(array[3]).text(trivia.gameQuestions[questionNumber].correctAnswer);
            $("ol").children().eq(array[3]).attr("id", "correct");
        }
    };

    // Function to run on pageload
    trivia.startGame();

    //------------CLICK EVENTS------------

    // The "start" button for the game
    $("#startgame").click(function() {trivia.addQuestion()});

    // Clicking a wrong answer
    $("#answers").on("click", "#wrong", function() {trivia.clickedAnswer("wrong")});

    // Clicking the correct answer
    $("#answers").on("click", "#correct", function() {trivia.clickedAnswer("correct")});
    


});