app.controller('home', ['$scope', function($scope){

    $scope.newGame = function(){
        $state.go('newGame');
    }
    }]);