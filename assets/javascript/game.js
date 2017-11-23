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
        randomQuestions: [],
        // TO ADD: Should add a variable for "gamesCompleted", so user can play again
        // without resetting the "answered" values of the questions - can play
        // again through the question bank, and not repeat questions

        // TO ADD: A global variable called "currentQuestion" that holds the index of the
        // current question
        gameQuestions: [
            {
                question: "What was the average life expectancy of white males born in the U.S. just before the Civil War?",
                incorrectAnswers: ["50 Years", "60 Years", "30 Years"],
                correctAnswer: "40 Years",
                answered: false
            },
            {
                question: "What is the name for an object in space that has an icy core with a tail of gas and dust that extends millions of miles?",
                incorrectAnswers: ["Star", "Moon", "Asteroid"],
                correctAnswer: "Comet",
                answered: false
            },
            {
                question: "Which kind of waves are used to make and receive cellphone calls?",
                incorrectAnswers: ["Visible light waves", "Sound waves", "Gravity waves"],
                correctAnswer: "Radio Waves",
                answered: false
            },
            {
                question: "Which of the Earth's layers is the hottest?",
                incorrectAnswers: ["Crust", "Mantle", "Sub-mantle"],
                correctAnswer: "Core",
                answered: false
            },
            {
                question: "Which of these is the main way that ocean tides are created?",
                incorrectAnswers: ["The rotation of the Earth on its axis", "The gravitational pull of the sun", "The rotation of the moon on its axis"],
                correctAnswer: "The gravitational pull of the moon",
                answered: false
            },
            {
                question: "What does a light-year measure?",
                incorrectAnswers: ["Brightness", "Time", "Weight"],
                correctAnswer: "Distance",
                answered: false
            },
            {
                question: "Denver, Colorado, is at a higher altitude than Los Angeles, California. Which of these statements is correct?",
                incorrectAnswers: ["Water boils at a higher temperature in Denver than Los Angeles.", "Water boils at the same temperature in both Denver and Los Angeles.", "Water boils more slowly in Denver than Los Angeles."],
                correctAnswer: "Water boils at a lower temperature in Denver than Los Angeles.",
                answered: false
            },
            {
                question: "The loudness of a sound is determined by what property of a sound wave?",
                incorrectAnswers: ["Frequency", "Wavelength", "Velocity or rate of change"],
                correctAnswer: "Amplitude or height",
                answered: false
            },
            {
                question: "Which of these elements is needed to make nuclear energy and nuclear weapons?",
                incorrectAnswers: ["Sodium Chloride", "Nitrogen", "Carbon dioxide"],
                correctAnswer: "Uranium",
                answered: false
            },
            {
                question: "Which of these people developed the polio vaccine?",
                incorrectAnswers: ["Marie Curie", "Isaac Newton", "Albert Einstein"],
                correctAnswer: "Jonas Salk",
                answered: false
            },
            {
                question: "Which of these terms is defined as the study of how the positions of stars and planets can influence human behavior?",
                incorrectAnswers: ["Alchemy", "Astronomy", "Meteorology"],
                correctAnswer: "Astrology",
                answered: false
            },
            {
                question: "Question",
                incorrectAnswers: ["Answer", "Answer", "Answer"],
                correctAnswer: "Answer",
                answered: false
            }
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
            // If this is the first question, print the wins and losses values
            if (this.completedQuestions === 0) {
                $("#wins").text(this.wins);
                $("#losses").text(this.losses);                
            }
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
                $("#losses").text(this.losses);                                
            }
            else if (userAnswer === "correct") {
                alert("correct");
                trivia.wins++;
                $("#wins").text(this.wins);                
            }
            else {
                alert("you didn't pick an answer");
                trivia.losses++;
                $("#losses").text(this.losses);                
            }

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
            // a global array holding the indices of answered questions might be a less expensive
            // way to track answered questions - just check 
        },
        // This function resets the game
        resetGame: function() {
            // TO ADD: Reset all "answered" values in the question objects to "false" - 
            // TO ADD: Maybe a soft reset vs hard reset. Hard reset would 
            // TO ADD: reset wins and losses values

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