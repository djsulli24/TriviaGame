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
        gameQuestions: {
            1: "Question 1",
            2: "Question 2",
            3: "Question 3",
            4: "Question 4",
            5: "Question 5",
        },
        timer: function() {
            let count = 10;
            setInterval(function() {
                if (count > -1) {
                $("#timer").text(count);
                count--;
                }
            }, 1000);
        },
        startGame: function() {

        },
        nextQuestion: function() {
            
        },
    };

trivia.timer();
});