//JAVASCRIPT FILE
//LOCATION: javascript.js


//Create an array that we will dynamically record the user's moves into
var userMoves = [];
//Same for the AI's moves
var aiMoves = [];
//and a last one for all the moves in the game
var gameMoves = [];

//create logic to detect if a player has won
var winningSet = [
	["1-1", "1-2", "1-3"],
	["2-1", "2-2", "2-3"],
	["3-1", "3-2", "3-3"],
	["1-1", "2-1", "3-1"],
	["1-2", "2-2", "3-2"],
	["1-3", "2-3", "3-3"],
	["1-1", "2-2", "3-3"],
	["3-1", "2-2", "1-3"]
];

//write toolboox function to check if array contains set of values
function containsAll(needles, haystack){
	for(var i = 0 , len = needles.length; i < len; i++){
		if($.inArray(needles[i], haystack) == -1) return false;
	}
	return true;
}

//variable to store game state
var gameover = false;

//create variable to lock user interaction
var lock = false;

//write the function that detects a win
function endgame(){
	//Loop through winning set arrays
	for(var j = 0; j < winningSet.length; j++){
		//see if the user array contains any winning sets
		if(containsAll(winningSet[j], userMoves)){
			gameover = true;
			$("h1").text("Game over.");
			$("h2").text("Human wins!");
		}
		//see if the ai array contains any winning sets
		if(containsAll(winningSet[j], aiMoves)){
			gameover = true;
			$("h1").text("Game over.");
			$("h2").text("Computer wins!");
		}
	}
	//if the game has reached move 9, and no players have one, a draw is called
	if(gameMoves.length == 9){
		gameover = true;
		$("h1").text("Game over.");
		$("h2").text("It's a draw!");
	}
	
	//if the game is over, disable the board
	if(gameover) $(".button").css({"opacity": 0.5, "cursor": "auto"});
}

//create variable to store difficulty level
//its easier for me to verbally explain whats going on here so ask me
var level = Number($("input:radio[name=level]:checked").val());
//and a method to change it when the input is changed
$("input[name=level]").change(function(){
	level = Number($("input:radio[name=level]:checked").val());
})

//create function to generate random numbers between range
function random(min, max) {
	var number = Math.floor(Math.random() * (max + 1 - min)) + min;
	//return the number as a string
	return number.toString();
}
//create function to generate random moves
function randMove(){
	return random(1,3) + "-" + random(1,3);
}

//The AI engine
function intelligence(){
	//A switch statement is exactly like an if..else statement, just written differently
	switch(level){
		case 0:
			//NOVICE
			//check to make sure the game is not over
			if(!gameover){
				//choose random location
				var move = randMove();
				//for debugging purposes, we are printing all the ui
				//move attempts into the consol
				console.log(move);
				//check if the move has been played or not
				while($.inArray(move, gameMoves) > -1){
					//if so, generate another random move and repeat
					move = randMove();
					console.log(move);
				}
				var finalMove = move;
				//once a valid move has been found, play it
				
				//insert O onto board
				//the selctor used is selecting the button with the
				//space value that the computer selected
				$(".button[data-space=" + finalMove + "]").text("O");
	
				//note into ai move array which move has been made
				aiMoves.push(finalMove);
				//and game move array
				gameMoves.push(finalMove);
						
				//for debugging purposes, JS will print the move list into the console
				//(cmd + option + j)
				console.log(gameMoves);
			}
			
			break;
		case 1:
			//INTERMEDIATE
			alert("bitches");
			
			break;
		case 2:
			//EXPERT
			alert("bitches");
			
			break;
		default:
			alert("*Somehow* you broke the universe.");
	}
	//call function endgame to check if the game is won
	endgame();
	//unlock user interaction once the computer has made its move
	lock = false;
}

//when a button is clicked, call anonymous function
$(".button").mouseup(function(){
	//disable the ability to change the difficulty mode once the game has begun
	$("input[name=level").attr("disabled", true)

	//get user's move
	var move = $(this).attr("data-space");
	
	//if this move hasnt been played yet
	if($.inArray(move, gameMoves) == -1 && !gameover && !lock){
		//insert an X into this button
		$(this).text("X");
		
		//note into user move array which move has been made
		userMoves.push(move);
		//and game move array
		gameMoves.push(move);
		
		//for debugging purposes, JS will print the move list into the console
		//(cmd + option + j)
		console.log(gameMoves);
		
		//call function endgame to check if the game is won
		endgame();
		
		//lock user interaction
		lock = true;
		
		//With a delay of half a second (500ms), call the AI engine
		setTimeout(intelligence, 500);
	}
})