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
        $scope.hands = ['STRAIGHT', 'FLUSH', 'POO'];
        $scope.board = [];
        $scope.flop = [];
        $scope.turn = {};
        $scope.river = {};
        $scope.newCardType = '';
        $scope.holding = []; //2 cards
        $scope.gameCards = [];
        $scope.remaining = 0;  
        $http.get('https://deckofcardsapi.com/api/deck/new/')
            .then(function(res){
                $scope.deck_id = res.data.deck_id;
                $http.get('https://deckofcardsapi.com/api/deck/' + $scope.deck_id + '/shuffle/?deck_count=1')
                    .then(function(res){                        
                        randomGame();
                    });
                
            });
    }

    var identifyHand = function(hand){
        //Use service hand to identify hand. 
    }


    //Call identifyHand on each combination to filter out useless hands from $scope.allHands.
    var findRange = function(gameType){
        $http.get('https://deckofcardsapi.com/api/deck/' + $scope.deck_id + '/draw/?count=' + $scope.remaining) 
            .then(function(res){
            console.log(res.data.cards);
            $scope.allHands = [];
            let allHands = [];
            let deck = res.data.cards;
            
            if(gameType=='Flop'){

                //IN FLOP GAME
                //Take 0 from holding 
                //Take 3 from board
                //Take 2 from deck
                //2 deck + 3 board


                //IN FLOP-, TURN GAME
                //Take 1 from holding 
                //Take 3 from board
                //Take 1 from deck
                //1 deck + 3 board + 1 holding

                //IN FLOP GAME
                //Take 1 from holding 
                //Take 2 from board
                //Take 2 from deck
                //2 deck + 2 board + 1 holding

                //IN FLOP-, TURN-, RIVE GAME
                //Take 2 from holding 
                //Take 3 from board
                //3 board + 2 holding

                //IN FLOP-, TURN GAME
                //Take 2 from holding 
                //Take 2 from board
                //Take 1 from deck
                //1 deck + 2 board + 2 holding

                //IN FLOP GAME
                //Take 2 from holding 
                //Take 1 from board
                //Take 2 from deck
                //2 deck + 1 board + 2 holding



                //Take 2 from deck
                let twoOfDeck = Combinatorics.bigCombination(deck, 2);            
                while(a = twoOfDeck.next()){
                    //Take 3 from board
                    let threeOfBoard = Combinatorics.combination($scope.board, 3);                
                    while(b = threeOfBoard.next()){
                        //Take 0 from holding
                        //2 deck + 3 board
                        allHands.push(b + a)                    
                    } 

                    //Take 2 from board
                    let twoOfBoard = Combinatorics.combination($scope.board, 2);                
                    while(b = twoOfBoard.next()){
                        //Take 1 from holding
                        //2 deck + 2 board + 1 holding
                        let oneOfHolding = Combinatorics.combination($scope.holding, 1);
                        while(c = oneOfHolding.next()){
                            allHands.push(c + b + a)
                        }
                    }

                    //Take 1 from board
                    let oneOfBoard = Combinatorics.combination($scope.board, 1);                
                    while(b = oneOfBoard.next()){
                        //Take 2 from holding
                        //2 deck + 1 board + 2 holding
                        let oneOfHolding = Combinatorics.combination($scope.holding, 2);
                        while(c = oneOfHolding.next()){
                            allHands.push(c + b + a)
                        }
                    }  
                } 
            }
            else if(gameType=='Turn'){
                //IN TURN GAME
                //Take 0 from holding 
                //Take 4 from board
                //Take 1 from deck
                //1 deck + 4 board

                //IN TURN-, RIVER GAME
                //Take 1 from holding 
                //Take 4 from board
                //Take 0 from deck
                //1 holding + 4 board

                //IN FLOP-, TURN GAME
                //Take 1 from holding
                //Take 3 from board
                //Take 1 from deck
                //1 deck + 3 board + 1 holding

                //IN FLOP-, TURN GAME
                //Take 2 from holding
                //Take 2 from board
                //Take 1 from deck
                //1 deck + 2 board + 2 holding

                //IN FLOP-, TURN-, RIVER GAME
                //Take 2 from holding
                //Take 3 from board
                //3 board + 2 holding
            }

            if(gameType == 'River'){
                //IN RIVER GAME
                //Take 0 from holding
                //Take 5 from board
                //5 board

                //IN TURN-, RIVER GAME
                //Take 1 from holding
                //take 4 from board
                //4 board + 1 holding

                //IN FLOP-, TURN-, RIVER GAME
                //Take 2 from holding
                //Take 3 from board
                //3 board + 2 holding
            }

            console.log(allHands.length);
            console.log(allHands);
            $scope.allHands = allHands;
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
 
    
    $scope.newCard = function(){
        let gameType = $scope.board.length;

        if(gameType==3){
            $http.get('https://deckofcardsapi.com/api/deck/' + $scope.deck_id + '/draw/?count=' + 1)
            .then(function(res){
                $scope.remaining = res.data.remaining;
                console.log(res.data.cards);
                $scope.gameCards.push(res.data.cards[0]);
                $scope.board.push(res.data.cards[0]);
                $scope.turn = res.data.cards[0];
                $scope.newCardType = 'River';
                
                findRange('Turn');

            });
        }
        else if(gameType==4){
            $http.get('https://deckofcardsapi.com/api/deck/' + $scope.deck_id + '/draw/?count=' + 1)
            .then(function(res){
                $scope.remaining = res.data.remaining;
                console.log(res.data.cards);
                $scope.gameCards.push(res.data.cards[0]);
                $scope.board.push(res.data.cards[0]);
                $scope.river = res.data.cards[0];

                findRange('River');
            });
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
            $scope.remaining = res.data.remaining;
            console.log(res.data.cards);
            $scope.gameCards = res.data.cards;
            switch(rndIndex){
                case 0:
                    $scope.newCardType = 'Turn';
                    flopGame(rndEnemies);
                    findRange('Flop');
                    break;
                case 1: 
                    $scope.newCardType = 'River';
                    turnGame(rndEnemies);
                    findRange();
                    findRange('Turn');
                    break;
                case 2:                    
                    riverGame(rndEnemies);
                    findRange('River');	
                    break;
                break;
            }            
        })
    }
}]);