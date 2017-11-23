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
        completedQuestions: 0,
        gameQuestions: {
            0: "Question 1",
            1: "Question 2",
            2: "Question 3",
            3: "Question 4",
            4: "Question 5",
        },
        timer: function() {
            let count = 10;
            var timerInterval = setInterval(function() {
                if (count > -1) {
                    $("#timer").text(count);
                    count--;
                }
                else {
                    clearInterval(timerInterval);
                    trivia.addQuestion();
                }
            }, 1000);
        },
        startGame: function() {
            $("#question").html("<button id='startgame'>Begin</button>");
        },
        nextQuestion: function() {
            this.addQuestion();
        },
        addQuestion: function() {
            if (this.completedQuestions < 5) {
            // This starts off the timer section with a 10, even though the countdown
            // hasn't started. Makes it appear synchronous. 
            $("#timer").text("10");
            this.timer();
            var number = this.completedQuestions.toString();
            $("#question").empty();
            $("#question").text(this.gameQuestions[number]);
            this.completedQuestions++;
            }
            else {
                this.finishGame();
            }
            
        },
        finishGame: function() {
            alert("Game is over");
        }
    };

    // Function to run on pageload
    trivia.startGame();

    $("#startgame").click(function() {trivia.addQuestion()});

});