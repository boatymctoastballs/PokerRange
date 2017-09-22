app.factory('card', function(){
	return function(suit, value){
		this.suit = suit;
		this.value = value;
	}
});