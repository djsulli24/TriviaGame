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
        // This array will be filled at the start of the game with random numbers
        // Between 0 and the the number of questions minus one.
        randomQuestions: [],
        currentQuestion: 0,
        gameQuestions: [
            {
                question: "What was the average life expectancy of white males born in the U.S. just before the Civil War?",
                incorrectAnswers: ["50 Years", "60 Years", "30 Years"],
                correctAnswer: "40 Years",
                gif: "life+expectancy"                
            },
            {
                question: "What is the name for an object in space that has an icy core with a tail of gas and dust that extends millions of miles?",
                incorrectAnswers: ["Star", "Moon", "Asteroid"],
                correctAnswer: "Comet",
                gif: "comet"                
            },
            {
                question: "Which kind of waves are used to make and receive cellphone calls?",
                incorrectAnswers: ["Visible light waves", "Sound waves", "Gravity waves"],
                correctAnswer: "Radio Waves",
                gif: "radio+waves"                
            },
            {
                question: "Which of the Earth's layers is the hottest?",
                incorrectAnswers: ["Crust", "Mantle", "Sub-mantle"],
                correctAnswer: "Core",
                gif: "earth+layers"                
            },
            {
                question: "Which of these is the main way that ocean tides are created?",
                incorrectAnswers: ["The rotation of the Earth on its axis", "The gravitational pull of the sun", "The rotation of the moon on its axis"],
                correctAnswer: "The gravitational pull of the moon",
                gif: "ocean+waves"                
            },
            {
                question: "What does a light-year measure?",
                incorrectAnswers: ["Brightness", "Time", "Weight"],
                correctAnswer: "Distance",
                gif: "lightyear"                
            },
            {
                question: "Denver, Colorado, is at a higher altitude than Los Angeles, California. Which of these statements is correct?",
                incorrectAnswers: ["Water boils at a higher temperature in Denver than Los Angeles.", "Water boils at the same temperature in both Denver and Los Angeles.", "Water boils more slowly in Denver than Los Angeles."],
                correctAnswer: "Water boils at a lower temperature in Denver than Los Angeles.",
                gif: "denver+road"                
            },
            {
                question: "The loudness of a sound is determined by what property of a sound wave?",
                incorrectAnswers: ["Frequency", "Wavelength", "Velocity or rate of change"],
                correctAnswer: "Amplitude or height",
                gif: "amplitude"                
            },
            {
                question: "Which of these elements is needed to make nuclear energy and nuclear weapons?",
                incorrectAnswers: ["Sodium Chloride", "Nitrogen", "Carbon dioxide"],
                correctAnswer: "Uranium",
                gif: "uranium"                
            },
            {
                question: "Which of these people developed the polio vaccine?",
                incorrectAnswers: ["Marie Curie", "Isaac Newton", "Albert Einstein"],
                correctAnswer: "Jonas Salk",
                gif: "jonas+salk"                
            },
            {
                question: "Which of these terms is defined as the study of how the positions of stars and planets can influence human behavior?",
                incorrectAnswers: ["Alchemy", "Astronomy", "Meteorology"],
                correctAnswer: "Astrology",
                gif: "astrology"                
            },
            {
                question: "What is the name of the largest lobe of the human brain?",
                incorrectAnswers: ["Parietal lobe", "Occipital lobe", "Temporal lobe"],
                correctAnswer: "Frontal lobe",
                gif: "frontal+lobe"
            },
            {
                question: "What is the colored portion of the human eye called?",
                incorrectAnswers: ["Pupil", "Sclera", "Retina"],
                correctAnswer: "Iris",
                gif: "eye+iris"
            },
            {
                question: "What is the name of the substance that gives skin and hair its pigment?",
                incorrectAnswers: ["Melatonin", "Pigmentin", "Dermis"],
                correctAnswer: "Melanin",
                gif: "skin+cells"
            },
            {
                question: "What is the name of the muscle found on the front of your thigh?",
                incorrectAnswers: ["Bicep", "Hamstring", "Soleus"],
                correctAnswer: "Quadricep",
                gif: "quadricep"
            },
            {
                question: "What is the human body's largest organ?",
                incorrectAnswers: ["Intestines", "Liver", "Brain"],
                correctAnswer: "Skin",
                gif: "skin"
            },
            {
                question: "What is the name for the human voice box?",
                incorrectAnswers: ["Pharynx", "Esophagus", "Epiglottis"],
                correctAnswer: "Larynx",
                gif: "whitney+houston"
            },
            {
                question: "Which planet is closest to the sun?",
                incorrectAnswers: ["Mars", "Venus", "Neptune"],
                correctAnswer: "Mercury",
                gif: "planets"
            },
            {
                question: "What is the main gas in the air we breathe?",
                incorrectAnswers: ["Oxygen", "Carbon dioxide", "Ether"],
                correctAnswer: "Nitrogen",
                gif: "sky"
            },
            {
                question: "Which element on the Periodic Table is represented by the letter 'K'?",
                incorrectAnswers: ["Chlorine", "Bromine", "Krypton"],
                correctAnswer: "Potassium",
                gif: "potassium"
            },
            {
                question: "What is the symbol for gold on the Periodic Table?",
                incorrectAnswers: ["G", "O", "Fr"],
                correctAnswer: "Au",
                gif: "gold"
            },
            {
                question: "How does infrared light compare with visible light?",
                incorrectAnswers: ["Higher frequency", "Shorter wavelength", "Higher amplitude"],
                correctAnswer: "Longer wavelength",
                gif: "infrared"
            },
            {
                question: "Amino acids make up what important biological molecule?",
                incorrectAnswers: ["DNA", "Base pairs", "Carbohydrates"],
                correctAnswer: "Proteins",
                gif: "proteins"
            },
            {
                question: "Pure water as a pH level of:",
                incorrectAnswers: ["5", "4", "6"],
                correctAnswer: "7",
                gif: "water"
            },
            {
                question: "How many bones are there in the human body?",
                incorrectAnswers: ["200", "210", "204"],
                correctAnswer: "206",
                gif: "skeleton"
            },
            {
                question: "According to Apollo astronauts, the Moon smells like",
                incorrectAnswers: ["Cheese", "Gasoline", "Coffee grounds"],
                correctAnswer: "Burnt gunpowder",
                gif: "moon"
            },
            {
                question: "The plant and skin of this fruit can cause contact dermatitis and other symptoms of poison ivy.",
                incorrectAnswers: ["Kiwi", "Pomegranate", "Papaya"],
                correctAnswer: "Mango",
                gif: "mango"
            },
            {
                question: "You may have heard a weird meat 'tastes like chicken.' Which edible insect actually does taste like chicken?",
                incorrectAnswers: ["Brown Cockroach", "Grasshopper", "Dung Beetle"],
                correctAnswer: "Cicadas",
                gif: "cicada"
            },
            {
                question: "Chocolate contains theobromine and a little caffeine. A 1-ounce square of chocolate has as much caffeine as:",
                incorrectAnswers: ["Half a can of cola", "A glass of iced tea", "A cup of regular coffee"],
                correctAnswer: "A cup of decaf coffee",
                gif: "chocolate"
            },
            {
                question: "Which of the following contains, on average, the least caffeine?",
                incorrectAnswers: ["Cup of coffee", "Cup of green tea", "Cup of black tea"],
                correctAnswer: "Shot of espresso",
                gif: "skeleton"
            },
            {
                question: "All of the following animals can move very quickly. Which is the fastest?",
                incorrectAnswers: ["Cheetah", "Black Marlin", "Horsefly"],
                correctAnswer: "Peregrine Falcon",
                gif: "falcon"
            },
            {
                question: "Every person is different, but just how much do you differ, genetically, from other humans?",
                incorrectAnswers: ["25%", "2%", "10%"],
                correctAnswer: "0.1%",
                gif: "dna"
            },
            {
                question: "Lobster blood is blue once it is exposed to air. What color is it inside a living lobster?",
                incorrectAnswers: ["Blue", "Yellow", "Red"],
                correctAnswer: "Clear",
                gif: "lobster"
            },
            {
                question: "Human blood is red when it is exposed to air. What color is the deoxygenated blood inside your veins?",
                incorrectAnswers: ["Blue", "Clear", "Brown"],
                correctAnswer: "Red",
                gif: "blood"
            },
            {
                question: "Scientist have studied public restroom stall use. The toilet used the least may have fewest germs. Which stall is this?",
                incorrectAnswers: ["First door on the right", "Any middle stall", "204"],
                correctAnswer: "First door on the left",
                gif: "bathroom"
            },
        ],
        // Starts the countdown timer for a question, then calls the
        // clickedAnswer() function when the timer runs out (user hasn't
        // picked an answer)
        timer: function() {
            let count = 29;
            $("#timer").html("<span class='glyphicon glyphicon-time'></span> 30 seconds left");            
            this.intervalId = setInterval(function() {
                if (count > -1) {
                    $("#timer").html("<span class='glyphicon glyphicon-time'></span> " + count + " seconds left");
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
            $("#wins").css("display", "none");
            $("#losses").css("display", "none");       
            $("#timer").css("display", "none");             
            $("#question").html("<button id='startgame'>Begin</button>");
            this.randomQuestions = this.randomQuestionList();
        },
        // This function grabs a question and puts it on the page
        addQuestion: function() {
            this.currentQuestion = this.randomQuestions[this.completedQuestions];
            $("#wins").css("display", "inherit");
            $("#losses").css("display", "inherit");  
            $("#timer").css("display", "inherit"); 
            // If this is the first question, print the wins and losses values
            if (this.completedQuestions === 0) {
                $("#wins").html("<span class='glyphicon glyphicon-ok'></span> " + this.wins);
                $("#losses").html("<span class='glyphicon glyphicon-remove'></span> " + this.losses);                
            }
            // If the user hasn't answered 5 questions, new question 
            if (this.completedQuestions < this.randomQuestions.length) {
            // This starts off the timer section with a 10, even though the countdown
            // hasn't started. Makes it appear synchronous. 
            this.timer();
            $("#question").empty();
            $("#question").text(this.gameQuestions[this.currentQuestion].question);
            this.randomizeAnswers(this.currentQuestion);
            }
            // If 5 questions have been answered, the game is over.
            else {
                this.finishGame();
            }   
        },
        // This is the function that is called when the game has ended
        finishGame: function() {
            $("#explanation").text("Game Over")
        },
        // This is the function that is called once a user has cliked an answer
        // OR time has run out, and they didn't click an answer
        clickedAnswer: function(userAnswer) {
            // Clears out the question and answer text. Also hides the score.
            $("#question").empty();
            $("#answers").empty();
            $("#wins").css("display", "none");
            $("#losses").css("display", "none"); 
            $("#timer").css("display", "none");             
            // Adds a gif to the page
            $("gif").html(this.giphyAPI(this.gameQuestions[this.currentQuestion].gif));
            // Clears the interval of the countdown timer
            clearInterval(this.intervalId);
            // The user has answered the question, so completedQuestions increases by 1.
            this.completedQuestions++;            
            if (userAnswer === "wrong") {
                $("#explanation").html("<span class='glyphicon glyphicon-remove'></span> Nope! <br> The correct answer was: " + this.gameQuestions[this.currentQuestion].correctAnswer);
                trivia.losses++;
                $("#losses").html("<span class='glyphicon glyphicon-remove'></span> " + this.losses);                                
            }
            else if (userAnswer === "correct") {
                $("#explanation").html("<span class='glyphicon glyphicon-ok'></span> Correct.");
                trivia.wins++;
                $("#wins").html("<span class='glyphicon glyphicon-ok'></span> " + this.wins);                
            }
            else {
                $("#explanation").html("<span class='glyphicon glyphicon-remove'></span> You ran out of time. <br> The correct answer was: " + this.gameQuestions[this.currentQuestion].correctAnswer);
                trivia.losses++;
                $("#losses").html("<span class='glyphicon glyphicon-remove'></span> " + this.losses);                
            }

            // TO ADD: Erasing question and answers, putting a
            // message and gif on the page

            // Waits 5 seconds before starting the next question
            setTimeout(function() {
                $("#gif").empty();
                $("#explanation").empty();
                trivia.addQuestion()
            }, 5000);
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
        // This function generates and returns an array of seven numbers in a random order.
        // The numbers are between 0 and the number of questions in the question bank
        // minus one.
        randomQuestionList: function() {
            var randomSeven = [];
            while (randomSeven.length < 7) {
                let number = Math.floor(Math.random()*this.gameQuestions.length);
                if (randomSeven.indexOf(number) === -1) {
                    randomSeven.push(number);
                }
            }
            return randomSeven;
        },
        // This function resets the game
        resetGame: function() {
            this.wins = 0;
            this.losses = 0;
            this.completedQuestions = 0;
            this.currentQuestion = 0;

        },
        // Posts a Giphy gif after a question has been answered, or timer runs out
        giphyAPI: function(searchTerm) {
            var giphyURL = "http://api.giphy.com/v1/gifs/search?api_key=zJ4WnHswLS4shydUPsDoUOqYFXlN1IaB&limit=1&q=" + searchTerm;      
            $.ajax({
                url: giphyURL,
                method: "GET",
                }).done(function(response) {
                    $("#gif").html("<img src='" + response.data[0].images.fixed_width.url + "'/>");
                }
            );
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