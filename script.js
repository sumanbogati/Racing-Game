/***
	This is simple racing game 
	is created by Suman Bogati. 
	The game inspired from https://github.com/jakesgordon/javascript-racer/
	Copyright 2012-2013;
	Any enquary please contact at sumanbogati@gmail.com 
**/

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
			this.sprites = null;
			
			return this;
		}
		
		carRace.prototype =  {
			init : function (){
				this.ctx = this.canvas.getContext('2d');
				
				this.fps = 60;
				this.step = 1/this.fps;
				
				
				// event init
				// this should be into event class
				//var ev = new event(cid);
				//ev.attachEventListener(cid);
				
				// background init
				// this bg should be store into 
				
				// this could be into other place or into other way
				var tImgElm = new Image();
					tImgElm.src = 'sprites/sprites.png';
					
				this.sprites = tImgElm;
				
				this.bg = new Background();
				var bgObj = {type : 'simple', name: 'bg', value : 'sprites/background5.jpg'};
				this.bg.init(bgObj);
				
				this.rd = new Road(this);
				this.rd.init();
		//		this.rd.resetRoad();
				
				//car init
				this.car = new Car(this);
				this.car.init();
				
				this.load();
				
				
				//this is to be splitted in relative calss
				this.SPRITES = {
				  CAR01:                  { x: 1205, y: 1018, w:   80, h:   56 },
				  PLAYER_STRAIGHT:        { x: 1085, y:  480, w:   80, h:   41 },
				};
				
				
				this.SPRITES.SCALE = 0.3 * (1/this.SPRITES.PLAYER_STRAIGHT.w); // the reference sprite width should be 1/3rd the (half-)roadWidth
				
				//this is to be splitted in relative calss
				this.SPRITES.CARS = [this.SPRITES.CAR01];
				return this;
			},
			
			load : function (){
				// this need to be done becuase 
				// there should be loaded first background images
				// and should be done other jobs eg:- load road, car
				this.bg.load(this, function (cthis){
					//alert("hey guys what is up");
					cthis.rd.load(cthis.ctx);
					cthis.car.load(cthis.ctx);
				});
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
				
				load: function (cthis, callback){
					var ctx = cthis.ctx;
				
					//var imgElems = document.getElementById("bgImage");
					var imgaLoaded = function (mthis){
						callback(mthis);
					}
					
					//var imgElem  = document.createElement('img');
					var imgElem = new Image();
					
					imgElem.onload = function (){
						ctx.drawImage(imgElem, 0, 0, 1050, 500);
						imgaLoaded(cthis);
					}
					imgElem.src = this.value;
				},
			}
		 }
		 
		 
		 //class Road
		 var Road = function (cthis){
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
								  LIGHT:  { road: '#6B6B6B', grass: '#5E7542', rumble: '#555555', lane: '#CCCCCC'  },
								  DARK:   { road: '#696969', grass: '#009A00', rumble: '#BBBBBB'                   },
								  START:  { road: 'white',   grass: 'white',   rumble: 'white'                     },
								  FINISH: { road: 'black',   grass: 'black',   rumble: 'black'                     }
								};
						
						
						this.cameraDepth = 1 / Math.tan((this.fieldOfView/2) * Math.PI/180);
						this.playerZ  = (this.cameraHeight * this.cameraDepth);
						this.reset(cthis);
					}, 
				
				//this function called render into inspired game
				load : function (ctx){
					var baseSegment = this.findSegment(this.position);
					var maxy        = height;

					//ctx.clearRect(0, 0, width, height);

					var n, segment;

					for(n = 0 ; n <this.drawDistance; n++) {
						segment        = this.segments[(baseSegment.index + n) % this.segments.length];
						segment.looped = segment.index < baseSegment.index;
						//segment.fog    = Util.exponentialFog(n/drawDistance, fogDensity);

						this.structure().project(segment.p1, (this.playerX * this.roadWidth), this.cameraHeight, this.position - (segment.looped ? this.trackLength : 0), this.cameraDepth, cthis.canvas.width, cthis.canvas.height, this.roadWidth);
						
						this.structure().project(segment.p2, (this.playerX * this.roadWidth), this.cameraHeight, this.position - (segment.looped ? this.trackLength : 0), this.cameraDepth, cthis.canvas.width, cthis.canvas.height, this.roadWidth);

						if ((segment.p1.camera.z <= this.cameraDepth) || // behind us
						(segment.p2.screen.y >= maxy))          // clip by (already rendered) segment
						continue;

						this.dispSegment(ctx, cthis.canvas.width, this.lanes,
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
				
				reset : function (cthis){
					  //this should be dyanamic
					  cthis.canvas.width = 1024;
					  cthis.canvas.height = 768;
					  
					  
					/*  options       = options || {};
					  cthis.canvas.width  = width  = Util.toInt(options.width,          width);
					  cthis.canvas.height = height = Util.toInt(options.height,         height);
					  lanes                  = Util.toInt(options.lanes,          lanes);
					  roadWidth              = Util.toInt(options.roadWidth,      roadWidth);
					  cameraHeight           = Util.toInt(options.cameraHeight,   cameraHeight);
					  drawDistance           = Util.toInt(options.drawDistance,   drawDistance);
					  fogDensity             = Util.toInt(options.fogDensity,     fogDensity);
					  fieldOfView            = Util.toInt(options.fieldOfView,    fieldOfView);
					  segmentLength          = Util.toInt(options.segmentLength,  segmentLength);
					  rumbleLength           = Util.toInt(options.rumbleLength,   rumbleLength);
					  cameraDepth            = 1 / Math.tan((fieldOfView/2) * Math.PI/180);
					  playerZ                = (cameraHeight * cameraDepth);
					  resolution             = height/480;
					  refreshTweakUI();
					  //console.log('rumble Length ' + rumbleLength);	
					  if ((segments.length==0) || (options.segmentLength) || (options.rumbleLength))
					  resetRoad(); */// only rebuild road when necessary
					  
					  this.resetRoad();
					  
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
				},
				
				dispSegment : function (ctx, width, lanes, x1, y1, w1, x2, y2, w2, fog, color) {
					var r1 = this.structure().rumbleWidth(w1, lanes),
					r2 = this.structure().rumbleWidth(w2, lanes),
					l1 = this.structure().laneMarkerWidth(w1, lanes),
					l2 = this.structure().laneMarkerWidth(w2, lanes),
					lanew1, lanew2, lanex1, lanex2, lane;

					ctx.fillStyle = color.grass;
					ctx.fillRect(0, y2, width, y1 - y2);
					
					this.structure().polygon(ctx, x1-w1-r1, y1, x1-w1, y1, x2-w2, y2, x2-w2-r2, y2, color.rumble);
					this.structure().polygon(ctx, x1+w1+r1, y1, x1+w1, y1, x2+w2, y2, x2+w2+r2, y2, color.rumble);
					this.structure().polygon(ctx, x1-w1,    y1, x1+w1, y1, x2+w2, y2, x2-w2,    y2, color.road);

					if (color.lane) {
						lanew1 = w1*2/lanes;
						lanew2 = w2*2/lanes;
						lanex1 = x1 - w1 + lanew1;
						lanex2 = x2 - w2 + lanew2;
						for(lane = 1 ; lane < lanes ; lanex1 += lanew1, lanex2 += lanew2, lane++)
							this.structure().polygon(ctx, lanex1 - l1/2, y1, lanex1 + l1/2, y1, lanex2 + l2/2, y2, lanex2 - l2/2, y2, color.lane);
					}

					//  Render.fog(ctx, 0, y1, width, y2-y1, fog);
				}, 
				
				structure : function (){
					return {
						project : function (p, cameraX, cameraY, cameraZ, cameraDepth, width, height, roadWidth) {
							p.camera.x     = (p.world.x || 0) - cameraX;
							p.camera.y     = (p.world.y || 0) - cameraY;
							p.camera.z     = (p.world.z || 0) - cameraZ;
							p.screen.scale = cameraDepth/p.camera.z;
							p.screen.x     = Math.round((width/2)  + (p.screen.scale * p.camera.x  * width/2));
							p.screen.y     = Math.round((height/2) - (p.screen.scale * p.camera.y  * height/2));
							p.screen.w     = Math.round((p.screen.scale * roadWidth   * width/2));
						}, 
						
						 polygon : function (ctx, x1, y1, x2, y2, x3, y3, x4, y4, color) {
							ctx.fillStyle = color;
							ctx.beginPath();
							ctx.moveTo(x1, y1);
							ctx.lineTo(x2, y2);
							ctx.lineTo(x3, y3);
							ctx.lineTo(x4, y4);
							ctx.closePath();
							ctx.fill();
						},
						
						rumbleWidth : function (projectedRoadWidth, lanes) { 
							return projectedRoadWidth/Math.max(6,  2*lanes); 
						},
						
						
						laneMarkerWidth :  function (projectedRoadWidth, lanes) { 
							return projectedRoadWidth/Math.max(32, 8*lanes); 
						}
					};
				}
			}	
		 }
	
	//---------------------------------------------------------------------------
	
		//class Car
		var Car  = function (cthis){
			return {
				init: function (){
				//	this.name = obj.name;
				//	this.type = obj.type;
					
					this.destX = width/2;
					this.destY = height;
					this.resolution = 1.6;
					this.scale = cthis.rd.cameraDepth/cthis.rd.playerZ;
					this.maxSpeed  = cthis.rd.segmentLength/cthis.step;

					this.speed = 0;
					this.speedPercent = this.speed/this.maxSpeed;
					
					this.keyLeft = false;
					this.keyRight = false;
					this.steer =  this.speed * (this.keyLeft ? -1 : this.keyRight ? 1 : 0);
					this.updown = 0;
					this.accel = this.maxSpeed/5;
					this.breaking = -this.maxSpeed;
					this.decel = -this.maxSpeed/5;
					
					this.offRoadDecel  = -this.maxSpeed/2;             // off road deceleration is somewhere in between
					this.offRoadLimit  =  this.maxSpeed/4;   

					
					//attaching event handler 
					var keyObj = new Keys();
						keyObj.init();
					 
				}, 
				
				//here would be the code for run, stop, start
				//here is the load instasd player
				load: function (){
						
						var bounce = (1.5 * Math.random() * this.speedPercent * this.resolution) * this.mechanism().randomChoice([-1,1]);
						
						var sprite;
						if (this.steer < 0)
						  sprite = (this.updown > 0) ? cthis.SPRITES.PLAYER_UPHILL_LEFT : cthis.SPRITES.PLAYER_LEFT;
						else if (this.steer > 0)
						  sprite = (this.updown > 0) ? cthis.SPRITES.PLAYER_UPHILL_RIGHT : cthis.SPRITES.PLAYER_RIGHT;
						else
						  sprite = (this.updown > 0) ? cthis.SPRITES.PLAYER_UPHILL_STRAIGHT : cthis.SPRITES.PLAYER_STRAIGHT;
						//console.log('bounce ' + bounce);
						this.destY = this.destY + bounce;
						this.sprite(sprite, -0.5, -1);
				},
				
				sprite: function(sprite, offsetX, offsetY, clipY) {
					//  scale for projection AND relative to roadWidth (for tweakUI)
					var destW  = (sprite.w * this.scale * width/2) * (cthis.SPRITES.SCALE * cthis.rd.roadWidth);
					var destH  = (sprite.h * this.scale * width/2) * (cthis.SPRITES.SCALE * cthis.rd.roadWidth);

					this.destX = this.destX + (destW * (offsetX || 0));
					this.destY = this.destY + (destH * (offsetY || 0));
					
					//console.log('destY ' + this.destY);
					//console.log('destH ' + destH);
					//console.log('offsetY ' + offsetY);	
					var clipH = clipY ? Math.max(0, this.destY+destH-clipY) : 0;
					if (clipH < destH)
						
					  //TODO this should be dynamic
					  //this.destY = 610.56;
						
					 // alert(cthis.sprites);
					cthis.ctx.drawImage(cthis.sprites, sprite.x, sprite.y, sprite.w, sprite.h - (sprite.h*clipH/destH), this.destX, this.destY, destW, destH - clipH);
				}, 
				
				run : function (){
					//Game.setKeyListener(options.keys);
					return {
						init : function (options){
							//var canvas = options.canvas,    // canvas render target is provided by caller
							this.update = options.update,    // method to update game logic is provided by caller
							this.render = options.render,    // method to render the game is provided by caller
							this.step   = options.step,      // fixed frame step (1/fps) is specified by caller
							this.stats  = options.stats,     // stats instance is provided by caller
							this.now    = null,
							this.last   = this.mechanism().timestamp(),
							this.dt     = 0,
							this.gdt    = 0;
						},

						frame : function () {
							this.now = this.mechanism().timestamp();
							this.dt  = Math.min(1, (this.now - this.last) / 1000); // using requestAnimationFrame have to be able to handle large delta's caused when it 'hibernates' in a background or non-visible tab
							this.gdt = this.gdt + this.dt;
							while (this.gdt > this.step) {
							  this.gdt = this.gdt - this.step;
								this.update();
							}
							
							//load is instead of render
							cthis.rd.load();
							this.last = this.now;
							//	requestAnimationFrame(frame, canvas);
						},
					
						 update : function () {
							 var dt = this.step;
							  position = this.mechanism().increase(position, dt * this.speed, cthis.rd.trackLength);

							  var dx = dt * 2 * (this.speed/this.maxSpeed); // at top speed, should be able to cross from left to right (-1 to 1) in 1 second

							  if (keyLeft)
								playerX = playerX - dx;
							  else if (keyRight)
								playerX = playerX + dx;

							  if (keyFaster)
								this.speed = this.mechanism().accelerate(this.speed, this.accel, dt);
							  else if (keySlower)
								this.speed = this.mechanism().accelerate(this.speed, this.breaking, dt);
							  else
								this.speed = this.mechanism().accelerate(this.speed, this.decel, dt);

							  if (((playerX < -1) || (playerX > 1)) && (this.speed > offRoadLimit))
								this.speed = this.mechanism().accelerate(this.speed, offRoadDecel, dt);

							  playerX = this.mechanism().limit(playerX, -2, 2);     // dont ever let player go too far out of bounds
							  this.speed   = this.mechanism().limit(this.speed, 0, this.maxSpeed); // or exceed maxSpeed
						}
					}	
					//console.log('car run');
				},
				
				mechanism : function (){
					return {
						randomChoice : function (options){
							return options[this.randomInt(0, options.length-1)]; 
						},
						
						randomInt : function (min, max) {
							return Math.round(this.interpolate(min, max, Math.random()));   
						},
						
						interpolate : function  (a,b,percent) {
							return a + (b-a)*percent;
						},
						
						timestamp: function(){ 
							return new Date().getTime();
						},
						
						increase:  function(start, increment, max) { // with looping
							var result = start + increment;
							while (result >= max)
							  result -= max;
							while (result < 0)
							  result += max;
							return result;
						  },
						  
						 accelerate: function(v, accel, dt) { 
							return v + (accel * dt); 
						 }, 
						 
						 limit: function(value, min, max)   { 
							return Math.max(min, Math.min(value, max)); 
						},
					}
				}
			};
		}
		
		//class Event
		var event = function (){
			return{
				attachEventListener : function(elemId, kthis){
					//alert(kthis.events);
					for(evt in kthis.events){
					  //  console.log("hello guys what is up");
						//document.getElementById(elemId).addEventListener = (evt, kthis.events[evt]());
					//	alert(kthis.events[evt]);	
					//	alert(kthis);
						//debugger;
						var tfunc = kthis.events[evt];
						var func = kthis[tfunc];
						//the name should be dyanamic
						document.getElementById("bdRcGame").addEventListener(evt, eval(func));
					}
				}, 
			}	
		}
		
		var Keys = function (){
			return {
				init : function (){
					this.events = {'keydown' : 'down', 'keypress' : 'press', 'keyup' : 'up'};
					event().attachEventListener("bdRcGame", this);
					
					this.keyCodes =  {	  left:  37,
										  up:    38,
										  right: 39,
										  down:  40,
									};
					
				}, 
				
				down : function (ev){
					debugger;
					for(keyProp in  this.keyCodes){
						console.log(this.keyCodes[keyProp]);
						if(this.keyCodes[keyProp] == ev.keyCode){
							alert("the game begins now");	
						}
					}
				},
				
				up : function (){
					alert("hello up");
				}, 
				
				press : function (ev){
					for(keyProp in  this.keyCodes){
						console.log(this.keyCodes[keyProp]);
						if(this.keyCodes[keyProp] == ev.keyCode){
							alert("the game begins now");	
						}
					}
				},
			};
		}
		
	
		var myCar = new carRace("racingCan");
		myCar.init(myCar.cid);
	}
})(window, document);