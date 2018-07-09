app.controller('game', ['$scope', '$rootScope', '$http', 'card', 'hand', function($scope, $rootScope, $http, card, hand){

    //https://deckofcardsapi.com/ 
      $scope.init = function(){
          $scope.startGame();  
        // $scope.deck = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51];
        // $scope.trash = [];
        // $scope.flop = [];
        // $scope.turn = "";
        // $scope.river = "";
        // $scope.enemies = [];
        // randomGame();
        // console.log($scope.board);
    }

    $scope.startGame = function(){
        $scope.board = [];
        $scope.flop = [];
        $scope.turn = {};
        $scope.river = {};
        $scope.holding = []; //2 cards
        $scope.gameCards = [];
        $http.get('https://deckofcardsapi.com/api/deck/new/')
            .then(function(res){
                $scope.deck_id = res.data.deck_id;
                $http.get('https://deckofcardsapi.com/api/deck/' + $scope.deck_id + '/shuffle/?deck_count=1')
                    .then(function(res){
                        $scope.shuffled = res.data.shuffled;
                        randomGame();
                    });
                
            });
    }


    // var handType = {
    //     "TOPCARD" : 0,
    //     "PAIR" : 1,
    //     "TWOPAIR" : 2,
    //     "SET" : 3,
    //     "STRAIGHT" : 4,
    //     "FULLHOUSE" : 5,
    //     "FLUSH" : 6,
    //     "QUADS" : 7,
    //     "STRAIGHTFLUSH" : 8
    // }
    
    // var suitType = {
    //     "HEARTS" : 0,
    //     "SPADES" : 1,
    //     "DIAMONDS" : 2,
    //     "CLUBS" : 3
    // }
    
    // var cards = [];    
    // for (var i = 1; i < 14; i++) {
    //     cards.push(new card('HEARTS', i));
    //     cards.push(new card('SPADES', i));
    //     cards.push(new card('DIAMONDS', i));
    //     cards.push(new card('CLUBS', i));
    // }
    

    

    // $scope.deck = [];
    // $scope.trash = [];
    

    
    // $scope.enemyHoldings = [];
    // $scope.holding = []; //2 cards
    
    // $scope.range = [];
    // $scope.enemyRange = [];
    
   // var calcRange = function(){
        //all possible hands - useless hands = (a pair or more)
        //all possible kombinations of hands from the 2 cards you are holding, the board and the rest of the cards in the deck:
        //2 holding + 1 boardCards + 2 dCards (flop state - 1 boardCards of 3)
        //2 holding + 2 boardCards + 1 dCards (flop or turn state - 2 boardCards of 3 or 4)
        //2 holding + 3 boardCards 			  (flop or turn or river state - 3 boardCards of 3 or 4 or 5)
        //2 holding  			   + 3 dCards (preflop)
        //
        //1 holding + 1 boardCards + 3 dCards (IMPOSSIBLE - if there are boardCards there cant be 3 more)
        //1 holding + 2 boardCards + 2 dCards (flop state - 2 boardCards of 3)
        //1 holding + 3 boardCards + 1 dCards (flop or turn state - 3 boardCards of 3 or 4)
        //1 holding + 4 boardCards			  (turn or river state - 4 boardCards of 4 or 5)
        //1 holding  			   + 4 dCards (preflop)
        //
        //0 holding + 1 boardCards + 4 dCards (IMPOSSIBLE - if there are boardCards there cant be 3 more)
        //0 holding + 2 boardCards + 3 dCards (IMPOSSIBLE - if there are boardCards there cant be 3 more)
        //0 holding + 3 boardCards + 2 dCards (flop state - 3 boardCards of 3)
        //0 holding + 4 boardCards + 1 dCards (turn state - 4 boardCards of 4)
        //0 holding + 5 boardCards + 0 dCards (river state - 5 boardCards of 5 - hand is full board)
        //0 holding  			   + 5 dCards (all combinations from deck preflop)
        //
        //all possible hands from riverBoard:
        //holding + 1 boardCards + 2dCards
        //holding + 2 boardCards + 2dCards
        //holding + 3 boardCards 
        //
    
    // }
    
    // var drawCard = function(){
    //     var deckIndex = Math.floor(Math.random()*($scope.deck.length-1)+1); // +1 ?
    //     var index = $scope.deck[deckIndex];
    //     $scope.deck.splice(deckIndex,1);	
    //     return cards[index];
    // }
    
    
    // var doFlop = function(){
        // for (var i = 0; i < 3; i++) {
        //     let card = drawCard();
        // }       
    // }
    
    //makes a hand(c1,c2,null,null,null)
    // var makeHands = function(amountOfEnemies){
    //     for (var i = 0; i<amountOfEnemies+1; i++) {

            


            // var enemy = {};
            // var tempHolding = [];
            // for(var j = 0; j<2; j++){
            //     tempHolding.push(drawCard());
            // }		
            // if(i==0){
            //     $scope.holding = tempHolding;
            // }
            // else{
            //     enemy[i] = tempHolding;
            //     $scope.enemyHoldings.push(enemy);	
            // }
            
    //     }
    // }
    
    
    // var addCardToBoard = function(){
    //     let card = drawCard();
    //     $scope.board.push(card);
    //     return card
    // }
    $scope.newCardType = '';
    $scope.newCard = function(){
        let gameType = $scope.board.length;
        switch(gameType){
            case 3:
                $http.get('https://deckofcardsapi.com/api/deck/' + $scope.deck_id + '/draw/?count=' + 1)
                .then(function(res){
                    console.log(res.data.cards);
                    $scope.gameCards.push(res.data.cards);
                    $scope.board.push(res.data.cards);
                    $scope.turn = res.data.cards;
                    $scope.newCardType = 'River';
                });
                break;
            case 4:
                $http.get('https://deckofcardsapi.com/api/deck/' + $scope.deck_id + '/draw/?count=' + 1)
                .then(function(res){
                    console.log(res.data.cards);
                    $scope.gameCards.push(res.data.cards);
                    $scope.board.push(res.data.cards);
                    $scope.river = res.data.cards;
                });
                break;  
        }
    }


    var flopGame = function(rndEnemies){
        $scope.board = $scope.gameCards.slice(0,3);
        $scope.flop = $scope.gameCards.slice(0,3);        
        $scope.holding = $scope.gameCards.slice(3,5);
        //makeHands(rndEnemies);
        // doFlop();	
    }
    
     var turnGame = function(rndEnemies){
        $scope.board = $scope.gameCards.slice(0,4);
        $scope.flop = $scope.gameCards.slice(0,3);
        $scope.turn = $scope.gameCards[3];
        $scope.holding = $scope.gameCards.slice(4,6);
    //     makeHands(rndEnemies);
    //     doFlop();
    //     $scope.turn = addCardToBoard();
     }
    
     var riverGame = function(rndEnemies){
        $scope.board = $scope.gameCards.slice(0,5);
        $scope.flop = $scope.gameCards.slice(0,3);
        $scope.turn = $scope.gameCards[3];
        $scope.river = $scope.gameCards[4];
        $scope.holding = $scope.gameCards.slice(5,7);
    //     makeHands(rndEnemies);
    //     doFlop();
    //     $scope.turn = addCardToBoard();
    //     $scope.river = addCardToBoard();
    }
    
    
    var randomGame = function(){
        var rndIndex = Math.floor((Math.random()*3));
        //var rndEnemies = Math.floor((Math.random()*3)+1);
        var rndEnemies = 0;
        let cardsToFetch = 2+(rndIndex+3)+rndEnemies*2        
        console.log("amount of cards to fetch: " + cardsToFetch);

        $http.get('https://deckofcardsapi.com/api/deck/' + $scope.deck_id + '/draw/?count=' + cardsToFetch)
        .then(function(res){
            $scope.gameCards = res.data.cards;
            switch(rndIndex){
                case 0:
                    $scope.newCardType = 'Turn';
                    flopGame(rndEnemies);
                    break;
                case 1: 
                    $scope.newCardType = 'River';
                    turnGame(rndEnemies);
                    break;
                case 2:                    
                    riverGame(rndEnemies);	
                    break;
                break;
            }
        })


        //$scope.calcRange();
        //$scope.calcEnemyRange();
        //$scope.readInput();	
    }

    }]);