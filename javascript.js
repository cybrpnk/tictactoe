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
//note: even though the code for this function is actually about 8 lines, it is
//wayyy more complicated than it looks, and to fully understand what's happening
//here, I suggest you view it in an infographic/flowchart perspective
function contains(needle, haystack){
	//set a default for haystack as winningSet
	haystack = typeof haystack !== 'undefined' ? haystack : winningSet;
	
	//create array to store user's progress towards sets
	//number represents how many squares of a given set the user has filled
	var progress = [
		/*0*/ [],
		/*1*/ [],
		/*2*/ [],
		/*3*/ []
	];
	//loop through your potential moves dataset
	for(var i = 0; i < haystack.length; i++){
		//create variable to mark the number of times the set of moves is seen
		//in the user moves array (default is 0)
		var occurrences = 0;
	
		//loop through the user's moves array
		//at this stage, we've successfully isolated one array (from the winningSets)
		//and one value from the player's move list. We then scan the array to see if it
		//contains the value, and if it does, we mark it in our count, towards that
		//set. This method is highly inefficient, and may prove to be unusable on 
		//older computers, however, frequent large amounts of loops, done at a fast pace,
		//is easy for modern computers that have operating systems doing exponentially
		//more sophisticated computations
		for(var j = 0; j < needle.length; j++){
			//check if array contains a value, if so add one to occurrences
			if($.inArray(needle[j], haystack[i]) != -1) occurrences++;
		}
		
		//console.log([haystack[i], occurrences]);
		
		//check how many occurrences of the player's moves were in the given set
		//and mark the given set in the corresponding progress array
		progress[occurrences].push(haystack[i]);
	}
	
	//for debugging purposes, log the progress array
	console.log(progress);
	
	//return the progress array at the end of the function
	return progress;
}

//variable to store game state
var gameover = false;

//create variable to lock user interaction
var lock = false;

//write the function that detects a win
function endgame(draw){
	//see if the user array contains any winning sets
	if(contains(userMoves)[3].length != 0){
		gameover = true;
		$("h1").text("Game over.");
		$("h2").text("Human wins!");
	}
	//see if the ai array contains any winning sets
	if(contains(aiMoves)[3] != 0){
		gameover = true;
		$("h1").text("Game over.");
		$("h2").text("Computer wins!");
	}
	//if the game has reached move 9, and no player has won, a draw is called
	if(draw){
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
	//choose random location
	var move = random(1,3) + "-" + random(1,3);
	
	//for debugging purposes, we are printing all the ui
	//move attempts into the consol
	console.log(move);
	
	//check if the move has been played or not
	while($.inArray(move, gameMoves) > -1){
		//if so, generate another random move and repeat
		move = randMove();
		console.log(move);
	}
	return move;
}

//create toolbox function to play the game's move
function playMove(player, move){
	//check if the player is the human
	if(player == 1){
		//insert an X into the board
		//the selctor used is selecting the button with the
		//space value that the computer selected
		$(".button[data-space=" + move + "]").text("X");
		
		//note into user move array which move has been made
		userMoves.push(move);
	}

	//check if the player is the AI
	if(player == 2){
		//insert O onto board
		//the selctor used is selecting the button with the
		//space value that the computer selected
		$(".button[data-space=" + move + "]").text("O");

		//note into ai move array which move has been made
		aiMoves.push(move);
	}
	
	//note move into game moves array
	gameMoves.push(move);
		
	//for debugging purposes, JS will print the move list into the console
	//(cmd + option + j)
	console.log(gameMoves);
	
	//call function endgame to check if the game is won
	endgame();
}

//The AI engine
function intelligence(){
	//if 9 moves have been made and the game is not over, call a draw
	if(gameMoves.length == 9 && !gameover) endgame(true);
	
	//check to make sure the game is not over
	if(!gameover){
	
		//A switch statement is exactly like an if..else statement, just written differently
		switch(level){
			case 0:
				//NOVICE
			
				//find a random move on the board and play it
				playMove(2, randMove());
			
				break;
			case 1:
				//INTERMEDIATE
				
				
			
				break;
			case 2:
				//EXPERT
				alert("bitches");
			
				break;
			default:
				alert("*Somehow* you broke the universe.");
		}
		
		//unlock user interaction once the computer has made its move
		lock = false;
		
	}
}

//when a button is clicked, call anonymous function
$(".button").mouseup(function(){
	//disable the ability to change the difficulty mode once the game has begun
	$("input[name=level").attr("disabled", true)

	//get user's move
	var move = $(this).attr("data-space");
	
	//if this move hasnt been played yet
	if($.inArray(move, gameMoves) == -1 && !gameover && !lock){
		
		playMove(1, move);
		
		//lock user interaction
		lock = true;
		
		//With a delay of half a second (500ms), call the AI engine
		setTimeout(intelligence, 500);
	}
})