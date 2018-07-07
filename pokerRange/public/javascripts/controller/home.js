app.controller('home', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state){

    $scope.newGame = function(){
        console.log('asdf1');
        $rootScope.startGameBool = true;
        //$rootScope.$broadcast('startGameBool');
        console.log('asdf2');
        $state.go('newGame');
        console.log('asdf3');
    }
    }]);