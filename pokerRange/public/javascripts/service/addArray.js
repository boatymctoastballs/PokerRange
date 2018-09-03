app.service('addArrayService', function(){
    this.add = function(){
        var res = [];
        for (i = 0; i < arguments.length; i++) {            
            let arg = arguments[i];
            console.log(arg);
            if(arg.isArray()){
                for(var j=0; j<arg.length; j++){
                    res.push(arg[j]);
                }                
            }
            else{
                res.push(arg);
            }
        }
        console.log(res.toString());
        return res;
    }
});