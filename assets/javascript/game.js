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

	//Record of current question player is on
	var currentQuestion;

	//Boolean of whether the question is available to be answered
	var canAnswer = false;
	
	//Assigns each option button their equivalent answer (can I combine these to make it more DRY?)
	//Only allows an answer when canAnswer is true
	$("#option1").on("click", function() {
		console.log(canAnswer);
		if(canAnswer) {
			answer($(this).attr("data-option"));
		}
	});
	$("#option2").on("click", function() {
		if(canAnswer) {
			answer($(this).attr("data-option"));
		}
	});
	$("#option3").on("click", function() {
		if(canAnswer) {
			answer($(this).attr("data-option"));
		}
	});
	$("#option4").on("click", function() {
		if(canAnswer) {
			answer($(this).attr("data-option"));
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

	//Starts the game when the Begin button is pressed and runs it through to endGame
	function beginGame() {
		//Randomly generates the 10 questions that will be asked
		for(var i = 0; i < 10; i++){
			var randQ = "q" + Math.floor(Math.random() * questionPool.length + 1);

			//Checks if randQ was already selected, and if so, selects another question
			//Need to be wary of getting trapped in an infinite while loop!
			while(questions.indexOf(randQ) > -1) {
				randQ = "q" + Math.floor(Math.random() * questionPool.length + 1);
			}	
			
			questions.push(randQ);
		}

		//Loops through the ten questions
		for(var i = 0; i < 1; i++) {
			console.log("On question " + (i+1));
			//Stores the current question as global for reference in other methods
			currentQuestion = questions[i];
			//Updates the screen for the current question
			displayQ(currentQuestion);
			//Starts the timer, which exits upon timeup or a submitted answer
			startTimer();
		}

		//endGame()
		console.log("Endgame");
	}

	//Displays the question and choices on the screen
	function displayQ(qNumber) {
		//Put up Regis text

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
		var questionTimer = 30;
		//Sets an function interval of every second. Each interval, the timer will decrease by 1
		//Upon time up, it will call the answer function with a non-response answer ("")
		//If the user answers the question, the countdown is halted
		countdown = setInterval(function() {
			//When the timer is 5 seconds or less, bolds and colors it in red
			if(questionTimer > 5) {
				$("#timer").html("<h2><b>" + questionTimer + "</b></h2>")
			}
			else {
				$("#timer").html("<h2 style='color:red;'>" + questionTimer + "</h2>")	
			}
			//If questionTimer is 0, calls answer(""); otherwise decreases it by 1
			questionTimer-- || answer("");
		}, 1000);
	}

	//Called when player answers question with one of the four options
	//If answered with blank, assumes no answer
	function answer(theirAnswer) {
		//clears the timer
		console.log("clearing countdown");
		clearInterval(countdown);
		console.log("cleared countdown");
		//prevents them from further answering the question
		canAnswer = false;
		//if no answer, submits non-response
		if(theirAnswer === "") {
			noResponse();
		}
		else {
			//Regis confirms your selection
			$("#message").html(questionLetter[theirAnswer] + " is your final answer...");

			//Make option orange

			//Waits 3 seconds for tension and then grades your answer
			setTimeout(function() { grade(theirAnswer)}, 3000);

		}
	}

	//Reacts to the question as a non-response
	function noResponse() {
		console.log("No response");
		$("#message").html(noResponses[unanswered]);
		unanswered++;

		//Show correct answer as orange
		
		//Waits 5 seconds before moving onto the intermission
		setTimeout(function() { intermission() }, 5000);
	}

	function grade(theirAnswer) {
		console.log("Selected answer: " + theirAnswer);
		var correctAnswer = questionPool[currentQuestion].answer;
		console.log("Correct answer: " + correctAnswer);
		if(theirAnswer === correctAnswer) {
			console.log("Correct!");
			correct++;
			$("#message").html("And you are right!");
		}
		else {
			console.log("Incorrect");
			incorrect++;
			$("#message").html("I am sorry. That is incorrect.");
		}
		//Makes the correct answer green
		$("#option" + correctAnswer).css("background-color: bluegreen;");
		
		//Waits 5 seconds before moving onto the intermission
		setTimeout(function() { intermission() }, 5000);

	}

	//Function that handles the intermission at the end of a round before the next question
	function intermission() {
		$("#message").html('New message');
		//Resets button colors
		// $("#option1").css(reset);
		// $("#option2").css(reset);
		// $("#option3").css(reset);
		// $("#option4").css(reset);

		//Waits 5 seconds before ending; as intermission ends, so do all the previous methods other than beginGame
		//Thus, the forloop at the end of beginGame finally gets to move onto the next i
		setTimeout(function() { }, 5000);
		console.log("Next");

	}

	

	beginGame();
