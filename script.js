(
	function (window, document){
		window.onload = function (){
			var carRace = function (canvasId){
				this.cid = canvasId;
				this.canvas = document.getElementById(canvasId);
				this.player = '';
				this.background = '';
				this.road = '';
				this.car = '';
				this.timing = '';
				//alert(this.canvas);
			}
			
			carRace.prototype =  {
				init : function (){
					this.ctx = this.canvas.getContext('2d');
					
					// event init
					// this should be into event class
					//var ev = new event(cid);
					//ev.attachEventListener(cid);
					
					// background init
					// this bg should be store into 
					var bg = new Background();
					var bgObj = {type : 'simple', name: 'bg', value : 'sprites/background2.jpg'};
					bg.init(bgObj);
					return this;
					
				},
				
				load : function (){
					//load  background
					var bg = new Background();
					bg.load(this.ctx);
				}
			};
			
			//class Background
			var Background  = function (){
				return {
					init: function (obj){
						this.type = obj.type;	
						this.name = obj.name;
						this.value = obj.value;
						//todo this shoud be dyanamic
						this.frmStX = 0;
						this.frnStY = 0;
					}, 
					
					load: function (ctx){
						
						//var imgElem  = document.createElement('img');
						var imgElem = new Image();
						
						alert(ctx);
						//var imgElems = document.getElementById("bgImage");
						imgElem.onload = function (){
							imgElem.width = 100;
							imgElem.height = 100;
							ctx.drawImage(imgElem, 0, 0, imgElem.width, imgElem.height);
						}
						alert(this);
						imgElem.src = 'sprites/background2.jpg';
						
						
						/*var c=document.getElementById("racingCan");
						var ctx=c.getContext("2d");
						var img=document.getElementById("bgImage");
						ctx.drawImage(img,0,0, 200, 300);*/
					},
				}
			 }
			 
			 //class Car
			var Car  = function (){
				return {
					init: function (obj){
						this.name = obj.name;
						this.type = obj.type;						
					}, 
					
					//here would be the code for run, stop, start
					load: function (obj){
						//this.run();
					},
					
					run : function (){
						console.log('car run');
					}
				}
			}
			
			var event = function (){
				return{
					init : function (){
						var eventObj =  {'mkeyup': 'onkeyup', 'mkeydown': 'onkeydown', 'mkeypress' : 'onkeypress' }
						events = {'mkeyup': 'onkeyup', 'mkeydown': 'onkeydown', 'mkeypress' : 'onkeypress' };
					}, 

					attachEventListener : function(cid){
						for(evt in this.events){
							document.getElementById(cid).addEventListener = (this.events[evt], this[evt]());	
						}
					}, 
					
					keydown : function (){
						alert("keydown");
					},
					
					keypress : function (){
						alert("keypress");
					}
				}	
				
			}
			
			var myCar = new carRace("racingCan");
			myCar.init(myCar.cid);
			myCar.load();
		}
	}
)(window, document);