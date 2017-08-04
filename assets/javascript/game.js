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
	
	//Assigns each option button their equivalent answer (can I combine these to make it more DRY?)
	//Only allows an answer when canAnswer is true
	$(".optionButton").on("click", function() {
		if(canAnswer) {
			answer($(this).attr("data-option"));
		}
	});

	// Allows/mutes music on button press. Also inverse button colors
	$("#musicButton").on("click", function() {
		//Flips mute boolean
		muted = !muted;

		//Starts or pauses music as appropriate
		if(muted) {
			console.log("Muting");
			//Stops all songs from playing
			introSong.pause();
			outroSong.pause();
			answerPauseMusic.pause();
			correctSong.pause();
			wrongSong.pause();
			noResponseSong.pause();
			questionMusic.pause();

			$(this).css('color', 'white');
			$(this).css('backgroundColor', 'black');
			$(this).css('borderColor', 'white');
		}
		else {
			console.log("Playing");
			$(this).css('color', 'black');
			$(this).css('backgroundColor', 'white');
			$(this).css('borderColor', 'black');
		}
	});

	//Answers the question if A, B, C, or D is pressed and canAnswer is true
	document.onkeyup = function(event) {
		var choice = event.key.toUpperCase();
		if(canAnswer) {
			if(choice === "A" || choice === "B" || choice === "C" || choice === "D") {
				//If the answer is appropriate, converts it to the position number and submits it
				answer(questionLetter.indexOf(choice));	
			}
		}
	};

	function welcomeMessage() {
		introSong.play();
		$("#question").html(introduction);
		$(".optionButton").hide();
		$("#timer").append("<button id='start'>Start</button>");
		$(document).on("click", "#start", beginGame);
	}

	//Starts the game when the Begin button is pressed and runs it through to endGame
	function beginGame() {
		introSong.pause();
		$("#timer").empty();

		//Randomly generates the 10 questions that will be asked
		for(var i = 0; i < maxQuestions; i++){
			var randQ = "q" + Math.floor(Math.random() * questionPool.length + 1);

			//Checks if randQ was already selected, and if so, selects another question
			//Need to be wary of getting trapped in an infinite while loop!
			while(questions.indexOf(randQ) > -1) {
				randQ = "q" + Math.floor(Math.random() * questionPool.length + 1);
			}	
			
			questions.push(randQ);
		}

		$(".optionButton").show();

		questionNum = 0;
		nextQuestion();

	}

	function nextQuestion() {

		if(questionNum < questions.length) {

		console.log("On question " + (questionNum + 1));
		//Stores the current question as global for reference in other methods
		currentQuestion = questions[questionNum];
		//Updates the screen for the current question
		displayQ(currentQuestion);
		//Updates the question number for the next round
		questionNum++;
		//Starts the timer, which exits upon timeup or a submitted answer
		startTimer();
		
		}
		else {
			endGame()
			console.log("Endgame");
		}
	}

	//Displays the question and choices on the screen
	function displayQ(qNumber) {
		
		//If not muted, plays the question music
		if(!muted) {
			questionMusic.play();
		}

		//Put up Regis text
		$("#message").text("Question " + (questionNum + 1));

		//Resets the text color to black
		$("#question").css("color","black");
		$(".optionButton").css("color","black");

		//Lists the question and the four answer options
		$("#question").text(questionPool[qNumber].question);
		$("#option1").text(questionPool[qNumber].option[0]);
		$("#option2").text(questionPool[qNumber].option[1]);
		$("#option3").text(questionPool[qNumber].option[2]);
		$("#option4").text(questionPool[qNumber].option[3]);

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
			if(questionTimer > 5) {
				$("#timer").html("<h2><b>" + questionTimer + "</b></h2>");
			}
			else {
				$("#timer").html("<h2 class='bulgingRed'>" + questionTimer + "</b></h2>");
			}
			//If questionTimer is 0, calls answer(""); otherwise decreases it by 1
			questionTimer-- || answer("");;
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
		if(theirAnswer === "") {
			nonResponse();
		}
		else {
			//Regis confirms your selection
			$("#message").html(questionLetter[theirAnswer] + " is your final answer...");
			
			//Marks their selected answer in orange
			$("#option" + (parseInt(theirAnswer) + 1)).css("background-color", "orange");

			if(!muted){
				questionMusic.pause();
				questionMusic.currentTime = 0;
				answerPauseMusic.play();
			}
			
			//Waits 3 seconds for tension and then grades your answer
			setTimeout(function() { grade(theirAnswer)}, answerPause);

		}
	}

	//Reacts to the question as a non-response
	function nonResponse() {

		//Stops the question music and plays the no response sound effect
		if(!muted){
			questionMusic.pause();
			questionMusic.currentTime = 0;
			noResponseSong.play();
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
		questionMusic.pause();
		questionMusic.currentTime = 0;
		console.log("Selected answer: " + theirAnswer);
		var correctAnswer = questionPool[currentQuestion].answer;
		console.log("Correct answer: " + correctAnswer);
		if(theirAnswer === correctAnswer) {
			console.log("Correct!");
			correct++;
			if(!muted) {
				correctSong.play();
			}
			$("#message").html("And you are right!");
		}
		else {
			console.log("Incorrect");
			incorrect++;
			if(!muted) {	
				wrongSong.play();
			}
			$("#message").html("I am sorry. That is incorrect.");
		}
		
		//Reveals correct answer
		flashCorrectAnswer(parseInt(correctAnswer) + 1);
		
		//Waits 5 seconds before moving onto the intermission
		setTimeout(function() { intermission() }, answerDisplayTime);

	}

	function flashCorrectAnswer(correctAnswerNum) {
		//Flashes and then makes the correct answer turquoise after .8 seconds
		var correctAnswerOption = $("#option" + (correctAnswerNum));
		correctAnswerOption.addClass("correctAnswerFlash");
		setTimeout(function() { 
			correctAnswerOption.removeClass("correctAnswerFlash");
			correctAnswerOption.css("background-color", "turquoise");
		 }, 800);
	}

	//Function that handles the intermission at the end of a round before the next question
	function intermission() {
		$("#message").html(questionIntro[questionNum]);
		//Hides timer, question, and option
		$("#timer").text("");
		$("#question").css("color", "white");
		$(".optionButton").css("color", "#ccc");
		//Resets button colors
		$(".optionButton").css("background-color", "#ccc");
		
		//Waits a few seconds for the intermission, and then moves onto the next question
		setTimeout(function() { nextQuestion() }, intermissionTime);
	}

	//Function that handles the end of a new game
	function endGame() {
		
		//Resets the text color to black
		$("#timer").css("color","black");
		$("#question").css("color","black");

		//Displays results
		$("#message").html("Here are your final results!");
		$("#question").html("<p><b>Correct Answers: </b>" + correct + "<br /><b>Incorrect Answers: </b>" + incorrect + "<br /><b>Unanswered Questions: </b>" + unanswered) + "</p>";
		
		if(!muted) {
			outroSong.play();
		}

		$(".optionButton").hide();

		//Gives the player 3 seconds to gloat or sulk, and then drops that restart button.
		setTimeout(function() {
			$("#timer").append('<p>Hope you had fun! If you would like to play again, hit the "Restart" button below!</p>');
			$("#timer").append("<button id='start'>Restart</button>");
			$(document).on("click", "#start", function() { 
				outroSong.pause();
				beginGame();
			})
		}, intermissionTime);

	}
	

	welcomeMessage();
