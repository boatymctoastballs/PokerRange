app.directive("handListItem", function($compile) {
		return {			
			scope: {
      			hand: '=hand'
    		},    		
			template: '<li class="list-group-item-{{hand.color}}">{{hand.type}}</li>'
		};
	});