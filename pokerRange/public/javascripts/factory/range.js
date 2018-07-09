app.factory('range', [ 'card', 'hand', function(card, hand){

	this.holding;
	this.board;
	this.deck;

	var handType = {
		"TOPCARD" : 0,
		"PAIR" : 1,
		"TWOPAIR" : 2,
		"SET" : 3,
		"STRAIGHT" : 4,
		"FULLHOUSE" : 5,
		"FLUSH" : 6,
		"QUADS" : 7,
		"STRAIGHTFLUSH" : 8
	}

	var suitType = {
		"HEARTS" : 0,
		"SPADES" : 1,
		"DIAMONDS" : 2,
		"CLUBS" : 3
	}


	var cards = [];
	for (var i = 0; i < 13; i++) {
		cards.push(new card(suitType.HEARTS, i));
		cards.push(new card(suitType.SPADES, i));
		cards.push(new card(suitType.DIAMONDS, i));
		cards.push(new card(suitType.CLUBS, i));
	}

	var range = [];

	var preFlopRange = function(){
		var tempHand;
		//Never going to have preflop i think
		//holding = 0;

		//holding = 1;

		//holding = 2;	
	}

	var flopRange = function(){

		//holding = 0;

		//holding = 1;

		//holding = 2;
		var tempHand = holding;
		
	}

	var calcRange = function(){
		switch(board.length){
			case 0:
				preFlopRange();
				break;
			case 3:
				flopRange();
				break;
			case 4:
				turnRange();
				break;
			case 5:
				riverRange();
				break;

		}

	}

	return function(holding, board, deck){
		this.holding = holding;
		this.board = board;
		this.deck = deck;
	}
}])