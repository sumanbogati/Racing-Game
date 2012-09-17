(function (window, document){
	window.onload = function (){
		var trackLength   = null; 
		 var width         = 1024;                    // logical canvas width
		var height        = 768; 
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
				
				this.bg = new Background();
				var bgObj = {type : 'simple', name: 'bg', value : 'sprites/background2.jpg'};
				this.bg.init(bgObj);
				this.rd = new Road();
				this.rd.init();
				this.load();
				
				return this;
				
			},
			
			load : function (){
				//load  background
				//0var bg = new Background();
				this.bg.load(this.ctx);
				this.rd.load(this.ctx);
			}
		};
		
		//class Background
		var Background  = function (){
			return {
				name1 : '',
				myvalue :'',
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
					//var imgElems = document.getElementById("bgImage");
					imgElem.onload = function (){
						imgElem.width = 400;
						imgElem.height = 600;
						ctx.drawImage(imgElem, 0, 0, 300, 200);
					}
					imgElem.src = this.value;
				},
			}
		 }
		 
		 
		 //class Road
		 var Road = function (){
			return {
				init : function (){
					this.segments = [];
					this.segmentLength = 200
					this.playerZ = null;
					this.cameraDepth   = null;
					 
					this.cameraHeight = 1000;
					this.roadWidth     = 2000; 
					this.position = 0;
					this.playerX = 0;
					this.trackLength = 0;
					this.rumbleLength = 0;
					this.drawDistance = 300;
					this.lanes = 3;
					this.fieldOfView = 100;
					this.COLORS = {
								  SKY:  '#72D7EE',
								  TREE: '#005108',
								  FOG:  '#005108',
								  LIGHT:  { road: '#6B6B6B', grass: '#10AA10', rumble: '#555555', lane: '#CCCCCC'  },
								  DARK:   { road: '#696969', grass: '#009A00', rumble: '#BBBBBB'                   },
								  START:  { road: 'white',   grass: 'white',   rumble: 'white'                     },
								  FINISH: { road: 'black',   grass: 'black',   rumble: 'black'                     }
								};
						
						
						this.cameraDepth = 1 / Math.tan((this.fieldOfView/2) * Math.PI/180);
						this.playerZ  = (this.cameraHeight * this.cameraDepth);
						this.resetRoad();
					}, 
				
				//this function called render into inspired game
				load : function (ctx){
					var baseSegment = this.findSegment(this.position);
					var maxy        = height;

					ctx.clearRect(0, 0, width, height);

					var n, segment;

					for(n = 0 ; n <this.drawDistance; n++) {
						segment        = this.segments[(baseSegment.index + n) % this.segments.length];
						segment.looped = segment.index < baseSegment.index;
						//segment.fog    = Util.exponentialFog(n/drawDistance, fogDensity);

						project(segment.p1, (this.playerX * this.roadWidth), this.cameraHeight, this.position - (segment.looped ? this.trackLength : 0), this.cameraDepth, width, height, this.roadWidth);
						
						project(segment.p2, (this.playerX * this.roadWidth), this.cameraHeight, this.position - (segment.looped ? this.trackLength : 0), this.cameraDepth, width, height, this.roadWidth);

						if ((segment.p1.camera.z <= this.cameraDepth) || // behind us
						(segment.p2.screen.y >= maxy))          // clip by (already rendered) segment
						continue;

						mysegment(ctx, width, this.lanes,
						segment.p1.screen.x,
						segment.p1.screen.y,
						segment.p1.screen.w,
						segment.p2.screen.x, //this is 0
						segment.p2.screen.y, //this is 0
						segment.p2.screen.w,
					//	segment.fog,
						1,
						segment.color);
						maxy = segment.p2.screen.y;
					}
				}, 
				
				resetRoad : function (){
					//=========================================================================
					// BUILD ROAD GEOMETRY
					//=========================================================================
					//var segments = [];
					 for(var n = 0 ; n < 500 ; n++) {
							this.segments.push({
							   index: n,
							   p1: { world: { z:  n   *this.segmentLength }, camera: {}, screen: {} },
							   p2: { world: { z: (n+1)*this.segmentLength }, camera: {}, screen: {} },
							   color: Math.floor(n/this.rumbleLength)%2 ? this.COLORS.DARK : this.COLORS.LIGHT
							});
					  }

					  this.segments[this.findSegment(this.playerZ).index + 2].color = this.COLORS.START;
					  this.segments[this.findSegment(this.playerZ).index + 3].color = this.COLORS.START;
					  for(var n = 0 ; n < this.rumbleLength ; n++)
					  this.segments[this.segments.length-1-n].color = this.COLORS.FINISH;

					  trackLength = this.segments.length * this.segmentLength;
				}, 
				
				findSegment  : function (z){
					return this.segments[Math.floor(z/this.segmentLength) % this.segments.length];
				}
			}	
		 }
	
	//TODO these function should be part of the object
	function project (p, cameraX, cameraY, cameraZ, cameraDepth, width, height, roadWidth) {
		p.camera.x     = (p.world.x || 0) - cameraX;
		p.camera.y     = (p.world.y || 0) - cameraY;
		p.camera.z     = (p.world.z || 0) - cameraZ;
		p.screen.scale = cameraDepth/p.camera.z;
		p.screen.x     = Math.round((width/2)  + (p.screen.scale * p.camera.x  * width/2));
		p.screen.y     = Math.round((height/2) - (p.screen.scale * p.camera.y  * height/2));
		p.screen.w     = Math.round(             (p.screen.scale * roadWidth   * width/2));
	}

	function polygon(ctx, x1, y1, x2, y2, x3, y3, x4, y4, color) {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.lineTo(x3, y3);
		ctx.lineTo(x4, y4);
		ctx.closePath();
		ctx.fill();
	}

	//---------------------------------------------------------------------------
	
	function rumbleWidth     (projectedRoadWidth, lanes) { return projectedRoadWidth/Math.max(6,  2*lanes); 
	}
  
	 function laneMarkerWidth(projectedRoadWidth, lanes) { return projectedRoadWidth/Math.max(32, 8*lanes); }
  
	function mysegment(ctx, width, lanes, x1, y1, w1, x2, y2, w2, fog, color) {
		var r1 = rumbleWidth(w1, lanes),
		r2 = rumbleWidth(w2, lanes),
		l1 = laneMarkerWidth(w1, lanes),
		l2 = laneMarkerWidth(w2, lanes),
		lanew1, lanew2, lanex1, lanex2, lane;

		ctx.fillStyle = color.grass;
		ctx.fillRect(0, y2, width, y1 - y2);

		polygon(ctx, x1-w1-r1, y1, x1-w1, y1, x2-w2, y2, x2-w2-r2, y2, color.rumble);
		polygon(ctx, x1+w1+r1, y1, x1+w1, y1, x2+w2, y2, x2+w2+r2, y2, color.rumble);
		polygon(ctx, x1-w1,    y1, x1+w1, y1, x2+w2, y2, x2-w2,    y2, color.road);

		if (color.lane) {
			lanew1 = w1*2/lanes;
			lanew2 = w2*2/lanes;
			lanex1 = x1 - w1 + lanew1;
			lanex2 = x2 - w2 + lanew2;
			for(lane = 1 ; lane < lanes ; lanex1 += lanew1, lanex2 += lanew2, lane++)
				polygon(ctx, lanex1 - l1/2, y1, lanex1 + l1/2, y1, lanex2 + l2/2, y2, lanex2 - l2/2, y2, color.lane);
		}

		//  Render.fog(ctx, 0, y1, width, y2-y1, fog);
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
		
		//class Event
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
	}
})(window, document);