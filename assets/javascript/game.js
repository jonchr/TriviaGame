	//Stores the X number of randomly-selected questions determined at the start of a game
	var questions = [];

	//Stores the number of questions correct, incorrect, and unanswered respectively
	var correct = 0;
	var incorrect = 0;
	var unanswered = 0;

	//Variable that stores the time
	var countdown;

	//Array of letter choices equivalent to numbers (0 = A, 1 = B, 2 = C, 3 = D)
	var questionLetter = ["A", "B", "C", "D"];

	//Record of the question number (1-10) and current question (e.g. q2, q10, q38) the player is on
	var questionNum;
	var currentQuestion;

	//Variable of max number of questions and delay times
	var maxQuestions = 10; //Max questions asked per round; greater than 10 will likely mess the game up
	var timePerQuestion = 30; //30 seconds allotted per question
	var answerPause = 3000; //3 seconds before the answer is revealed
	var answerDisplayTime = 4000; //5 seconds when answer is displayed 
	var intermissionTime = 3000; //3 seconds of intermission before next question is revealed

	//Boolean of whether the question is available to be answered
	var canAnswer = false;

	//Boolean of whether to play sounds or not
	var muted = false;
	var currentSong;

	//Represents the phase of the game. Q1-3 is phase 1, Q4-6 is phase 2, Q7-9 is phase 3, and Q10 is phase 4
	//The background and question music will change with each phase. 
	//Also, there is extra music during intermission between phase 1 & 2 and 2 & 3
	var phase = 0;

	// Allows/mutes music on button press. Also inverts button colors
	$("#musicButton").on("click", function() {
	    //Flips mute boolean
	    muted = !muted;

	    //Starts or pauses music as appropriate
	    if (muted) {
	        console.log("Muting current song");
	        //Stops current song from playing
	        currentSong.pause();

	        //Sets icon white, background black, and border white
	        $(this).css('color', 'white');
	        $(this).css('backgroundColor', 'black');
	        $(this).css('borderColor', 'white');
	    } 
	    else {
	    	//Restarts current song
	        console.log("Playing", currentSong.getAttribute("src").replace("./assets/audio/", ""));
	        currentSong.play();
	        
	        //Sets icon black, background white, and border black
	        $(this).css('color', 'black');
	        $(this).css('backgroundColor', 'white');
	        $(this).css('borderColor', 'black');
	    }
	});

	//Assigns each option button the answer function
	//Only allows an answer when canAnswer is true
	$(".optionButton").on("click", function() {
	    if (canAnswer) {

	    	//Sets optionButton color to orange and letter black
	    	$(this).addClass("OB_orange");
	    	$("." + $(this).attr("data-letter")).css("color", "black");

	    	//Answers based on the data-letter attribute of the button
	        answer(questionLetter.indexOf($(this).attr("data-letter")));
	    }
	});

	//Answers the question if A, B, C, or D is pressed and canAnswer is true
	document.onkeyup = function(event) {
	    if (canAnswer) {
	        var choice = event.key.toUpperCase();
	        if (choice === "A" || choice === "B" || choice === "C" || choice === "D") {
	            
	            //Sets optionButton color to orange and letter black
	            $("#option" + questionLetter.indexOf(choice)).addClass("OB_orange");
	            $("." + choice).css("color", "black");

	            //If the answer is appropriate, converts it to the position number and submits it
	            answer(questionLetter.indexOf(choice));
	        }
	    }
	};

	//Method that beings functionality on page load
	function welcomeMessage() {
		//Plays the itnro song
	    currentSong = introSong;
	    currentSong.play();

	    //Load intro message in bubble
	    $("#question").html(introduction);

	    //Hides option buttons
	    $(".outerHex").hide();

	    //Loads start button and assigns start function
	    $("#timer").append("<button id='start'>Start</button>");
	    $(document).on("click", "#start", beginGame);
	}

	//Starts the game when the Begin button is pressed and runs it through to endGame
	function beginGame() {
		//Moves the game to phase 1
	    phaseUp();
	    //Clears submit button, and reveals option buttons
	    $("#timer").empty();
	    $(".outerHex").show();

	    //Randomly generates the 10 questions that will be asked
	    for (var i = 0; i < maxQuestions; i++) {
	        var randQ = "q" + Math.floor(Math.random() * questionPool.length + 1);

	        //Checks if randQ was already selected, and if so, selects another question
	        //Need to be wary of getting trapped in an infinite while loop!
	        while (questions.indexOf(randQ) > -1) {
	            randQ = "q" + Math.floor(Math.random() * questionPool.length + 1);
	        }
	        //Adds question to array
	        questions.push(randQ);
	    }

	    //Sets the question number to 1 and starts the round of questions
	    questionNum = 1;
	    nextQuestion();

	}

	//First method in questions loop where it progresses to the next question
	//Also the transition point from BeginGame and to EndGame
	function nextQuestion() {
		//If there are still questions left
	    if (questionNum - 1 < questions.length) {

	        console.log("On question " + (questionNum));
	        //Stores the current question as global for reference in other methods
	        currentQuestion = questions[questionNum - 1];
	        //Updates the screen for the current question
	        displayQ(currentQuestion);
	        //Updates the question number for the next round
	        questionNum++;
	        //Starts the timer, which exits upon timeup or a submitted answer
	        startTimer();

	    } 
	    else {
	    	//Ends the game
	        endGame()
	        console.log("Endgame");
	    }
	}

	//Displays the question and choices on the screen
	function displayQ(qNumber) {
		//Pauses previous song and sets the current music to the question music
	    currentSong.pause();
	    currentSong = questionMusic;
	    currentSong.currentTime = 0;
	    //If not muted, plays the question music
	    if (!muted) {
	        currentSong.play();
	    }

	    //Put up Regis text
	    $("#message").text("Question " + (questionNum));

	    //Resets the button colors
	    $("#question").css("color", "black");
	    $(".buttonLetter").css("color", "orange");
	    $(".questionText").css("color", "white");

	    //Lists the question and the four answer options
	    $("#question").text(questionPool[qNumber].question);
	    $("#option1").html("<span class='buttonLetter A'>&#x2022 A :</span><span class='questionText A'>" + questionPool[qNumber].option[0] + "</span>");
	    $("#option2").html("<span class='buttonLetter B'>&#x2022 B :</span><span class='questionText B'>" + questionPool[qNumber].option[1] + "</span>");
	    $("#option3").html("<span class='buttonLetter C'>&#x2022 C :</span><span class='questionText C'>" + questionPool[qNumber].option[2] + "</span>");
	    $("#option4").html("<span class='buttonLetter D'>&#x2022 D :</span><span class='questionText D'>" + questionPool[qNumber].option[3] + "</span>");

	    //Activates canAnswer so the player can answer the question
	    canAnswer = true;
	}

	// Function that counts down on the question clock until time's up or question is answered
	function startTimer() {
	    //Starts timer at 30 seconds
	    var questionTimer = timePerQuestion;
	    //Sets an function interval of every second. Each interval, the timer will decrease by 1
	    //Upon time up, it will call the answer function with a non-response answer ("")
	    //If the user answers the question, the countdown is halted
	    countdown = setInterval(function() {
	        //When the timer is 5 seconds or less, bolds and colors it in red
	        if (questionTimer > 5) {
	            $("#timer").html("<h2><b>" + questionTimer + "</b></h2>");
	        } else {
	            $("#timer").html("<h2 class='bulgingRed'>" + questionTimer + "</b></h2>");
	        }
	        //If questionTimer is 0, calls answer(""); otherwise decreases it by 1
	        questionTimer-- || answer("");
	    }, 1000);
	}

	//Called when player answers question with one of the four options
	//If answered with blank, assumes no answer
	function answer(theirAnswer) {
	    //clears the timer
	    //console.log("clearing countdown");
	    clearInterval(countdown);
	    //Freezes the time displayed on the clock
	    $("#timer").html("<h2><b>" + $("#timer").text() + "</b></h2>");
	    //console.log("cleared countdown");
	    //prevents them from further answering the question
	    canAnswer = false;
	    //if no answer, submits non-response
	    if (theirAnswer === "") {
	        nonResponse();
	    } else {
	        //Regis confirms your selection
	        $("#message").html(questionLetter[theirAnswer] + " is your final answer...");

	        currentSong.pause();
	        currentSong = answerPauseMusic;
	        currentSong.currentTime = 0;
	        if (!muted) {
	            currentSong.play();
	        }

	        //Waits 3 seconds for tension and then grades your answer
	        setTimeout(function() { grade(theirAnswer) }, answerPause);

	    }
	}

	//Reacts to the question as a non-response
	function nonResponse() {

	    currentSong.pause();
	    currentSong = noResponseSong;
	    //Stops the question music and plays the no response sound effect
	    if (!muted) {
	        currentSong.play();
	    }

	    console.log("No response");
	    $("#message").html(noResponse[unanswered]);
	    unanswered++;

	    //Reveals correct answer
	    flashCorrectAnswer(parseInt(questionPool[currentQuestion].answer) + 1);

	    //Waits 5 seconds before moving onto the intermission
	    setTimeout(function() { intermission() }, answerDisplayTime);
	}

	function grade(theirAnswer) {
	    currentSong.pause();

	    //Looks up the correct answer and logs it with their answer
	    console.log("Selected answer: " + questionLetter[theirAnswer]);
	    var correctAnswer = questionPool[currentQuestion].answer;
	    console.log("Correct answer: " + questionLetter[correctAnswer]);


	    if (theirAnswer === correctAnswer) {
	    	//If correct, logs it, counts it, plays the correct music, and updates the text
	        console.log("Correct!");
	        correct++;
	        currentSong = correctSong;
	        if (!muted) {
	            currentSong.play();
	        }
	        $("#message").html("And you are right!");
	    } 
	    else {
	    	//If incorrect, logs it, counts it, plays the incorrect music, and udpates the text
	        console.log("Incorrect");
	        incorrect++;
	        currentSong = wrongSong;
	        if (!muted) {
	            currentSong.play();
	        }
	        $("#message").html("I am sorry. That is incorrect.");
	    }

	    //Flashes the correct answer regardless of whether its the one they chose or not
	    flashCorrectAnswer(parseInt(correctAnswer) + 1);

	    //Waits 5 seconds before moving onto the intermission
	    setTimeout(function() { intermission() }, answerDisplayTime);

	}

	//Flashes and then makes the correct answer turquoise after .8 seconds
	function flashCorrectAnswer(correctAnswerNum) {
	    //The option button of the correct answer
	    var correctAnswerOption = $("#option" + (correctAnswerNum));
	    
	    //Flashes 10 times by adding and remove the turquoise class every .1 seconds, to end on turquoise
	    var colorFlash = 0;
	    var flash = setInterval(function() {
        	console.log("Flash", colorFlash);

        	if(colorFlash % 2 === 0) correctAnswerOption.addClass("OB_turquoise");
        	else correctAnswerOption.removeClass("OB_turquoise");

	        colorFlash++;
	        if(colorFlash >= 10) clearInterval(flash);
	    }, 100);
	}

	//Function that handles the intermission at the end of a round before the next question
	function intermission() {
		//Updates Regis's text for the upcoming question
	    $("#message").html(questionIntro[questionNum - 1]);
	    //Hides timer, question, and option
	    $("#timer").text("");
	    $("#question").css("color", "white");
	    $(".optionButton").css("color", "#222");
	    //Resets button colors
	    $(".buttonLetter").css("color", "#222");
	    $(".questionText").css("color", "#222");
	    $(".optionButton").removeClass("OB_orange");
	    $(".optionButton").removeClass("OB_turquoise");

	    //If question 4, moves the phase forward 1
	    if (questionNum === 4) {
	        phaseUp();
	        //Plays phase up intermission music
	        currentSong.pause();
	        currentSong = phaseUpMusic1
	        currentSong.play();

	        //sets intermission music to long enough for the full music
	        intermissionTime = 5000;
	    }
	    //If question 7, moves the phase forward 1
	    else if (questionNum === 7) {
	        phaseUp();
	        //Plays phase up intermission music
	        currentSong.pause();
	        currentSong = phaseUpMusic2;
	        currentSong.play();

	        //sets intermission music to long enough for the full music
	        intermissionTime = 4500;
	    }
	    //If question 10, moves the phase forward 1
	    else if (questionNum === 10) {
	        phaseUp();
	        intermissionTime = 5000;
	    } else {
	        //resets intermission time to 3 seconds
	        intermissionTime = 3000;
	    }

	    //Waits a few seconds for the intermission, and then moves onto the next question
	    setTimeout(function() { nextQuestion() }, intermissionTime);
	}

	//Increases the phase of the game and updates the background and music as appropriate
	function phaseUp() {
	    phase++;
	    //Updates the question music, correct music, and background for the phase
	    questionMusic.setAttribute("src", "./assets/audio/questionMusic" + phase + ".mp3");
	    correctSong.setAttribute("src", "./assets/audio/correct" + phase + ".mp3");
	    $("body").css("background-image", "url('./assets/images/background" + phase + ".jpg')");

	}

	//Function that handles the end of a new game
	function endGame() {

	    //Resets the text color to black
	    $("#timer").css("color", "black");
	    $("#question").css("color", "black");

	    //Displays results
	    $("#question").html("<p><b>Correct Answers: </b>" + correct + "<br /><b>Incorrect Answers: </b>" + incorrect + "<br /><b>Unanswered Questions: </b>" + unanswered) + "</p>";

	    //If perfect score, different message and music
	    if (incorrect === 0 && unanswered === 0) {
	        $("#message").html("Outstanding! A perfect score!");
	        currentSong = perfectScore;
	    }
	    else {
	        $("#message").html("Here are your final results!");
	        currentSong = outroSong;
	    }
	    if (!muted) {
	        currentSong.play();
	    }

	    $(".outerHex").hide();

	    //Gives the player 3 seconds to gloat or sulk, and then drops that restart button.
	    setTimeout(function() {
	        $("#timer").append('<p>Hope you had fun! If you would like to play again, hit the "Restart" button below!</p>');
	        $("#timer").append("<button id='start'>Restart</button>");
	        $(document).on("click", "#start", function() {
	            currentSong.pause();
	            phase = 0;
	            beginGame();
	        })
	    }, intermissionTime);

	}

//When the page is ready, begins the game
$(document).ready(function() {	welcomeMessage() });
