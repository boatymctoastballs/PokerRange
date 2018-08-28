app.service('addArrayService', function(){
    this.add = function(aOne, aTwo){
        let res = aOne;
        for(var i=0; i<aTwo.length; i++){
            res.push(aTwo[i]);
        }
        return res;
    }
});