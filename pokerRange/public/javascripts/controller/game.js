app.controller('game', ['$scope', '$rootScope', '$http', 'card', 'hand', 'addArrayService', '$document', function($scope, $rootScope, $http, card, hand, addArrayService, $document){
    //https://deckofcardsapi.com/ 
      $scope.init = function(){
        $scope.keyEventReady = false;
        $scope.colorContainer = []; 
        $scope.keys = [{'src': 'A_T.png', 'desc' : 'Straight Flush'}, {'src': 'S_T.png', 'desc' : 'Four Of A Kind'},
        {'src': 'D_T.png', 'desc' : 'Boat'}, {'src': 'F_T.png', 'desc' : 'Flush'},
        {'src': 'G_T.png', 'desc' : 'Straight'}, {'src': 'H_T.png', 'desc' : 'Set'},
        {'src': 'J_T.png', 'desc' : 'Two Pair'}, {'src': 'K_T.png', 'desc' : 'Pair'}];
        $scope.startGame();
        $scope.keyEventReady = true;          
    }

    $scope.startGame = function(){
        $scope.hands = [{'type' : 'STRAIGHTFLUSH', 'color' : 'secondary'}, {'type' :'FOUR OF A KIND', 'color' : 'secondary'},
        {'type' : 'BOAT', 'color' : 'secondary'}, {'type' : 'FLUSH', 'color' : 'secondary'},
        {'type' : 'STRAIGHT', 'color' : 'secondary'}, {'type' : 'SET', 'color' : 'secondary'},
        {'type' : 'TWOPAIR', 'color' : 'secondary'}, {'type' : 'PAIR', 'color' : 'secondary'}];

        $scope.potentialHands = {'STRAIGHTFLUSH' : false, 'FOUROFAKIND' : false, 
        'BOAT' : false, 'FLUSH' : false,'STRAIGHT' : false, 'SET' : false,'TWOPAIR' : false, 'PAIR' : false};        
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

    var potHands = function(hand){
        switch(hand.handType){
            case 0:
                break;
            case 1:
                $scope.potentialHands.PAIR = true;
                break;
            case 2:
                $scope.potentialHands.TWOPAIR = true;
                break;
            case 3:
                $scope.potentialHands.SET = true;
                break;
            case 4:
                $scope.potentialHands.STRAIGHT = true;
                break;
            case 5:
                $scope.potentialHands.FLUSH = true;
                break;
            case 6:
                $scope.potentialHands.BOAT = true;
                break;
            case 7:
                $scope.potentialHands.FOUROFAKIND = true;
                break;
            case 8:
                $scope.potentialHands.STRAIGHTFLUSH = true;
                break;
            default: 
                break;             
        }        
    }

    var identifyHand = function(hand){
        //Use service hand to identify hand. 
    }

    $document.bind('keydown', function (e) {
     $scope.keyEvent (e.keyCode)
    });

    $scope.keyEvent = function(keyCode){        
        //if($scope.keyEventReady){
            console.log($scope.hands);
            console.log(keyCode);
            switch(keyCode){ 
                case 65:
                    if($scope.potentialHands.STRAIGHTFLUSH){
                        $scope.hands[0].color = 'success';
                    }
                    else{                        
                        $scope.hands[0].color = 'danger';
                    }
                    console.log("a");
                    break;
                case 83:                    
                    if($scope.potentialHands.FOUROFAKIND){
                        $scope.hands[1].color = 'success';
                    }
                    else{
                        $scope.hands[1].color = 'danger';
                    }                    
                    console.log("s");
                    break;    
                case 68:
                    if($scope.potentialHands.BOAT){
                        $scope.hands[2].color = 'success';
                    }
                    else{
                        $scope.hands[2].color = 'danger';
                    }                    
                    console.log("d");
                    break;
                case 70:
                    if($scope.potentialHands.FLUSH){
                        $scope.hands[3].color = 'success';
                    }
                    else{
                        $scope.hands[3].color = 'danger';
                    }                    
                    console.log("f");
                    break;
                case 71:
                    if($scope.potentialHands.STRAIGHT){
                        $scope.hands[4].color = 'success';
                    }
                    else{
                        $scope.hands[4].color = 'danger';
                    }                    
                    console.log("g");
                    break;
                case 72:
                    if($scope.potentialHands.SET){
                        $scope.hands[5].color = 'success';
                    }
                    else{
                        $scope.hands[5].color = 'danger';
                    }                    
                    console.log("h");
                    break;
                case 74:
                    if($scope.potentialHands.TWOPAIR){
                        $scope.hands[6].color = 'success';
                    }
                    else{
                        $scope.hands[6].color = 'danger';
                    }
                    break;
                    console.log("j");
                case 75:
                    if($scope.potentialHands.PAIR){
                        $scope.hands[7].color = 'success';
                    }
                    else{
                        $scope.hands[7].color = 'danger';
                    }                    
                    console.log("k");
                    break;
                default:
                    break;
            }
            console.log($scope.hands[0].color, $scope.hands[1].color, $scope.hands[2].color,$scope.hands[3].color, $scope.hands[4].color, $scope.hands[5].color, $scope.hands[6].color, $scope.hands[7].color);
        //}
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
                        let addedArray;
                        potHands(createdHand);
                        console.log("createdHand: " + createdHand.handType.toString());
                        allHands.push(addedArray); 
                    }
                }                


                //Take 1 from deck------------------
                for(var a = 0 ; a < $scope.deck.length; a++){
                    //Take 2 from board
                    let twoOfBoard = Combinatorics.combination($scope.board, 2);
                    while(b = twoOfBoard.next()){
                        //Take 2 from holding
                        let twoOfHolding = Combinatorics.combination($scope.holding, 2)
                        while(c = twoOfHolding.next()){
                            //1 deck + 2 board + 2 holding
                            let addedArray = addArrayService.add($scope.deck[a],b,c);  
                            let createdHand = hand.getHandType(addedArray);
                            console.log("createdHand:" + createdHand.handType.toString());
                            potHands(createdHand);
                            allHands.push(addedArray); 
                        }
                    }

                    //Take 3 from board
                    let threeOfBoard = Combinatorics.combination($scope.board, 3);
                    while(b = threeOfBoard.next()){
                        //Take 1 from holding
                        for(var c = 0 ; c < $scope.holding.length; c++){
                            //1 deck + 3 board + 1 holding
                            let addedArray = addArrayService.add($scope.deck[a],b, $scope.holding[c]);  
                            let createdHand = hand.getHandType(addedArray);
                            potHands(createdHand);
                            console.log("createdHand:" + createdHand.handType.toString());
                            allHands.push(addedArray); 
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
                        let addedArray = addArrayService.add(a,b);  
                        let createdHand = hand.getHandType(addedArray);
                        potHands(createdHand);
                        console.log("createdHand:" + createdHand.handType.toString());
                        allHands.push(addedArray);              
                    } 

                    //Take 2 from board
                    let twoOfBoard = Combinatorics.combination($scope.board, 2);                
                    while(b = twoOfBoard.next()){
                        //Take 1 from holding    
                        for(var c = 0 ; c < $scope.holding.length; c++){
                            //2 deck + 2 board + 1 holding
                            let addedArray = addArrayService.add(a,b,$scope.holding[c]);  
                            let createdHand = hand.getHandType(addedArray);
                            potHands(createdHand);
                            console.log("createdHand:" + createdHand.handType.toString());
                            allHands.push(addedArray); 
                        }
                    }

                    //Take 1 from board
                    for(var b = 0 ; b < $scope.board.length; b++){
                        //Take 2 from holding                        
                        let oneOfHolding = Combinatorics.combination($scope.holding, 2);
                        while(c = oneOfHolding.next()){
                            //2 deck + 1 board + 2 holding
                            let addedArray = addArrayService.add(a,$scope.board[b],c);  
                            let createdHand = hand.getHandType(addedArray);
                            potHands(createdHand);
                            console.log("createdHand:" + createdHand.handType.toString());
                            allHands.push(addedArray); 
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
                        let addedArray = addArrayService.add(a,b);  
                        let createdHand = hand.getHandType(addedArray);
                        potHands(createdHand);
                        allHands.push(addedArray); 
                        console.log("createdHand:" + createdHand.handType.toString());
                    }
                }  

                //Take 4 of board
                let fourOfBoard = Combinatorics.combination($scope.board, 4);
                while(a = fourOfBoard.next()){
                    //Take 1 of holding
                    for(var b = 0 ; b < $scope.holding.length; b++){
                        //4 board + 1 holding
                        let addedArray = addArrayService.add(a,$scope.holding[b]);  
                        let createdHand = hand.getHandType(addedArray);
                        potHands(createdHand);
                        allHands.push(addedArray);
                        console.log("createdHand:" + createdHand.handType.toString()); 
                    }
                }  

                //Take 1 of deck
                for(var a = 0 ; a < $scope.deck.length; a++){
                    //Take 4 of board
                    let fourOfBoard = Combinatorics.combination($scope.board, 4)
                    while(b = fourOfBoard.next()){
                        //1 deck + 4 board
                        let addedArray = addArrayService.add($scope.deck[a],b);  
                        let createdHand = hand.getHandType(addedArray);
                        console.log("createdHand:" + createdHand.handType.toString());
                        potHands(createdHand);
                        allHands.push(addedArray);                        
                    }

                    //Take 3 of board
                    let threeOfBoard = Combinatorics.combination($scope.board, 3)
                    while(b = threeOfBoard.next()){
                        //Take 1 of holding
                        for(var c = 0 ; c < $scope.holding.length; c++){
                            //1 deck + 3 board + 1 holding                            
                            let addedArray = addArrayService.add($scope.deck[a],b,$scope.holding[c]);  
                            let createdHand = hand.getHandType(addedArray);
                            console.log("createdHand:" + createdHand.handType.toString());
                            potHands(createdHand);
                            allHands.push(addedArray);                             
                        }                    
                    }

                    //Take 2 of board
                    let twoOfBoard = Combinatorics.combination($scope.board, 2)
                    while(b = twoOfBoard.next()){
                        //Take 2 of holding
                        let twoOfHolding = Combinatorics.combination($scope.holding, 2)
                        while(c = twoOfHolding.next()){
                            //1 deck + 2 board + 2 holding
                            let addedArray = addArrayService.add($scope.deck[a],b,c);  
                            let createdHand = hand.getHandType(addedArray);
                            console.log("createdHand:" + createdHand.handType.toString());
                            potHands(createdHand);
                            allHands.push(addedArray);                             
                        }                        
                    }
                }             
            }

            if(gameType == 'River'){
                console.log("IN RIVER GAME")
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
                    for(var i = 0 ; i < $scope.holding.length; i++){                                           
                        let addedArray = addArrayService.add(a,$scope.holding[i]);  
                        let createdHand = hand.getHandType(addedArray);    
                        console.log("createdHand:" + createdHand.handType.toString());
                        potHands(createdHand);
                        //4 board + 1 holding
                        allHands.push(addedArray);
                    }
                }


                //Take 3 of board
                let threeOfBoard = Combinatorics.combination($scope.board, 3);
                while(a = threeOfBoard.next()){
                    //Take 2 of holding
                    let twoOfHolding = Combinatorics.combination($scope.holding, 2)
                    while(b = twoOfHolding.next()){                        
                        let addedArray = addArrayService.add(a,b);                        
                        let createdHand = hand.getHandType(addedArray);    
                        console.log("createdHand:" + createdHand.handType.toString());
                        potHands(createdHand);
                        //3 board + 2 holding
                        allHands.push(addedArray);
                    }
                }
            }

            console.log(allHands.length);
            console.log($scope.potentialHands);
            $scope.allHands = allHands;       
    }
 
    //Adds new card to board - turn or river.
    $scope.newCard = function(){
        let gameType = $scope.board.length;
        let newCardPos = $scope.remaining-1;
        let newCard = $scope.deck[newCardPos];
        $scope.remaining = newCardPos;
        $scope.gameCards.push(newCard);
        $scope.board.push(newCard);
        //$scope.potentialHands = {'STRAIGHTFLUSH' : false, 'FOUROFAKIND' : false, 
        //'BOAT' : false, 'FLUSH' : false,'STRAIGHT' : false, 'SET' : false,'TWOPAIR' : false, 'PAIR' : false};

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
        $scope.newCardType = 'Turn';
        $scope.board = $scope.gameCards.slice(0,3);
        $scope.flop = $scope.gameCards.slice(0,3);        
        $scope.holding = $scope.gameCards.slice(3,5);
        findRange('Flop');
        //makeHands(rndEnemies);
        // doFlop();	
    }
    
     var turnGame = function(rndEnemies){
        $scope.newCardType = 'River';
        $scope.board = $scope.gameCards.slice(0,4);
        $scope.flop = $scope.gameCards.slice(0,3);
        $scope.turn = $scope.gameCards[3];
        $scope.holding = $scope.gameCards.slice(4,6);
        $scope.potentialHands = {'STRAIGHTFLUSH' : false, 'FOUROFAKIND' : false, 
        'BOAT' : false, 'FLUSH' : false,'STRAIGHT' : false, 'SET' : false,'TWOPAIR' : false, 'PAIR' : false};
        findRange('Turn');
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

        findRange('River'); 
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
                turnGame(rndEnemies);                
                break;
            case 1:                 
                turnGame(rndEnemies);                
                break;
            case 2:                    
                riverGame(rndEnemies);                
                break;
            break;
        }   
    }

}]);