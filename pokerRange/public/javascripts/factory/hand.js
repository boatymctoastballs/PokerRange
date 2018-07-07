app.factory('hand', ['card', '$filter', function(card, $filter){

// how recude works:
	// people = [
 //    {name: 'Mary', gender: 'girl'},
 //    {name: 'Paul', gender: 'boy'},
 //    {name: 'John', gender: 'boy'},
 //    {name: 'Lisa', gender: 'girl'},
 //    {name: 'Bill', gender: 'boy'},
 //    {name: 'Maklatura', gender: 'girl'}
	// ]

	// var numBoys = people.reduce(function (n, person) {
	//     return n + (person.gender == 'boy');
	// }, 0);

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
	var handCards = [];

	var isStraightFlush = function(){
		return isFlush() && isStraight()
	}

	var isFlush = function(){
		var result = true;
		var suit = this.hand[0].suit;
		for (var i = 1; i < 5; i++) {
			if(this.hand[i].suit != suit){
				result = false;
				break;
			}	
		}
		if(result){
			this.handCards = $filter('orderBy')(this.hand.value);
		}
		return result;
	}

	var isStraight = function(){
		var result = true;
		var sortedHand = $filter('orderBy')(this.hand.value);
		for (var i = 1; i < 5; i++) {
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

	var isQuads = function(){
		var card1 = {value : this.hand[0].value, count : 1};
		var card2 = {value : 1337, count : 0};
		for (var i = 1; i < 5; i++) {
			var tempCardValue = this.hand[i].value;			
			if(tempCardValue == card1.value){
				card1.count++;
			}
			else if(tempCardValue == card2.value){
				card2.count++;
			}
			else if(tempCardValue != card1.value && card2 == {}){
				card2 = {value : tempCardValue, count : 1}
			}
			else{
				return false;
			}
		}
		if(card1.count==4){
			this.handCards = [
			new card(suitType.HEARTS, card1.value), 
			new card(suitType.SPADES, card1.value),
			new card(suitType.DIAMONDS, card1.value),
			new card(suitType.CLUBS, card1.value)
			];
		}
		else if(card2.count==4){
			this.handCards = [
			new card(suitType.HEARTS, card2.value), 
			new card(suitType.SPADES, card2.value),
			new card(suitType.DIAMONDS, card2.value),
			new card(suitType.CLUBS, card2.value)
			];
		}
		return card1.count==4 || card2.count==4		
	}

	var isFullHouse = function(){
		var result = false;
		var setSuits = [];
		var setCard = null;
		var pairSuits = [];
		var pairCard = null; 
		for (var i = 0; i < 5; i++) {
			if(this.hand.reduce(function(n, card){
				return n + (card.value == this.hand[i].value);
			}, 0) == 3){
				setCard = this.hand[i].value;				
			}
		}
		if(setCard != null){
			for (var j = 0; j < 5; j++) {
				if(this.hand[j].value != setCard.value){
					if(this.hand.reduce(function(n, card){
						return n + (card.value == this.hand[j].value);
					}, 0) == 2){
						pairCard = this.hand[j].value;
						result = true;
					}
				}
			}
		}
		if(result){
			for (var k = 0; k < 5; k++) {
				if(this.hand[k].value==setCard){
					this.handCards.push(new card(this.hand[k].suit, setCard))
				}
			}
			for (var l = 0; l < 5; l++) {	
				if(this.hand[l].value==pairCard){
					this.handCards.push(new card(this.hand[l].suit, pairCard))
				}				
			}
		}		
		return result;
	}

	var isPair = function(){
		var pairCard = null;
		var pairSuits = [];
		var result = false;
		for (var i = 0; i < 5; i++) {
			if(this.hand.reduce(function(n, card){
				return n + (card.value == this.hand[i].value);
			}, 0) == 2){
				pairCard = this.hand[i].value
				result = true;
			}
		}
		for (var j = 0; j < 5; j++) {
			if(this.hand[j].value==pairCard){
				this.handCards.push(new card(this.hand[j].suits, pairCard));
			}
		}	
		return result;
	}

	var isSet = function(){
		var result = false;
		for (var i = 0; i < 5; i++) {
			if(this.hand.reduce(function(n, card){
				return n + (card.value == this.hand[i].value);
			}, 0) == 3){
				setCard = this.hand[i].value;
				result = true;
			}
		}
		for (var j = 0; j < 5; j++) {
			if(this.hand[j].value==setCard){
				this.handCards.push(new card(this.hand[j].suits, setCard));
			}
		}	
		return result;
	}

	var isTopCard = function(){
		var sortedHand = $filter('orderBy')(this.hand.value); // index 0 lowest, index 4 highest
		this.handCards.push(sortedHand);
		return true;
	}

	var isNoHand = function(){
		var result = false;
		for (var i = 0; i < 5; i++) {
			if(this.hand[i] == null){
				result = true;
				break;
			}
		}
		return result;
	}

	var whatHand = function(){
		if(this.hand.length!=5){
			_handType = null;
		}
		else if(isStraightFlush){
			_handType = handType.STRAIGHTFLUSH;
		}
		else if(isQuads){
			_handType = handType.QUADS;
		}
		else if(isFlush){
			_handType = handType.FLUSH;
		}
		else if(isFullHouse){
			_handType = handType.FULLHOUSE;
		}
		else if(isStraight){
			_handType = handType.STRAIGHT;
		}
		else if(isSet){
			_handType = handType.SET;
		}
		else if(isTwoPair){
			_handType = handType.TWOPAIR;
		}
		else if(isPair){
			_handType = handType.PAIR;
		}		
		else if(isTopCard){
			_handType = handType.TOPCARD;
		}
		else{
			_handType = null;
		}
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

	return function(hand){
		this.hand = hand;

		this.getHandCards = function(){
			return this.handCards;
		}

		this.getHandType = function(){
			whatHand();
			return this._handType;
		}

		this.getHand = function(){
			return this.hand;
		}
		//returns true if hand is better than otherHand
		this.betterThan = function(otherHand){
			return betterThan(otherHand);
		}
	}
}]);