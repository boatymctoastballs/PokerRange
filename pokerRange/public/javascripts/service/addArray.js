app.service('addArrayService', function(){
    this.add = function(aOne, aTwo){
        let res = aOne;
        if(Array.isArray(aTwo)){
            for(var i=0; i<aTwo.length; i++){
                res.push(aTwo[i]);
            }
        }
        else{
            res.push(aTwo);
        }
        return res;
    }
});