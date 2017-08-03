//Holds the questions in a separate JS file so as not to clutter the main JS file

	var introduction = "Hello there, and welcome to Who Wants to Be a Trivia Master! I'm your host, Regis Philbin, and I hope you're ready to answer some question. When you are, just hit the 'Begin' button below!";

	var questionIntro = ["Alright, let's get started. The first question is...", "Here's our second question: ", "The next question is: ", "Here is our final question. I hope you're ready"];
	//Array of Regis's sayings for when the player was correct
	var correctResponses = [];
	//Array of Regis's sayings for when the player was incorrect
	var incorrectResponses = [];
	//Array of Regis's sayings for when the player did not answer
	var noResponses = ["Getting the jitters out, are we? Take a few seconds now.", "Did you fall asleep? Maybe this next one will wake you up.", "It's alright. At this point I don't feel like answering the question either. Here's your score."];


	//Object of questions, choices, and the correct answer
	var questionPool = {
		//Number of questions in questionPool; needs to be manually updated if questions are added
		length: 38,
		q1: {
			question: "In the Bible who interpreted the dreams of the Pharaoh?",
			option: ["Joseph","Daniel","David","Samuel"],
			answer: "1"
		},
		q2: {
			question: "Which country has the Star of David in its flag?",
			option: ["USA","Iraq","Israel","Nepal"],
			answer: "3"
		},
		q3: {
			question: "In which year was Magna Carta signed?",
			option: ["1603","1066","1707","1215"],
			answer: "4"
		},
		q4: {
			question: "When was Carthage destroyed by the Romans?",
			option: ["146 B.C.","323 B.C.","44 A.D.","70 A.D."],
			answer: "1"
		},
		q5: {
			question: "Which country is ruled by a single dynasty for more than two thousand years?",
			option: ["England","Persia","Japan","Egypt"],
			answer: "3"
		},
		q6: {
			question: "Who is the author of Ben Hur?",
			option: ["William Shakespeare","Bernard Shaw","Victor Hugo","Lew Wallace"],
			answer: "4"
		},
		q7: {
			question: "Which game is played with five players on either side?",
			option: ["Basketball","Volleyball","Hockey","Football"],
			answer: "1"
		},
		q8: {
			question: "Which is the national flower of Ireland?",
			option: ["Shamrock","Daffodil","Marigold","Jasmine"],
			answer: "1"
		},
		q9: {
			question: "Which is the capital of Afghanistan?",
			option: ["Tehran","Baghdad","Kabul","Tashkent"],
			answer: "3"
		},
		q10: {
			question: "What is the baptismal name of Pope John XXIII?",
			option: ["Albino Luciani","Angelo Roncalli","Aldo Moro","Sandro Pertini"],
			answer: "2"
		},
		q11: {
			question: "Who was the Czar of Russia in 1917?",
			option: ["Nicholas II","Alexander II","Ivan IV","Peter II"],
			answer: "1"
		},
		q12: {
			question: "The islands Hokkaido, Honshu, Shikoku and Kyushu are part of which country?",
			option: ["Philippines","S. Korea","Japan","Vietnam"],
			answer: "3"
		},
		q13: {
			question: "Who is the patron saint of Australia?",
			option: ["St. Peter","Mary Help of Christians","St. Paul","St. Rock"],
			answer: "2"
		},
		q14: {
			question: "When is the Feast Day of St. John the Baptist?",
			option: ["March 19","June 24","July 19","August 15"],
			answer: "2"
		},
		q15: {
			question: "Which of the following countries is landlocked?",
			option: ["Switzerland","Italy","Spain","France"],
			answer: "1"
		},
		q16: {
			question: "In the year 1900 in the U.S. what were the most popular first names given to boy and girl babies?",
			option: ["William and Elizabeth","Joseph and Catherine","John and Mary","George and Anne"],
			answer: "3"
		},
		q17: {
			question: "When did the Liberty Bell get its name?",
			option: ["when it was made, in 1701","when it rang on July 4, 1776","in the 19th century, when it became a symbol of the abolition of slavery","none of the above"],
			answer: "3"
		},
		q18: {
			question: "In the Roy Rogers -Dale Evans Museum, you will find Roy and Dales stuffed horses. Roy's horse was named Trigger, which was Dales horse?",
			option: ["Buttermilk","Daisy","Scout","Tulip"],
			answer: "1"
		},
		q19: {
			question: "The Daniel Boon museum at the home where he died can best be described how?",
			option: ["a log cabin in Kentucky","a two-story clapboard house in Tennessee","a four-story Georgian-style home in Missouri","a three story brick house in Arkansas"],
			answer: "3"
		},
		q20: {
			question: "Which of the following items was owned by the fewest U.S. homes in 1990?",
			option: ["home computer","compact disk player","cordless phone","dishwasher"],
			answer: "2"
		},
		q21: {
			question: "Who holds the record for the most victories in a row on the professional golf tour?",
			option: ["Jack Nicklaus","Arnold Palmer","Byron Nelson","Ben Hogan"],
			answer: "3"
		},
		q22: {
			question: "Who is third behind Hank Aaron and Babe Ruth in major league career home runs?",
			option: ["Reggie Jackson","Harmon Killebrew","Willie Mays","Frank Robinson"],
			answer: "3"
		},
		q23: {
			question: "In 1990, in what percentage of U.S. married couples did the wife earn more money than the husband?",
			option: ["8%","18%","38%","58%"],
			answer: "2"
		},
		q24: {
			question: "During the 1980s for six consecutive years what breed of dog was the most popular in the U.S.?",
			option: ["cocker spaniel","German shepherd","Labrador retriever","poodle."],
			answer: "1"
		},
		q25: {
			question: "In 1985, five percent of U.S. households had telephone answering machines. By 1990 what percentage of homes had answering machines?",
			option: ["10%","15%","31%","51%"],
			answer: "3"
		},
		q26: {
			question: "Who was the first black American pictured on a U.S. postage stamp?",
			option: ["Frederick Douglass","Booker T. Washington","Louis Armstrong","Joe Louis"],
			answer: "4"
		},
		q27: {
			question: 'What did the "D" in "D-Day" stand for?',
			option: ["doom","day","Dwight D. Eisenhower","Dunkirk"],
			answer: "2"
		},
		q28: {
			question: "The Brownie Box Camera introduced by Eastman Kodak in 1900 had a retail price of what?",
			option: ["$1","$5","$10","$20"],
			answer: "1"
		},
		q29: {
			question: "Which of these characters turned 40 years old in 1990?",
			option: ["Charlie Brown","Bugs Bunny","Mickey Mouse","Fred Flintstone"],
			answer: "1"
		},
		q30: {
			question: "Where is Emperor Akbar’s tomb?",
			option: ["Delhi","Amarkot","Agra","Sikandra"],
			answer: "3"
		},
		q31: {
			question: "Who died in the Battle of Trafalgar?",
			option: ["Napoleon Bonaparte","Horatio Nelson","Francis Drake","Charles Martel"],
			answer: "2"
		},
		q32: {
			question: "To which Order did Martin Luther belong?",
			option: ["Augustinian","Dominican","Capuchin","Franciscan"],
			answer: "1"
		},
		q33: {
			question: "What is the type of Government in Swaziland?",
			option: ["Monarchy","Aristocracy","Theocracy","Anarchy"],
			answer: "1"
		},
		q34: {
			question: "Who killed US President Abraham Lincoln?",
			option: ["Lee Harvey Oswald","John Hinckley","John Wilkes Booth","Michael Schiavo"],
			answer: "3"
		},
		q35: {
			question: "Who won the Hockey World Cup in 1975?",
			option: ["India","Pakistan","Germany","Australia"],
			answer: "1"
		},
		q36: {
			question: "Which TV news channel began telecast in 1980?",
			option: ["Star News","CNN","BBC","Fox News"],
			answer: "2"
		},
		q37: {
			question: "Which of the following is not a gas?",
			option: ["Nitrogen","Oxygen","Helium","Mercury"],
			answer: "4"
		},
		q38: {
			question: "Which state was known as Mysore?",
			option: ["Kerala","Andhra Pradesh","Karnataka","Tamil Nadu"],
			answer: "3"
		}
	}