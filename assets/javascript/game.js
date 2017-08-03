	var questions = [];
	var correct = 0;
	var incorrect = 0;
	var unanswered = 0;

	var countdown;
	var questionTimer;

	var questionLetter = ["A", "B", "C", "D"];
	

	$("#option1").on("click", function() {
		answer($(this).attr("data-option"));
	});

	$("#option2").on("click", function() {
		answer($(this).attr("data-option"));
	});

	$("#option3").on("click", function() {
		answer($(this).attr("data-option"));
	});

	$("#option4").on("click", function() {
		answer($(this).attr("data-option"));
	});

	//Tied to Begin button, after the welcome message
	function beginGame() {
		//Generates the 10 random questions that will be asked
		for(var i = 0; i < 10; i++){
			var randQ = Math.floor(Math.random() * questionPool.length + 1);

			//Checks if randQ was already selected, and if so, selects another question
			//Need to be wary of getting trapped in an infinite while loop!
			while(questions.indexOf(randQ) > -1) {
				randQ = Math.floor(Math.random() * questionPool.length + 1);
			}	
			
			questions.push(randQ);
		}

		for(var i = 0; i < 1; i++) {
			displayQ(questions[0]);
			decrement(30);
		}
	}

	//Displays the question and choices on the screen
	function displayQ(qNumber) {
		//Put up Regis text

		$("#question").text(questionPool["q" + qNumber].question);
		$("#option1").text(questionPool["q" + qNumber].option[0]);
		$("#option2").text(questionPool["q" + qNumber].option[1]);
		$("#option3").text(questionPool["q" + qNumber].option[2]);
		$("#option4").text(questionPool["q" + qNumber].option[3]);
	}

	// Function that counts down on the question clock until timeup or question is answered
	function decrement(i) {
		//decreases the timer by 1 second
		// callback = callback || function() {};
		questionTimer = 30;
		countdown = setInterval(function() {
			if(questionTimer > 5) {
				$("#timer").html("<h2><b>" + questionTimer + "</b></h2>")
			}
			else {
				$("#timer").html("<h2 style='color:red;'>" + questionTimer + "</h2>")	
			}

			questionTimer-- || answer("");
		}, 1000);
	}

	//Called when player answers question with one of the four options
	//If answered with blank, assumes no answer
	function answer(theirAnswer) {
		clearInterval(countdown);

		$("#message").html(questionLetter[theirAnswer-1] + " is your final answer...");
		//Make option orange
		setTimeout(grade, 3000);

		




	}

	function grade() {
		console.log("Option selected");
	}

	//Answers the question if A, B, C, or D is pressed
	document.onkeyup = function(event) {
		var choice = event.key.toUpperCase();
		if(choice === "A" || choice === "B" || choice === "C" || choice === "D") {
			answer(choice);	
		}
	};

	beginGame();
