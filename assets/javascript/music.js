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

//4-second sound clip played when player fails to answer question
var questionMusic = document.createElement("audio");
  	questionMusic.setAttribute("src", "./assets/audio/questionMusic.mp3");
