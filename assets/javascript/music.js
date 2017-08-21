//JS file of various songs and sound effects from the real show
//Downloaded from https://www.mezgrman.de/wwm-sounds

//17-second song played during introduction before player clicks start
var introSong = document.createElement("audio");
  	introSong.setAttribute("src", "./assets/audio/intro.mp3");

//30-second song played during game results before player clicks start
var outroSong = document.createElement("audio");
  	outroSong.setAttribute("src", "./assets/audio/outro.mp3");

//3-second sound clip played during pause after question is answered and answer is revealed
var answerPauseMusic = document.createElement("audio");
  	answerPauseMusic.setAttribute("src", "./assets/audio/answerPause.mp3");

//3-second sound clip played when player answers question correctly
var correctSong = document.createElement("audio");
  	correctSong.setAttribute("src", "./assets/audio/correct.mp3");

//1-second sound clip played when player gets question wrong
var wrongSong = document.createElement("audio");
  	wrongSong.setAttribute("src", "./assets/audio/incorrect.mp3");

//4-second sound clip played when player fails to answer question
var noResponseSong = document.createElement("audio");
  	noResponseSong.setAttribute("src", "./assets/audio/noResponse.mp3");

//Background music that repeatedly plays during the questions for phase 1
var questionMusic1 = document.createElement("audio");
  	questionMusic1.setAttribute("src", "./assets/audio/questionMusic1.mp3");

//Background music that repeatedly plays during the questions for phase 1
var questionMusic2 = document.createElement("audio");
  	questionMusic2.setAttribute("src", "./assets/audio/questionMusic2.mp3");

//Background music that repeatedly plays during the questions for phase 1
var questionMusic3 = document.createElement("audio");
  	questionMusic3.setAttribute("src", "./assets/audio/questionMusic3.mp3");

//Background music that repeatedly plays during the questions for phase 1
var questionMusic4 = document.createElement("audio");
  	questionMusic4.setAttribute("src", "./assets/audio/questionMusic4.mp3");

//Intermission music between question 3 and 4 as you move from phase 1 to 2
var phaseUpMusic1 = document.createElement("audio");
  	phaseUpMusic1.setAttribute("src", "./assets/audio/levelUp1.mp3");

//Intermission music between question 6 and 7 as you move from phase 2 to 3
var phaseUpMusic2 = document.createElement("audio");
  	phaseUpMusic2.setAttribute("src", "./assets/audio/levelUp2.mp3");