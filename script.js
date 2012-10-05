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
					 
				}, 
				
				//here would be the code for run, stop, start
				//here is the load instasd player
				load: function (){
						console.log('speedPercent ' + this.speedPercent);
						console.log('this.resolution ' + this.resolution);
						console.log('randomChoice ' + randomChoice([-1,1]));
						
						var bounce = (1.5 * Math.random() * this.speedPercent * this.resolution) * randomChoice([-1,1]);
						
						var sprite;
						if (this.steer < 0)
						  sprite = (this.updown > 0) ? SPRITES.PLAYER_UPHILL_LEFT : SPRITES.PLAYER_LEFT;
						else if (this.steer > 0)
						  sprite = (this.updown > 0) ? SPRITES.PLAYER_UPHILL_RIGHT : SPRITES.PLAYER_RIGHT;
						else
						  sprite = (this.updown > 0) ? SPRITES.PLAYER_UPHILL_STRAIGHT : SPRITES.PLAYER_STRAIGHT;
						//console.log('bounce ' + bounce);
						this.destY = this.destY + bounce;
						this.sprite(sprite, -0.5, -1);
				},
				
				sprite: function(sprite, offsetX, offsetY, clipY) {
					//  scale for projection AND relative to roadWidth (for tweakUI)
					var destW  = (sprite.w * this.scale * width/2) * (SPRITES.SCALE * cthis.rd.roadWidth);
					var destH  = (sprite.h * this.scale * width/2) * (SPRITES.SCALE * cthis.rd.roadWidth);

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
					//console.log('car run');
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
	
//TODO
//this need to be done into CLASS	
  var SPRITES = {
  PALM_TREE:              { x:    5, y:    5, w:  215, h:  540 },
  BILLBOARD08:            { x:  230, y:    5, w:  385, h:  265 },
  TREE1:                  { x:  625, y:    5, w:  360, h:  360 },
  DEAD_TREE1:             { x:    5, y:  555, w:  135, h:  332 },
  BILLBOARD09:            { x:  150, y:  555, w:  328, h:  282 },
  BOULDER3:               { x:  230, y:  280, w:  320, h:  220 },
  COLUMN:                 { x:  995, y:    5, w:  200, h:  315 },
  BILLBOARD01:            { x:  625, y:  375, w:  300, h:  170 },
  BILLBOARD06:            { x:  488, y:  555, w:  298, h:  190 },
  BILLBOARD05:            { x:    5, y:  897, w:  298, h:  190 },
  BILLBOARD07:            { x:  313, y:  897, w:  298, h:  190 },
  BOULDER2:               { x:  621, y:  897, w:  298, h:  140 },
  TREE2:                  { x: 1205, y:    5, w:  282, h:  295 },
  BILLBOARD04:            { x: 1205, y:  310, w:  268, h:  170 },
  DEAD_TREE2:             { x: 1205, y:  490, w:  150, h:  260 },
  BOULDER1:               { x: 1205, y:  760, w:  168, h:  248 },
  BUSH1:                  { x:    5, y: 1097, w:  240, h:  155 },
  CACTUS:                 { x:  929, y:  897, w:  235, h:  118 },
  BUSH2:                  { x:  255, y: 1097, w:  232, h:  152 },
  BILLBOARD03:            { x:    5, y: 1262, w:  230, h:  220 },
  BILLBOARD02:            { x:  245, y: 1262, w:  215, h:  220 },
  STUMP:                  { x:  995, y:  330, w:  195, h:  140 },
  SEMI:                   { x: 1365, y:  490, w:  122, h:  144 },
  TRUCK:                  { x: 1365, y:  644, w:  100, h:   78 },
  CAR03:                  { x: 1383, y:  760, w:   88, h:   55 },
  CAR02:                  { x: 1383, y:  825, w:   80, h:   59 },
  CAR04:                  { x: 1383, y:  894, w:   80, h:   57 },
  CAR01:                  { x: 1205, y: 1018, w:   80, h:   56 },
  PLAYER_UPHILL_LEFT:     { x: 1383, y:  961, w:   80, h:   45 },
  PLAYER_UPHILL_STRAIGHT: { x: 1295, y: 1018, w:   80, h:   45 },
  PLAYER_UPHILL_RIGHT:    { x: 1385, y: 1018, w:   80, h:   45 },
  PLAYER_LEFT:            { x:  995, y:  480, w:   80, h:   41 },
  PLAYER_STRAIGHT:        { x: 1085, y:  480, w:   80, h:   41 },
  PLAYER_RIGHT:           { x:  995, y:  531, w:   80, h:   41 }
};

SPRITES.SCALE = 0.3 * (1/SPRITES.PLAYER_STRAIGHT.w) // the reference sprite width should be 1/3rd the (half-)roadWidth

SPRITES.BILLBOARDS = [SPRITES.BILLBOARD01, SPRITES.BILLBOARD02, SPRITES.BILLBOARD03, SPRITES.BILLBOARD04, SPRITES.BILLBOARD05, SPRITES.BILLBOARD06, SPRITES.BILLBOARD07, SPRITES.BILLBOARD08, SPRITES.BILLBOARD09];
SPRITES.PLANTS     = [SPRITES.TREE1, SPRITES.TREE2, SPRITES.DEAD_TREE1, SPRITES.DEAD_TREE2, SPRITES.PALM_TREE, SPRITES.BUSH1, SPRITES.BUSH2, SPRITES.CACTUS, SPRITES.STUMP, SPRITES.BOULDER1, SPRITES.BOULDER2, SPRITES.BOULDER3];
SPRITES.CARS       = [SPRITES.CAR01, SPRITES.CAR02, SPRITES.CAR03, SPRITES.CAR04, SPRITES.SEMI, SPRITES.TRUCK];

function randomChoice(options) { 
	return options[randomInt(0, options.length-1)];  
}

function randomInt(min, max) { 
	return Math.round(interpolate(min, max, Math.random()));   
}

function   interpolate(a,b,percent) { 
	return a + (b-a)*percent;
}
  
  
var myCar = new carRace("racingCan");
		myCar.init(myCar.cid);
	}
})(window, document);