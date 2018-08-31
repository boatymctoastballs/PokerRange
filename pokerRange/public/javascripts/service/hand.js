app.service('hand', ['$filter', function($filter){

	//Enum kind of
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

	//All the 5 cards
	var hand = [];

	//Type of hand e.g. pair, straight etc.
	var _handType = null;

	//The cards that make the handtype, can be different length. for instance if its only a topcard, it will include 1 card
	//and if its a straight(in order) or flush it includes the full hand. 
	this.handCards = [];

	var isStraightFlush = function(hand){
		return isFlush(hand) && isStraight(hand)
	}

	var isFlush = function(hand){
		var result = true;
		var suit = hand[0].suit;
		for (var i = 1; i < 5; i++) {
			if(hand[i].suit != suit){
				result = false;
				break;
			}	
		}
		if(result){
			this.handCards = $filter('orderBy')(hand.value);
		}
		return result;
	}

	//Fix for wheel (ACE,2,3,4,5)
	var isStraight = function(hand){
		var result = true;
		console.log("In isStraight() and about to calc sortedHand:");
		var sortedHand = $filter('orderBy')(hand.value);
		console.log(sortedHand);
		for (var i = 1; i < hand.length-1; i++) {
			if(sortedHand[i].value - sortedHand[i-1].value != 1){
				result = false;
				break;
			}	
		}
		if(result){
			this.handCards = sortedHand;
		}
		return result;
	}

	var isQuads = function(hand){
		var card1 = {value : hand[0].value, count : 1};
		var card2 = {value : 1337, count : 0};
		for (var i = 1; i < 5; i++) {
			var tempCardValue = hand[i].value;			
			if(tempCardValue == card1.value){
				card1.count++;
			}
			else if(tempCardValue == card2.value){
				card2.count++;
			}
			else if(tempCardValue != card1.value && card2.value == 1337){
				card2 = {value : tempCardValue, count : 1}
			}
			else{
				return false;
			}
        }
        //FIX FIX FIX FIX FIX FIX FIX 
		// if(card1.count==4){
		// 	this.handCards = [
		// 	new card('HEARTS', card1.value), 
		// 	new card('SPADES', card1.value),
		// 	new card('DIAMONDS', card1.value),
		// 	new card('CLUBS', card1.value)
		// 	];
		// }
		// else if(card2.count==4){
		// 	this.handCards = [
		// 	new card('HEARTS', card2.value), 
		// 	new card('SPADES', card2.value),
		// 	new card('DIAMONDS', card2.value),
		// 	new card('CLUBS', card2.value)
		// 	];
		// }
		return card1.count==4 || card2.count==4		
	}

	var isFullHouse = function(hand){
		var result = false;
		var setSuits = [];
		var setCard = null;
		var pairSuits = [];
		var pairCard = null; 
		for (var i = 0; i < 5; i++) {
			if(hand.reduce(function(n, card){
				return n + (card.value == hand[i].value);
			}, 0) == 3){
				setCard = hand[i].value;				
			}
		}
		if(setCard != null){
			for (var j = 0; j < 5; j++) {
				if(hand[j].value != setCard.value){
					if(hand.reduce(function(n, card){
						return n + (card.value == hand[j].value);
					}, 0) == 2){
						pairCard = hand[j].value;
						result = true;
					}
				}
			}
        }
        //FIX FIX FIX FIX FIX FIX "card()"
		if(result){
			for (var k = 0; k < 5; k++) {
				if(this.hand[k].value==setCard){
					this.handCards.push(new card(hand[k].suit, setCard))
				}
			}
			for (var l = 0; l < 5; l++) {	
				if(this.hand[l].value==pairCard){
					this.handCards.push(new card(hand[l].suit, pairCard))
				}				
			}
		}		
		return result;
	}

	var isPair = function(hand){
		var pairCard = null;
		var pairSuits = [];
		var result = false;
		for (var i = 0; i < 5; i++) {
			if(hand.reduce(function(n, card){
				return n + (card.value == hand[i].value);
			}, 0) == 2){
				pairCard = hand[i].value
				result = true;
			}
        }
        //FIX FIX FIX FIX "card()"
		for (var j = 0; j < 5; j++) {
			if(hand[j].value==pairCard){
				this.handCards.push(new card(hand[j].suits, pairCard));
			}
		}	
		return result;
	}

	var isSet = function(hand){
		var result = false;
		for (var i = 0; i < 5; i++) {
			if(hand.reduce(function(n, card){
				return n + (card.value == hand[i].value);
			}, 0) == 3){
				setCard = hand[i].value;
				result = true;
			}
        }
        //FIX FIX FIX FIX "card()"
		for (var j = 0; j < 5; j++) {
			if(hand[j].value==setCard){
				this.handCards.push(new card(hand[j].suits, setCard));
			}
		}	
		return result;
	}

	var isTopCard = function(hand){
		var sortedHand = $filter('orderBy')(hand.value); // index 0 lowest, index 4 highest
		this.handCards.push(sortedHand);
		return true;
	}

	var isNoHand = function(hand){
		var result = false;
		for (var i = 0; i < 5; i++) {
			if(hand[i] == null){
				result = true;
				break;
			}
		}
		return result;
	}

	var whatHand = function(hand){
        let _handType = null;
		if(hand.length!=5){
			_handType = null;
		}
		else if(isStraightFlush(hand)){
			_handType = handType.STRAIGHTFLUSH;
		}
		else if(isQuads(hand)){
			_handType = handType.QUADS;
		}
		else if(isFlush(hand)){
			_handType = handType.FLUSH;
		}
		else if(isFullHouse(hand)){
			_handType = handType.FULLHOUSE;
		}
		else if(isStraight(hand)){
			_handType = handType.STRAIGHT;
		}
		else if(isSet(hand)){
			_handType = handType.SET;
		}
		else if(isTwoPair(hand)){
			_handType = handType.TWOPAIR;
		}
		else if(isPair(hand)){
			_handType = handType.PAIR;
		}		
		else if(isTopCard(hand)){
			_handType = handType.TOPCARD;
		}
		else{
			_handType = null;
        }
        return _handType;
	}

	//Don't know how getters work for angularjs factory yet so they might be faulty
	var betterThan = function(otherHand){
		if(this._handType>otherHand.getHandType()){
			return true;
		}
		else if(this._handType<otherHand.getHandType()){
			return false;
		}
		//What if they have same topcard?
		else if(this._handType == handType.TOPCARD || this.handType == handType.PAIR || this.handType == handType.SET){
			if(this.handCards[0].value>otherHand.getHandCards()[0].value){
				return true;
			}
			else if(this.handCards[0].value<otherHand.getHandCards()[0].value){
				return false;
			}
		}
		else if(this._handType == handType.TWOPAIR){
			var highestPairOtherHand = Math.max(otherHand.getHandCards()[0].value, otherHand.getHandCards()[2].value);
			var lowestPairOtherHand = Math.min(otherHand.getHandCards()[0].value, otherHand.getHandCards()[2].value);
			var highestPair = Math.max(this.handCards[0].value, this.handCards[2].value);
			var lowestPair = Math.min(this.handCards[0].value, this.handCards[2].value);
			if(highestPair > highestPairOtherHand || (highestPair == highestPairOtherHand && lowestPair > lowestPairOtherHand)){
				return true;
			}
			else if(highestPair<highestPairOtherHand || (highestPair == highestPairOtherHand && lowestPair < lowestPairOtherHand)){
				return false;
			}

		}
		else if(this._handType == handType.STRAIGHT || this._handType == handType.FLUSH || this._handType == handType.STRAIGHTFLUSH){
			if(this.handCards[4] > otherHand.getHandCards()[4]){
				return true;
			}
			if(this.handCards[4] < otherHand.getHandCards()[4]){
				return false;
			}
		}
		else if(this._handType == handType.FULLHOUSE){	
			var setCardOtherHand = otherHand.getHandCards()[0].value;
			var pairCardOtherHand = otherHand.getHandCards()[3].value;
			var setCard = this.handCards[0].value;
			var pairCard = this.handCards[3].value;
			if(setCard > setCardOtherHand || (setCard == setCardOtherHand && pairCard > pairCardOtherHand)){
				return true;
			}
			else if(setCard < setCardOtherHand || (setCard == setCardOtherHand && pairCard < pairCardOtherHand)){
				return false;
			}
		}
		else if(this._handType == handType.QUADS){
			if(this.handCards[0] > otherHand.getHandCards()[0]){
				return true;
			}
			if(this.handCards[0] < otherHand.getHandCards()[0]){
				return false;
			}
		}
		else{
			return null;
		}
	}

	//Change ace,jack,queen,king to 14,11,12,13
	var formatHandIn = function(hand){
		let tempHand = [];
		for (var i = 0; i < hand.length; i++) {
			switch(hand[i].code.slice(0,1)){
				case 'J':
					hand[i].value = 11;
					tempHand.push(hand[i]);
				case 'Q':
					hand[i].value = 12;
					tempHand.push(hand[i]);
				case 'K':
					hand[i].value = 13;
					tempHand.push(hand[i]);
				case 'A':
					hand[i].value = 14;
					tempHand.push(hand[i]);
				default:
					tempHand.push(hand[i]);		
			}
		}
		return tempHand;
	}

	//Change 14,11,12,13 to ace,jack,queen,king
	var formatHandOut = function(hand){
		let tempHand = [];
		for (var i = 0; i < hand.length; i++) {
			switch(hand[i].value){
				case 11:
					hand[i].value = 'JACK';
					tempHand.push(hand[i]);
				case 12:
					hand[i].value = 'QUEEN';
					tempHand.push(hand[i]);
				case 13:
					hand[i].value = 'KING';
					tempHand.push(hand[i]);
				case 14:
					hand[i].value = 'ACE';
					tempHand.push(hand[i]);
				default:
					tempHand.push(hand[i]);		
			}
		}
		return tempHand;
    }   

    this.getHandType = function(handIn){
        let hand = formatHandIn(handIn);
		let handType = whatHand(hand);
		let handOut = formatHandOut(this.handCards);
        return {"handType" : handType, "handCards" : handOut};
    }

	// return function(hand){

	// 	this.hand = formatHandIn(hand);

	// 	this.getHandCards = function(){
	// 		return formatHandOut(this.handCards);
	// 	}

	// 	this.getHandType = function(){
	// 		whatHand();
	// 		return this._handType;
	// 	}

	// 	this.getHand = function(){
	// 		return formatHandOut(this.hand)
	// 	}
	// 	//returns true if hand is better than otherHand
	// 	this.betterThan = function(otherHand){
	// 		return betterThan(otherHand);
	// 	}
	// }
}]);