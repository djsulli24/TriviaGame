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
        // TO ADD: Should add a variable for "gamesCompleted", so user can play again
        // without resetting the "answered" values of the questions - can play
        // again through the question bank, and not repeat questions
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
        // Starts the countdown timer for a question, then calls the
        // clickedAnswer() function when the timer runs out (user hasn't
        // picked an answer)
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
        // First function called when page loads. This loads the splash screen
        // for the game.
        startGame: function() {
            $("#question").html("<button id='startgame'>Begin</button>");
        },
        // This function grabs a question and puts it on the page
        addQuestion: function() {
            // If the user hasn't answered 5 questions, new question 
            if (this.completedQuestions < 5) {
            // This starts off the timer section with a 10, even though the countdown
            // hasn't started. Makes it appear synchronous. 
            $("#timer").text("10");
            this.timer();
            $("#question").empty();
            $("#question").text(this.gameQuestions[this.completedQuestions].question);
            this.randomizeAnswers(this.completedQuestions);
            }
            // If 5 questions have been answered, the game is over.
            else {
                this.finishGame();
            }   
        },
        // This is the function that is called when the game has ended
        finishGame: function() {
            alert("Game is over");
        },
        // This is the function that is called once a user has cliked an answer
        // OR time has run out, and they didn't click an answer
        clickedAnswer: function(userAnswer) {
            clearInterval(this.intervalId);
            this.completedQuestions++;            
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

            // TO ADD: Write updated wins/losses value to the page

            // TO ADD: Erasing question and answers, putting a
            // message and gif on the page

            // Waits 5 seconds before starting the next question
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
        // This function puts all the answers on the page as an ordered list 
        // in a random order with id="wrong" or id="correct"
        randomizeAnswers: function(questionNumber) {
            let array = this.randomFour();
            $("#answers").html("<ol><li></li><li></li><li></li><li></li></ol>");
            for (var i = 0; i<3; i++) {
                $("ol").children().eq(array[i]).text(trivia.gameQuestions[questionNumber].incorrectAnswers[i]);
                $("ol").children().eq(array[i]).attr("id", "wrong");
            }
            $("ol").children().eq(array[3]).text(trivia.gameQuestions[questionNumber].correctAnswer);
            $("ol").children().eq(array[3]).attr("id", "correct");
            trivia.gameQuestions[questionNumber].answered = true;
        },
        // This function picks a question from the trivia.gameQuestions array - one whose
        // "answered" value is still "false" (hasn't been answered yet). It should return
        // a number for the index value of the question
        randomQuestionPicker: function() {
            // TO ADD: Generates a random number based on the length of the questions array
            // Checks in a loop whether that question's been answered -
            // an array holding the indices of answered questions might be a less expensive
            // way to track answered questions
        },
        // This function resets the game
        resetGame: function() {
            // TO ADD: Reset all "answered" values in the question objects to "false" - 
            // TO ADD: Maybe a soft reset vs hard reset. Hard reset would 

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