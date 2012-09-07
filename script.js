(
	function (window, document){
		window.onload = function (){
			
			var carRace = function (){
				this.player = '';
				this.background = '';
				this.road = '';
				this.car = '';
				this.timing = '';
			}
			
			carRace.prototype =  {
				init : function (){
					console.log('very start init');
				},
				load : function (){
					console.log('very start load');
				}
			}
			carRace.init();
			carRace.load();
			
		
			//class Car
			var Car  = function (){
				return {
					init: function (){
						console.log('car Init');		
					}, 
					
					load: function (){
						console.log('car load');		
					},
				}
			}
			
			//class Background
			var Background  = function (){
				return {
					init: function (){
						console.log('Background Init');		
					}, 
					
					load: function (){
						console.log('Background load');		
					},
				}
			}
			
			//class Road
			var Road  = function (){
				return {
					init: function (){
						console.log('Road Init');		
					}, 
					
					load: function (){
						console.log('road load');		
					},
				}
			}
		}
	}
)(window, document);