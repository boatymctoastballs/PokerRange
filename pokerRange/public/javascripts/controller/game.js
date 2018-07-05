app.controller('game', ['$scope', 'card', 'hand', function($scope, card, hand){

    // $scope.cards = [
    // {0:"h1"}, {1:"h2"}, {2:"h3"}, {3:"h4"}, {4:"h5"}, {5:"h6"}, {6:"h7"}, {7:"h8"}, {8:"h9"}, {9:"h10"}, {10:"h11"}, {11:"h12"}, {12:"h13"},
    // {13:"s1"}, {14:"s2"}, {15:"s3"}, {16:"s4"}, {17:"s5"}, {18:"s6"}, {19:"s7"}, {20:"s8"}, {21:"s9"}, {22:"s10"}, {23:"s11"}, {24:"s12"}, {25:"s13"},
    // {26:"c1"}, {27:"c2"}, {28:"c3"}, {29:"c4"}, {30:"c5"}, {31:"c6"}, {32:"c7"}, {33:"c8"}, {34:"c9"}, {35:"c10"}, {36:"c11"}, {37:"c12"}, {38:"c13"},
    // {39:"d1"}, {40:"d2"}, {41:"d3"}, {42:"d4"}, {43:"d5"}, {44:"d6"}, {45:"d7"}, {46:"d8"}, {47: "d9"}, {48:"d10"}, {49:"d11"}, {50:"d12"}, {51:"d13"}
    // ];
    
    //creating deck:
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
    
    $scope.deck = [];
    $scope.trash = [];
    
    $scope.board = [];
    $scope.turn = "";
    $scope.river = "";
    
    $scope.enemyHoldings = [];
    $scope.holding = []; //2 cards
    
    $scope.range = [];
    $scope.enemyRange = [];
    
    var calcRange = function(){
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
    
    }
    
    var drawCard = function(){
        var deckIndex = Math.floor(Math.random()*($scope.deck.length-1)+1);
        var index = $scope.deck[deckIndex];
        $scope.deck.splice(deckIndex,1);	
        return cards[index];
    }
    
    
    var doFlop = function(){
        for (var i = 0; i < 3; i++) {
        var index = Math.floor(Math.random()*($scope.deck.length-1)+1);
        $scope.board.push(cards[index]);
        $scope.deck.splice(index,1);
        }
    }
    
    //makes a hand(c1,c2,null,null,null)
    var makeHands = function(amountOfEnemies){
        for (var i = 0; i<amountOfEnemies+1; i++) {
            var enemy = {};
            var tempHolding = [];
            for(var j = 0; j<2; j++){
                tempHolding.push(drawCard());
            }		
            if(i==0){
                $scope.holding = tempHolding;
            }
            else{
                enemy[i] = tempHolding;
                $scope.enemyHoldings.push(enemy);	
            }
            
        }
    }
    
    
    var addCardToBoard = function(){
        $scope.board.push(drawCard());
    }
    
    
    var flopGame = function(rndEnemies){
        makeHands(rndEnemies);
        doFlop();	
    }
    
    var turnGame = function(rndEnemies){
        makeHands(rndEnemies);
        doFlop();
        addCardToBoard();
    }
    
    var riverGame = function(rndEnemies){
        makeHands(rndEnemies);
        doFlop();
        addCardToBoard();
        addCardToBoard();
    }
    
    
    var randomGame = function(){
        var rndIndex = Math.floor((Math.random()*3)+1);
        var rndEnemies = Math.floor((Math.random()*3)+1);
        switch(rndIndex){
            case 0:
                flopGame(rndEnemies);
                break;
            case 1: 
                turnGame(rndEnemies);
                break;
            case 2:
                riverGame(rndEnemies);	
                break;
            break;
        }
        //$scope.calcRange();
        //$scope.calcEnemyRange();
        //$scope.readInput();	
    }
    
    $scope.newGame = function(){
        $scope.deck = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51];
        $scope.trash = [];
        $scope.flop = [];
        $scope.turn = "";
        $scope.river = "";
        $scope.enemies = [];
        randomGame();
        console.log($scope.board);
    }
    }]);