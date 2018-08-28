app.controller('game', ['$scope', '$rootScope', '$http', 'card', 'hand', 'addArrayService', function($scope, $rootScope, $http, card, hand, addArrayService){

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
        $scope.deck = [];
        $scope.gameCards = [];
        $scope.remaining = 0;  
        $http.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(function(res){
                $scope.deck_id = res.data.deck_id;  
                $http.get('https://deckofcardsapi.com/api/deck/' + $scope.deck_id + '/draw/?count=52')
                .then(function(res){
                    $scope.deck = res.data.cards;
                    randomGame();                
                });  
            });
    }        

    var identifyHand = function(hand){
        //Use service hand to identify hand. 
    }


    //Call identifyHand on each combination to filter out useless hands from $scope.allHands.
    var findRange = function(gameType){           
            $scope.allHands = [];
            let allHands = [];
            let deck = $scope.deck.slice(0,$scope.remaining);
            
            if(gameType == 'Flop'){

                 //IN FLOP-, TURN-, RIVE GAME
                //Take 2 from holding 
                //Take 3 from board
                //3 board + 2 holding



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



                //IN FLOP GAME
                //Take 0 from holding 
                //Take 3 from board
                //Take 2 from deck
                //2 deck + 3 board

                //IN FLOP GAME
                //Take 1 from holding 
                //Take 2 from board
                //Take 2 from deck
                //2 deck + 2 board + 1 holding

                //IN FLOP GAME
                //Take 2 from holding 
                //Take 1 from board
                //Take 2 from deck
                //2 deck + 1 board + 2 holding

               

                //Take 0 from deck------------------
                //Take 3 of board
                let threeOfBoard = Combinatorics.combination($scope.board, 3);
                while(a = threeOfBoard.next()){
                    //Take 2 of holding
                    let twoOfHolding = Combinatorics.combination($scope.holding, 2)
                    while(b = twoOfHolding.next()){
                        //3 board + 2 holding
                        let tempHand = a + b;
                        let createdHand = hand.getHandType(tempHand);                        
                        console.log("Flop game 3 board 2 holding: ")
                        console.log(createdHand);
                        allHands.push(tempHand);
                    }
                }                


                //Take 1 from deck------------------
                let oneOfDeck = Combinatorics.combination(deck, 1);
                while(a=oneOfDeck.next()){
                    //Take 2 from board
                    let twoOfBoard = Combinatorics.combination($scope.board, 2);
                    while(b = twoOfBoard.next()){
                        //Take 2 from holding
                        let twoOfHolding = Combinatorics.combination($scope.holding, 2)
                        while(c = twoOfHolding.next()){
                            //1 deck + 2 board + 2 holding
                            allHands.push(a + b + c);
                        }
                    }

                    //Take 3 from board
                    let threeOfBoard = Combinatorics.combination($scope.board, 3);
                    while(b = threeOfBoard.next()){
                        //Take 1 from holding
                        let oneOfHolding = Combinatorics.combination($scope.holding, 1)
                        while(c = oneOfHolding.next()){
                            //1 deck + 3 board + 1 holding
                            allHands.push(a + b + c);
                        }
                    }    
                }

                
                //Take 2 from deck--------------------
                let twoOfDeck = Combinatorics.bigCombination(deck, 2);            
                while(a = twoOfDeck.next()){
                    //Take 3 from board
                    let threeOfBoard = Combinatorics.combination($scope.board, 3);
                    while(b = threeOfBoard.next()){
                        //Take 0 from holding
                        //2 deck + 3 board
                        allHands.push(b + a);              
                    } 

                    //Take 2 from board
                    let twoOfBoard = Combinatorics.combination($scope.board, 2);                
                    while(b = twoOfBoard.next()){
                        //Take 1 from holding                        
                        let oneOfHolding = Combinatorics.combination($scope.holding, 1);
                        while(c = oneOfHolding.next()){
                            //2 deck + 2 board + 1 holding
                            allHands.push(c + b + a);
                        }
                    }

                    //Take 1 from board
                    let oneOfBoard = Combinatorics.combination($scope.board, 1);                
                    while(b = oneOfBoard.next()){
                        //Take 2 from holding                        
                        let oneOfHolding = Combinatorics.combination($scope.holding, 2);
                        while(c = oneOfHolding.next()){
                            //2 deck + 1 board + 2 holding
                            allHands.push(c + b + a);
                        }
                    }  
                }
            }
            else if(gameType == 'Turn'){

                //IN FLOP-, TURN-, RIVER GAME
                //Take 2 from holding
                //Take 3 from board
                //3 board + 2 holding

                //IN TURN-, RIVER GAME
                //Take 1 from holding 
                //Take 4 from board
                //Take 0 from deck
                //4 board + 1 holding


                //IN TURN GAME
                //Take 0 from holding 
                //Take 4 from board
                //Take 1 from deck
                //1 deck + 4 board

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

                
                //Take 0 from deck------------------
                //Take 3 of board
                let threeOfBoard = Combinatorics.combination($scope.board, 3);
                while(a = threeOfBoard.next()){
                    //Take 2 of holding
                    let twoOfHolding = Combinatorics.combination($scope.holding, 2)
                    while(b = twoOfHolding.next()){
                        //3 board + 2 holding
                        allHands.push(a + b);
                    }
                }  

                //Take 4 of board
                let fourOfBoard = Combinatorics.combination($scope.board, 4);
                while(a = fourOfBoard.next()){
                    //Take 1 of holding
                    let oneOfHolding = Combinatorics.combination($scope.holding, 1)
                    while(b = oneOfHolding.next()){
                        //4 board + 1 holding
                        allHands.push(a + b);
                    }
                }  

                //Take 1 of deck
                let oneOfDeck = Combinatorics.combination(deck, 1);
                while(a = oneOfDeck.next()){
                    //Take 4 of board
                    let fourOfBoard = Combinatorics.combination($scope.board, 4)
                    while(b = fourOfBoard.next()){
                        //1 deck + 4 board
                        allHands.push(a + b);
                    }

                    //Take 3 of board
                    let threeOfBoard = Combinatorics.combination($scope.board, 3)
                    while(b = threeOfBoard.next()){
                        //Take 1 of holding
                        let oneOfHolding = Combinatorics.combination($scope.holding, 1)
                        while(c = oneOfHolding.next()){
                            //1 deck + 3 board + 1 holding
                            allHands.push(a + b + c);
                        }                        
                    }

                    //Take 2 of board
                    let twoOfBoard = Combinatorics.combination($scope.board, 2)
                    while(b = twoOfBoard.next()){
                        //Take 2 of holding
                        let twoOfHolding = Combinatorics.combination($scope.holding, 2)
                        while(c = twoOfHolding.next()){
                            //1 deck + 2 board + 2 holding
                            allHands.push(a + b + c);
                        }                        
                    }
                }                 
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


                //Take 5 of board
                allHands.push($scope.board);

                //Take 4 of board
                let fourOfBoard = Combinatorics.combination($scope.board, 4);
                while(a = fourOfBoard.next()){                    
                    //Take 1 of holding
                    let oneOfHolding = Combinatorics.combination($scope.holding, 1)
                    while(b = oneOfHolding.next()){
                        console.log($scope.board)
                        console.log($scope.holding)
                        console.log(a);
                        console.log(b);
                        console.log(addArrayService.add(a,b));
                        //4 board + 1 holding
                        allHands.push(a + b);
                        let test = a+b;
                    }
                }


                //Take 3 of board
                let threeOfBoard = Combinatorics.combination($scope.board, 3);
                while(a = threeOfBoard.next()){
                    //Take 2 of holding
                    let twoOfHolding = Combinatorics.combination($scope.holding, 2)
                    while(b = twoOfHolding.next()){
                        //3 board + 2 holding
                        allHands.push(a + b);
                    }
                }
            }

            console.log(allHands.length);
            console.log(allHands);
            $scope.allHands = allHands;       
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
 
    //Adds new card to board - turn or river.
    $scope.newCard = function(){
        let gameType = $scope.board.length;
        let newCardPos = $scope.remaining-1;
        let newCard = $scope.deck[newCardPos];
        $scope.remaining = newCardPos;
        $scope.gameCards.push(newCard);
        $scope.board.push(newCard);

        if(gameType==3){               
            $scope.turn = newCard;
            $scope.newCardType = 'River';                
            findRange('Turn');
        }
        else if(gameType==4){            
            $scope.river = newCard;
            findRange('River');
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
        $scope.remaining = 52-cardsToFetch;
        $scope.gameCards = $scope.deck.slice($scope.remaining)
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
    }

}]);