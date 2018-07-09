app.controller('home', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state){

    $scope.newGame = function(){
        $state.go('newGame');
    }
    }]);