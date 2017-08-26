//Holds the questions in a separate JS file so as not to clutter the main JS file

	var introduction = "Hello there, and welcome to Who Wants to Be a Trivia Master! I'm your host, Regis Philbin, and I hope you're ready to answer some trivia. I have a set of ten questions with four possible answers, and you will have thirty seconds to answer them. When you are, just hit the 'Begin' button below!";

	var questionIntro = ["Alright, let's get started. The first question is...", //first question lead in
							"Here comes the second question: ", //second question lead in
							"Our third question is: ", //third question lead in
							"It's time for question four: ", //fourth question lead in
							"Ready for question five?", //fifth question lead in
							"Question six is:", //sixth question lead in
							"Lucky number seven's on its way", //seventh question lead in
							"Watch out! Here's question eight: ", //eighth question lead in
							"Hang in there! Here's question nine: ", //ninth question lead in
							"Here is our final question. I hope you're ready", //tenth question lead in
							"We are verifying your results..."] //final intermission before results

	//Array of Regis's sayings for when the player did not answer
	var noResponse = ["Getting the jitters out, are we? Take a few seconds now.", //first timeout response
						"Just in case you missed it, you have 30 seconds to answer the question.", //second timeout response
						"I know it can be tough for some people, but it's in your best interest to submit an answer.", //third timeout response
						"The silent treatment eh? An unconventional and probably unsuccessful strategem.", //fourth timeout response
						"Let me offer you some advice: try clicking one of the buttons or letter keys.", //fifth timeout response
						"Did you fall asleep? Maybe this next one will wake you up.", //sixth timeout response
						"Zzz. Oh, huh? Sorry, figured it wouldn't hurt if I dozed off too.", //seventh timeout response
						"I hope you're ok. Blink twice if you need me to call for help.", //eighth timeout response
						"Oh, don't worry about wasting my time. I'm paid hourly.", //ninth timeout response
						"Well, on the bright side, you technically didn't answer any questions incorrectly."]; //tenth timeout response


	//Object of questions, choices, and the correct answer
	var questionPool = {
		//Number of questions in questionPool; needs to be manually updated if questions are added
		length: 38,
		//Any new questions added should be the next available number, should have 4 options, and the correct answer's position in the array
		q1: {
			question: "In the Bible who interpreted the dreams of the Pharaoh?",
			option: ["Joseph","Daniel","David","Samuel"],
			answer: 0
		},
		q2: {
			question: "Which country has the Star of David in its flag?",
			option: ["USA","Iraq","Israel","Nepal"],
			answer: 2
		},
		q3: {
			question: "In which year was Magna Carta signed?",
			option: ["1603","1066","1707","1215"],
			answer: 3
		},
		q4: {
			question: "When was Carthage destroyed by the Romans?",
			option: ["146 B.C.","323 B.C.","44 A.D.","70 A.D."],
			answer: 0
		},
		q5: {
			question: "Which country has been ruled by a single dynasty for more than two thousand years?",
			option: ["England","Persia","Japan","Egypt"],
			answer: 2
		},
		q6: {
			question: "Who is the author of Ben Hur?",
			option: ["William Shakespeare","Bernard Shaw","Victor Hugo","Lew Wallace"],
			answer: 3
		},
		q7: {
			question: "Which game is played with five players on either side?",
			option: ["Basketball","Volleyball","Hockey","Football"],
			answer: 0
		},
		q8: {
			question: "Which is the national flower of Ireland?",
			option: ["Shamrock","Daffodil","Marigold","Jasmine"],
			answer: 0
		},
		q9: {
			question: "Which is the capital of Afghanistan?",
			option: ["Tehran","Baghdad","Kabul","Tashkent"],
			answer: 2
		},
		q10: {
			question: "What is the baptismal name of Pope John XXIII?",
			option: ["Albino Luciani","Angelo Roncalli","Aldo Moro","Sandro Pertini"],
			answer: 1
		},
		q11: {
			question: "Who was the Czar of Russia in 1917?",
			option: ["Nicholas II","Alexander II","Ivan IV","Peter II"],
			answer: 0
		},
		q12: {
			question: "The islands Hokkaido, Honshu, Shikoku and Kyushu are part of which country?",
			option: ["Philippines","South Korea","Japan","Vietnam"],
			answer: 2
		},
		q13: {
			question: "Who is the patron saint of Australia?",
			option: ["St. Peter","Mary Help of Christians","St. Paul","St. Rock"],
			answer: 1
		},
		q14: {
			question: "When is the Feast Day of St. John the Baptist?",
			option: ["March 19","June 24","July 19","August 15"],
			answer: 1
		},
		q15: {
			question: "Which of the following countries is landlocked?",
			option: ["Switzerland","Italy","Spain","France"],
			answer: 0
		},
		q16: {
			question: "What were the most popular first names given to boy and girl babies in the U.S. in the year 1900?",
			option: ["William and Elizabeth","Joseph and Catherine","John and Mary","George and Anne"],
			answer: 2
		},
		q17: {
			question: "What architect designed the glass pyramid in the courtyard of the Louvre?",
			option: ["Phillip Johnson","Le Corbusier","Frank Gehry","I.M. Pei"],
			answer: 3
		},
		q18: {
			question: "In the Roy Rogers-Dale Evans Museum, you will find Roy and Dales stuffed horses. Roy's horse was named Trigger, which was Dales horse?",
			option: ["Buttermilk","Daisy","Scout","Tulip"],
			answer: 0
		},
		q19: {
			question: "Which of these U.S. Presidents appeared on the television series, \"Laugh-In\"?",
			option: ["Lyndon Johnson", "Richard Nixon", "Jimmy Carter", "Gerald Ford"],
			answer: 1
		},
		q20: {
			question: "Which of the following items was owned by the fewest U.S. homes in 1990?",
			option: ["Home computer","Compact disk player","Cordless phone","Dishwasher"],
			answer: 1
		},
		q21: {
			question: "Who holds the record for the most victories in a row on the professional golf tour?",
			option: ["Jack Nicklaus","Arnold Palmer","Byron Nelson","Ben Hogan"],
			answer: 2
		},
		q22: {
			question: "Who is third behind Hank Aaron and Babe Ruth in major league career home runs?",
			option: ["Reggie Jackson","Harmon Killebrew","Willie Mays","Frank Robinson"],
			answer: 2
		},
		q23: {
			question: "In 1990, in what percentage of U.S. married couples did the wife earn more money than the husband?",
			option: ["8%","18%","38%","58%"],
			answer: 1
		},
		q24: {
			question: "During the 1980s for six consecutive years what breed of dog was the most popular in the U.S.?",
			option: ["Cocker spaniel","German shepherd","Labrador retriever","Poodle"],
			answer: 0
		},
		q25: {
			question: "In 1985, five percent of U.S. households had telephone answering machines. By 1990 what percentage of homes had answering machines?",
			option: ["10%","15%","31%","51%"],
			answer: 2
		},
		q26: {
			question: "Who was the first black American pictured on a U.S. postage stamp?",
			option: ["Frederick Douglass","Booker T. Washington","Louis Armstrong","Joe Louis"],
			answer: 3
		},
		q27: {
			question: 'What did the "D" in "D-Day" stand for?',
			option: ["Doom","Day","Dwight D. Eisenhower","Dunkirk"],
			answer: 1
		},
		q28: {
			question: "The Brownie Box Camera introduced by Eastman Kodak in 1900 had a retail price of what?",
			option: ["$1","$5","$10","$20"],
			answer: 0
		},
		q29: {
			question: "Which of these characters turned 40 years old in 1990?",
			option: ["Charlie Brown","Bugs Bunny","Mickey Mouse","Fred Flintstone"],
			answer: 0
		},
		q30: {
			question: "Where is Emperor Akbar’s tomb?",
			option: ["Delhi","Amarkot","Agra","Sikandra"],
			answer: 2
		},
		q31: {
			question: "Who died in the Battle of Trafalgar?",
			option: ["Napoleon Bonaparte","Horatio Nelson","Francis Drake","Charles Martel"],
			answer: 1
		},
		q32: {
			question: "To which Order did Martin Luther belong?",
			option: ["Augustinian","Dominican","Capuchin","Franciscan"],
			answer: 0
		},
		q33: {
			question: "What is the type of Government in Swaziland?",
			option: ["Monarchy","Aristocracy","Theocracy","Anarchy"],
			answer: 0
		},
		q34: {
			question: "Who killed US President Abraham Lincoln?",
			option: ["Lee Harvey Oswald","John Hinckley","John Wilkes Booth","Michael Schiavo"],
			answer: 2
		},
		q35: {
			question: "Who won the Hockey World Cup in 1975?",
			option: ["India","Pakistan","Germany","Australia"],
			answer: 0
		},
		q36: {
			question: "Which TV news channel began telecast in 1980?",
			option: ["Star News","CNN","BBC","Fox News"],
			answer: 1
		},
		q37: {
			question: "Which of the following is not a gas?",
			option: ["Nitrogen","Oxygen","Helium","Mercury"],
			answer: 3
		},
		q38: {
			question: "Which state was known as Mysore?",
			option: ["Kerala","Andhra Pradesh","Karnataka","Tamil Nadu"],
			answer: 2
		}
	}