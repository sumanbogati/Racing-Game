/***
/***
	This is simple racing game 
	is created by Suman Bogati. 
	The game inspired from https://github.com/jakesgordon/javascript-racer/
	Copyright 2011-2012;
	Any enquary please contact at sumanbogati@gmail.com 
**/

(function (window, document){
	window.onload = function (){
		
		var cars = document.getElementById("carContainer").getElementsByClassName('cars');
		for(var i=0; i<cars.length; i++){
			cars[i].onclick = setUpCar;
		}
	
		var trackLength   = null; 
		var width         = 1024;                    // logical canvas width
		var height        = 768; 
		var prvEvt;  
		var gameStart = 0;
		//var road = "straight";
		
		var carRace = function (canvasId){
			this.cid = canvasId;
			this.canvas = document.getElementById(canvasId);
			this.player = '';
			this.background = '';
			
			//this.road = '';
			this.rd= '';
			this.car = '';
			this.timing = '';
			this.sprites = null;
			this.bgload = true;
			this.gameStartTime = 0;
			this.gameStarted = false;
			return this;
		}
		
		carRace.prototype =  {
			init : function (rtype, ctype){
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
			
			
				/* this.car = new Car(this);
				this.car.init();
				this.load(); */
				
				this.rd = new Road(this);
				this.rd.init(rtype);
				// this.rd.resetRoad();
				
				//car init
				this.car = new Car(this);
				this.car.init(ctype);
				this.load();
				
				//this is to be splitted in relative calss
				/*this.SPRITES = {
				  CAR01:                  { x: 1205, y: 1018, w:   80, h:   56 },
				  PLAYER_STRAIGHT:        { x: 1085, y:  480, w:   80, h:   41 },
				};*/
				
				
				this.SPRITES = {
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
	
								  
				};
				
				
				if(this.car.type == 'bcar'){
				  this.SPRITES = {
						  PLAYER_LEFT:            { x:  1123, y:  1015, w:   80, h:   70 },
					      PLAYER_STRAIGHT:        { x: 1200, y:  1030, w:   88, h:   60 },
				          PLAYER_RIGHT:           { x:  1023, y:  1015, w:   80, h:   70 }
					}
				}else if(this.car.type == 'rcar'){
					  this.SPRITES = {
						  PLAYER_LEFT:            { x:  995, y:  480, w:   80, h:   41 },
						  PLAYER_STRAIGHT:        { x: 1085, y:  480, w:   80, h:   41 },
						  PLAYER_RIGHT:           { x:  995, y:  531, w:   80, h:   41 } 
					  }
				}
				
				this.SPRITES.SCALE = 0.3 * (1/this.SPRITES.PLAYER_STRAIGHT.w); // the reference sprite width should be 1/3rd the (half-)roadWidth
				
				//this is to be splitted in relative calss
				this.SPRITES.CARS = [this.SPRITES.CAR01];
			},
			
			load : function (){
				// this need to be done becuase 
				// there should be loaded first background images
				// and should be done other jobs eg:- load road, car
				this.bg.load(this, function (cthis){
					cthis.rd.load(cthis.ctx);
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
					//alert(this.value);
					//todo this shoud be dyanamic
					this.frmStX = 0;
					this.frnStY = 0;
					this.skySpeed  = 0.001;
					this.skyOffset = 0;

				}, 
				
				load: function (cthis, callback){
					var ctx = cthis.ctx;
					ctx.clearRect(0, 0, width, height);
					//var imgElems = document.getElementById("bgImage");
					var imgaLoaded = function (mthis, dthis){
						cthis.bg.img = dthis;
						callback(mthis);
					}
					
					//var imgElem  = document.createElement('img');
					var imgElem = new Image();
					
					imgElem.onload = function (){
						// ctx.drawImage(imgElem, 0, 0, 1050, 500);
						ctx.drawImage(imgElem, 0, 0, 1050, 390);
						imgaLoaded(cthis, this);
					}
					imgElem.src = this.value;
					
				},
			};
		 }
		 
		var ROAD2 = {
			LENGTH: { NONE: 0, SHORT:  25, MEDIUM:  50, LONG:  100 },
			CURVE:  { NONE: 0, EASY:    2, MEDIUM:   4, HARD:    6 }
		};
		 
		 
		 //class Road
		 var Road = function (cthis){
			return {
				init : function (rtype){
					this.segments = [];
					this.segmentLength = 200
					this.playerZ = null;
					this.cameraDepth   = null;
					this.type = {};
					this.cameraHeight = 1000;
					this.roadWidth     = 2000; 
					this.position = 0;
					this.playerX = 0;
					this.trackLength = 0;
					this.rumbleLength = 3;
					this.drawDistance = 300;
					this.lanes = 3;
					this.fieldOfView = 100;
					this.currentLapTime = 0;
					this.centrifugal = 0.3;
					this.rType = rtype;
					
					
					this.COLORS = {
								  SKY:  '#72D7EE',
								  TREE: '#005108',
								  FOG:  '#005108',
								  LIGHT:  { road: '#234243', grass: '#1c3f74', rumble: '#182c14', lane: '#f8c21d'  },
								  //DARK:   { road: '#696969', grass: '#009A00', rumble: '#BBBBBB'                   },
								  DARK:   { road: '#1b3b3c', grass: '#012f73', rumble: '#f8c21d'                   },
								  START:  { road: '#edfafb',   grass: '#edfafb',   rumble: '#edfafb'                     },
								  FINISH: { road: 'black',   grass: 'black',   rumble: 'black'                     }
								};
						
						
						this.cameraDepth = 1 / Math.tan((this.fieldOfView/2) * Math.PI/180);
						this.playerZ  = (this.cameraHeight * this.cameraDepth);
						this.reset(cthis);
					}, 
				
				//this function is called render into inspired game
				load_old : function (ctx){
					var baseSegment = this.findSegment(this.position);
					var maxy  = height;

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
						
						//alert(segment.color);
						
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
					cthis.car.load(cthis.ctx);
				},
				
				//this function is called render into inspired game
				load : function (ctx){
					var baseSegment = this.findSegment(this.position);
					var maxy  = height;
				
					if(cthis.rd.rType == 'straight'){
						this.straight(baseSegment, maxy, ctx);
					}else{
						
						this.curve(baseSegment, maxy, ctx);
					}
					//this.straight(baseSegment, maxy, ctx);
					//this.curve(baseSegment, maxy, ctx);	
					cthis.car.load(cthis.ctx);
				},
				/*curve1 */
				 
				load_old : function(ctx) {
					var baseSegment = this.findSegment(this.position);
					  var maxy        = height;

					  var basePercent = cthis.car.mechanism().percentRemaining(this.position, this.segmentLength);
					  var x  = 0;
					  var dx = - (baseSegment.curve * basePercent);

					//  ctx.clearRect(0, 0, width, height);
					//this should disable//
						
					/*
					  Render.background(ctx, background, width, height, BACKGROUND.SKY,   skyOffset);
					  Render.background(ctx, background, width, height, BACKGROUND.HILLS, hillOffset);
					  Render.background(ctx, background, width, height, BACKGROUND.TREES, treeOffset);
						*/
					  var n, segment;
					  for(n = 0 ; n < this.drawDistance ; n++) {

						segment        = this.segments[(baseSegment.index + n) % this.segments.length];
						segment.looped = segment.index < baseSegment.index;
						//segment.fog    = Util.exponentialFog(n/drawDistance, fogDensity);
											
						this.structure().project(segment.p1, (this.playerX * this.roadWidth) - x,  this.cameraHeight, this.position - (segment.looped ? this.trackLength : 0), this.cameraDepth, width, height, this.roadWidth);
					
						this.structure().project(segment.p2, (this.playerX * this.roadWidth) - x - dx, this.cameraHeight, this.position - (segment.looped ? this.trackLength : 0), this.cameraDepth, cthis.canvas.width, cthis.canvas.height, this.roadWidth);

						x  = x + dx;
						dx = dx + segment.curve;

						if ((segment.p1.camera.z <= this.cameraDepth) ||  // behind us
							(segment.p2.screen.y >= maxy))           // clip by (already rendered) segment
						  continue;
						
						/* debugger;
						alert(segment.color); */
						
						this.dispSegment(ctx, cthis.canvas.width, this.lanes,
									   segment.p1.screen.x,
									   segment.p1.screen.y,
									   segment.p1.screen.w,
									   segment.p2.screen.x,
									   segment.p2.screen.y,
									   segment.p2.screen.w,
									   //segment.fog,
									   segment.color);

						maxy = segment.p2.screen.y;
					  }
					  
					  cthis.car.load(cthis.ctx);
				},
				
				load_curve : function(ctx) {
					var baseSegment = this.findSegment(this.position);
					var maxy  = height;
					this.curve(baseSegment, maxy, ctx);
					//var n, segment;
					cthis.car.load(cthis.ctx);
				},
				
				curve : function (baseSegment, maxy, ctx){
					  var basePercent = cthis.car.mechanism().percentRemaining(this.position, this.segmentLength);
					  var x  = 0;
					  var dx = - (baseSegment.curve * basePercent);

					//  ctx.clearRect(0, 0, width, height);
					//this should disable//
						
					/*
					  Render.background(ctx, background, width, height, BACKGROUND.SKY,   skyOffset);
					  Render.background(ctx, background, width, height, BACKGROUND.HILLS, hillOffset);
					  Render.background(ctx, background, width, height, BACKGROUND.TREES, treeOffset);
						*/
					  var n, segment;
					  for(n = 0 ; n < this.drawDistance ; n++) {

						segment        = this.segments[(baseSegment.index + n) % this.segments.length];
						segment.looped = segment.index < baseSegment.index;
						//segment.fog    = Util.exponentialFog(n/drawDistance, fogDensity);
											
						this.structure().project(segment.p1, (this.playerX * this.roadWidth) - x,  this.cameraHeight, this.position - (segment.looped ? this.trackLength : 0), this.cameraDepth, width, height, this.roadWidth);
					
						this.structure().project(segment.p2, (this.playerX * this.roadWidth) - x - dx, this.cameraHeight, this.position - (segment.looped ? this.trackLength : 0), this.cameraDepth, cthis.canvas.width, cthis.canvas.height, this.roadWidth);

						x  = x + dx;
						dx = dx + segment.curve;

						if ((segment.p1.camera.z <= this.cameraDepth) ||  // behind us
							(segment.p2.screen.y >= maxy))           // clip by (already rendered) segment
						  continue;
						
						/* debugger;
						alert(segment.color); */
						
						this.dispSegment(ctx, cthis.canvas.width, this.lanes,
									   segment.p1.screen.x,
									   segment.p1.screen.y,
									   segment.p1.screen.w,
									   segment.p2.screen.x,
									   segment.p2.screen.y,
									   segment.p2.screen.w,
									   //segment.fog,
									   1,
									   segment.color);
						maxy = segment.p2.screen.y;
					  }
				},
				
				resetRoadForCurve : function (){
						this.addStraight(ROAD2.LENGTH.SHORT/4);
						this.addStraight(ROAD2.LENGTH.SHORT/4);
						this.addSCurves();
						this.addSCurves();
						this.addStraight(ROAD2.LENGTH.LONG);
						this.addCurve(ROAD2.LENGTH.MEDIUM, ROAD2.CURVE.MEDIUM);
						this.addCurve(ROAD2.LENGTH.LONG, ROAD2.CURVE.MEDIUM);
						this.addStraight();
						this.addSCurves();
						this.addCurve(ROAD2.LENGTH.LONG, -ROAD2.CURVE.MEDIUM);
						this.addCurve(ROAD2.LENGTH.LONG, ROAD2.CURVE.MEDIUM);
						
						this.addStraight();
						this.addSCurves();
						this.addCurve(ROAD2.LENGTH.LONG, -ROAD2.CURVE.EASY);
				},
				
				resetRoadForStraight : function (){
					// for(var n = 0 ; n < 1200 ; n++) {
					for(var n = 0 ; n < 400 ; n++) {
							this.segments.push({
							   index: n,
							   p1: { world: { z:  n   *this.segmentLength }, camera: {}, screen: {} },
							   p2: { world: { z: (n+1)*this.segmentLength }, camera: {}, screen: {} },
							   color: Math.floor(n/this.rumbleLength)%2 ? this.COLORS.DARK : this.COLORS.LIGHT
							});
					  }
				},
				
				straight : function (baseSegment, maxy, ctx){
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
						
						//alert(segment.color);
						
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
					this.resetRoad();
				}, 
				
				resetRoad_old : function (){
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

					  this.trackLength = this.segments.length * this.segmentLength;
				}, 
				
				resetRoad : function (){
				//=========================================================================
					// BUILD ROAD GEOMETRY
					//=========================================================================
					//var segments = [];
					  //this.resetRoadForStraight();
					  //this.resetRoadForCurve();
					  
					  if(cthis.rd.rType == 'straight'){
						    this.resetRoadForStraight();
					  }else{
							this.resetRoadForCurve();
					  }
					  
					  this.segments[this.findSegment(this.playerZ).index + 2].color = this.COLORS.START;
					  this.segments[this.findSegment(this.playerZ).index + 3].color = this.COLORS.START;
					  for(var n = 0 ; n < this.rumbleLength ; n++)
					  this.segments[this.segments.length-1-n].color = this.COLORS.FINISH;

					  this.trackLength = this.segments.length * this.segmentLength;
				}, 
				
				/*curve2 */
				resetRoad_curve : function() {
					  //segments = [];
					  this.addStraight(ROAD2.LENGTH.SHORT/4);
					  this.addSCurves();
					  this.addStraight(ROAD2.LENGTH.LONG);
					  this.addCurve(ROAD2.LENGTH.MEDIUM, ROAD2.CURVE.MEDIUM);
					  this.addCurve(ROAD2.LENGTH.LONG, ROAD2.CURVE.MEDIUM);
					  this.addStraight();
					  this.addSCurves();
					  this.addCurve(ROAD2.LENGTH.LONG, -ROAD2.CURVE.MEDIUM);
					  this.addCurve(ROAD2.LENGTH.LONG, ROAD2.CURVE.MEDIUM);
					  this.addStraight();
					  this.addSCurves();
					  this.addCurve(ROAD2.LENGTH.LONG, -ROAD2.CURVE.EASY);
					  //TODO this should be enable
					  //this.addStraight();
					  //this.addSCurves();
					  //this.addCurve(ROAD2.LENGTH.LONG, -ROAD2.CURVE.EASY);

					  this.segments[this.findSegment(this.playerZ).index + 2].color = this.COLORS.START;
					  this.segments[this.findSegment(this.playerZ).index + 3].color = this.COLORS.START;
					  for(var n = 0 ; n < this.rumbleLength ; n++)
						this.segments[this.segments.length-1-n].color = COLORS.FINISH;

					  this.trackLength = this.segments.length * this.segmentLength;
				},
				
				findSegment  : function (z){
					return this.segments[Math.floor(z/this.segmentLength) % this.segments.length];
				},
				
				/*curve3 */
				findSegment_curve : function(z) {
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
							//console.log.log("x1 y1 x2 y2" ); 
							//console.log.log(x1 + " " + y1 +" " + x2 +" "+ y2);
							ctx.fillStyle = color;
							ctx.beginPath();
							ctx.moveTo(x1, y1);
							ctx.lineTo(x2, y2);
							ctx.lineTo(x3, y3);
							ctx.lineTo(x4, y4);
							ctx.fill();
						},
						
						rumbleWidth : function (projectedRoadWidth, lanes) { 
							return projectedRoadWidth/Math.max(6,  2*lanes); 
						},
						
						laneMarkerWidth :  function (projectedRoadWidth, lanes) { 
							return projectedRoadWidth/Math.max(32, 8*lanes); 
						}
					};
				},
				
				/*curve5 */
				addSegment : function(curve) {
					var n = this.segments.length;
					this.segments.push({
						index: n,
						p1: { world: { z:  n   *this.segmentLength }, camera: {}, screen: {} },
						p2: { world: { z: (n+1)*this.segmentLength }, camera: {}, screen: {} },
						curve: curve,
						color: Math.floor(n/this.rumbleLength)%2 ? this.COLORS.DARK : this.COLORS.LIGHT
					});
				},
				
				addRoad : function(enter, hold, leave, curve) {
					var n;
					for(n = 0 ; n < enter ; n++){
						easeIn(0, curve, n/enter);
					}
					for(n = 0 ; n < hold  ; n++){
						this.addSegment(curve);
					}	
					for(n = 0 ; n < leave ; n++){
						easeInOut(curve, 0, n/leave);
					}	
				}, 
				addStraight : function(num) {
					num = num || ROAD2.LENGTH.MEDIUM;
					this.addRoad(num, num, num, 0);
				},

				addCurve : function (num, curve) {
					num    = num    || ROAD2.LENGTH.MEDIUM;
					curve  = curve  || ROAD2.CURVE.MEDIUM;
					this.addRoad(num, num, num, curve);
				},
				
				addSCurves : function () {
					this.addRoad(ROAD2.LENGTH.MEDIUM, ROAD2.LENGTH.MEDIUM, ROAD2.LENGTH.MEDIUM,  -ROAD2.CURVE.EASY);
					this.addRoad(ROAD2.LENGTH.MEDIUM, ROAD2.LENGTH.MEDIUM, ROAD2.LENGTH.MEDIUM,   ROAD2.CURVE.MEDIUM);
					this.addRoad(ROAD2.LENGTH.MEDIUM, ROAD2.LENGTH.MEDIUM, ROAD2.LENGTH.MEDIUM,   ROAD2.CURVE.EASY);
					this.addRoad(ROAD2.LENGTH.MEDIUM, ROAD2.LENGTH.MEDIUM, ROAD2.LENGTH.MEDIUM,  -ROAD2.CURVE.EASY);
					this.addRoad(ROAD2.LENGTH.MEDIUM, ROAD2.LENGTH.MEDIUM, ROAD2.LENGTH.MEDIUM,  -ROAD2.CURVE.MEDIUM);
				}
			};	
		 }
	
		//---------------------------------------------------------------------------
		//class Car
		var Car  = function (cthis){
			return {
				init: function (type){
					this.type = type;
				//	this.name = obj.name;
				//	this.type = obj.type;
					this.destX = width/2;
					this.destY = height;
					this.resolution = 1.6;
					this.scale = cthis.rd.cameraDepth/cthis.rd.playerZ;
					this.maxSpeed  = cthis.rd.segmentLength/cthis.step;
					this.speed = 0;
					this.keyLeft = false;
					this.keyRight = false;
					this.keyFaster = false;
					this.keySlower = false;
					//this.steer =  this.speed * (this.keyLeft ? -1 : this.keyRight ? 1 : 0);
					this.updown = 0;
					this.accel = this.maxSpeed/5;
					this.breaking = -this.maxSpeed;
					this.decel = -this.maxSpeed/5;
					
					this.offRoadDecel  = -this.maxSpeed/2;             // off road deceleration is somewhere in between
					this.offRoadLimit  =  this.maxSpeed/4;   

					//attaching event handler 
					var keyObj = new Keys(cthis);
						keyObj.init();
				}, 
				
				//here would be the code for run, stop, start
				//here is the load instasd player
				load: function (){
						this.speedPercent = this.speed/this.maxSpeed;
						this.steer =  this.speed * (this.keyLeft ? -1 : this.keyRight ? 1 : 0);
						var bounce = (1.5 * Math.random() * this.speedPercent * this.resolution) * this.mechanism().randomChoice([-1,1]);
						
						//console.log("bounce " + bounce);

						if (this.steer < 0){
						  sprite = (this.updown > 0) ? cthis.SPRITES.PLAYER_UPHILL_LEFT : cthis.SPRITES.PLAYER_LEFT;
						 }
						else if (this.steer > 0){
						  sprite = (this.updown > 0) ? cthis.SPRITES.PLAYER_UPHILL_RIGHT : cthis.SPRITES.PLAYER_RIGHT;
						  //console.log.log("right");
						  }
						else{
						  sprite = (this.updown > 0) ? cthis.SPRITES.PLAYER_UPHILL_STRAIGHT : cthis.SPRITES.PLAYER_STRAIGHT;
						  //console.log("straight");
						}
						
						/*if(bounce>1){
							bounce = 1;
						}*/
						
						//bounce = 2.85;
						//console.log("bounce " +bounce);
						
						bounce = 0; 	
						/*if(bounce > 2){
							var bounce = (1.5 * Math.random() * this.speedPercent * this.resolution) * this.mechanism().randomChoice([-1,1]);
						}*/
						this.destY = this.destY + bounce;
						
						this.sprite(sprite, -0.5, -1);
						
						/* for(prop in cthis.SPRITES.PLAYER_UPHILL_STRAIGHT){
							//console.log.log(prop + " " + cthis.SPRITES.PLAYER_UPHILL_STRAIGHT[prop]) + " <br />";
						}	
						//console.log.log("second");
							
						for(prop in cthis.SPRITES.PLAYER_STRAIGHT){
							//console.log.log(prop + " " + cthis.SPRITES.PLAYER_STRAIGHT[prop]) + " <br />";
						} */	

				},
				
//ctx, width, height, resolution, roadWidth, sprites, sprite, scale, destX, destY + bounce, -0.5, -1);
//ctx, width, height, resolution, roadWidth, sprites, sprite, scale, destX, destY, offsetX, offsetY, clipY) {
				
				sprite: function(sprite, offsetX, offsetY, clipY) {
					//  scale for projection AND relative to roadWidth (for tweakUI)
					//var destW  = (sprite.w * scale * width/2) * (SPRITES.SCALE * roadWidth);
					//var destH  = (sprite.h * scale * width/2) * (SPRITES.SCALE * roadWidth)
	
					/* var destW  = (sprite.w * this.scale * width/2) * (cthis.SPRITES.SCALE * cthis.rd.roadWidth);
					var destH  = (sprite.h * this.scale * width/2) * (cthis.SPRITES.SCALE * cthis.rd.roadWidth);
									
					this.destX = this.destX + (destW * (offsetX || 0));
					this.destY = this.destY + (destH * (offsetY || 0)); */
					
					
					var destW  = (sprite.w * this.scale * width/2) * (cthis.SPRITES.SCALE * cthis.rd.roadWidth);
					var destH  = (sprite.h * this.scale * width/2) * (cthis.SPRITES.SCALE * cthis.rd.roadWidth);
						//destH = destH-100;
					
					/*//console.log.log("this.destX +  (destW * (offsetX || 0) " + 
						this.destX + " + ("+destW + " * " + "(" + offsetX + " || " + 0 + "))"
					);*/
					
					/*  //console.log.log("this.destY +  (destH * (offsetY || 0) " + 
						this.destY + " + ("+destY + " * " + "(" + offsetY + " || " + 0 + "))"
					); */
					
					//this.destX = (this.destX + (destW * (offsetX || 0)));
					//this.destY = (this.destY + (destH * (offsetY || 0)));
					
					//console.log.log("this.destX " +this.destX);
					//console.log.log("this.destY " +this.destY);
					
					
					//console.log.log("offsetX " +offsetX);
					//console.log.log("offsetY " +offsetY);
					
					//console.log.log("this.destX " +this.destX);
					//console.log.log("this.destY " +this.destY);
					
					//console.log.log('destY ' + this.destY);
					//console.log.log('destH ' + destH);
					//console.log.log('offsetY ' + offsetY);	
					var clipH = clipY ? Math.max(0, this.destY+destH-clipY) : 0;
					if (clipH < destH)
						
					  //TODO this should be dynamic
					  //this.destY = 610.56;
						
					 // alert(cthis.sprites);
				
					cthis.ctx.drawImage(cthis.sprites, sprite.x, sprite.y, sprite.w, sprite.h - (sprite.h*clipH/destH), (this.destX + (destW * (offsetX || 0))), ((this.destY + (destH * (offsetY || 0)))-100), destW, destH - clipH);
				}, 
				
				run : function (){
					//Game.setKeyListener(options.keys);
					return {
						init : function (options, cthis){
							//alert("i am the person");
							//var canvas = options.canvas,    // canvas render target is provided by caller
						//	this.update = options.update,    // method to update game logic is provided by caller
						//	this.render = options.render,    // method to render the game is provided by caller
							//this.step   = options.step,      // fixed frame step (1/fps) is specified by caller
						//	this.stats  = options.stats,     // stats instance is provided by caller
							this.step   = options.step;
							this.now    = null;
							this.last   = cthis.car.mechanism().timestamp();
							this.dt     = 0;
							this.gdt    = 0;
							this.run = true;
						},

						frame : function (cthis) {
							//alert("is there running the car");
							this.now = cthis.car.mechanism().timestamp();
							this.dt  = Math.min(1, (this.now - this.last) / 1000); // using requestAnimationFrame have to be able to handle large delta's caused when it 'hibernates' in a background or non-visible tab
							
							//when the second track is loaded in that time
							// the road is loaded before the background
							// this is a work around
							this.gdt = this.gdt + this.dt;
							//if (cthis.bgload == true){
								while (this.gdt > this.step) {
									this.gdt = this.gdt - this.step;
									this.update(cthis);
									//cthis.rd.load(cthis.ctx);
								}
							
							/*dthis = this;
							setInterval(
								function (){
									cthis.rd.load(cthis.ctx);
							dthis.last = dthis.now;
							requestAnimationFrame(dthis.frame(cthis), cthis.canvas);
								}, 1
							);
							*/
							
							//TODO I have done this with workaround for now
							// I'll have to do it in future with proper way
							//this should be acheived through requestAnimationFrame
								
							//}
							cthis.rd.load(cthis.ctx);
							dthis = this;	
							setTimeout(function (){	
								dthis.last = dthis.now;
								dthis.frame(cthis);
							}, (1000/60));
							
							/* cthis.rd.load(cthis.ctx);
							dthis = this;
							setTimeout(function (){	
								dthis.last = dthis.now;
								dthis.frame(cthis);
							}, (1000/60)); */
							/* cthis.rd.load(cthis.ctx);
							this.last = this.now;
							dthis = this;
							requestAnimationFrame(}, 1000));
							setInterval(function(){requestAnimationFrame(dthis.frame(cthis))}, 1000); */
						},
						
						update_withoutTime : function (cthis) {
							var carObj = cthis.car
							 var dt = this.step;
							  cthis.rd.position = carObj.mechanism().increase(cthis.rd.position, dt * carObj.speed, cthis.rd.trackLength);
							  //console.log.log('road positon '+ cthis.rd.position);
							  var dx = dt * 2 * (carObj.speed/carObj.maxSpeed); // at top speed, should be able to cross from left to right (-1 to 1) in 1 second
							  var keyLeft = cthis.car.keyLeft;
							  var keyFaster = cthis.car.keyFaster;
							  var keyRight = cthis.car.keyRight;
							  var keySlower = cthis.car.keySlower;
							  var playerX = cthis.rd.playerX;
							  
							  if (keyLeft){
								playerX = playerX - dx;
								}
							  else if (keyRight)
								playerX = playerX + dx;
								
							  if (keyFaster){
								carObj.speed = carObj.mechanism().accelerate(carObj.speed, carObj.accel, dt);
								}
								
							  else if (keySlower)
								carObj.speed = carObj.mechanism().accelerate(carObj.speed, carObj.breaking, dt);
							  else
								carObj.speed = carObj.mechanism().accelerate(carObj.speed, carObj.decel, dt);
							
							//console.log(" keyFaster " + keyFaster);							
							//console.log(" keyLeft " + keyLeft);							
							  if (((playerX < -1) || (playerX > 1)) && (carObj.speed > carObj.offRoadLimit)){
								carObj.speed = carObj.mechanism().accelerate(carObj.speed, carObj.offRoadDecel, dt);
							   }

							  cthis.rd.playerX = carObj.mechanism().limit(playerX, -2, 2);     // dont ever let player go too far out of bounds
							  
							  carObj.speed  = carObj.mechanism().limit(carObj.speed, 0, carObj.maxSpeed); // or exceed maxSpeed
							  //console.log();
							  
						},
						
						update : function (cthis){
							if(this.run == true){
							  var carObj = cthis.car;
							  var dt = this.step;
							  var playerSegment = cthis.rd.findSegment(cthis.rd.position+cthis.rd.playerZ);
							  var speedPercent  = carObj.speed/carObj.maxSpeed;
							
							  //cthis.bg.skyOffset = (cthis.bg.skyOffset || 0); //this line should be removed from here
							//  cthis.bg.skyOffset  = carObj.mechanism().increase(cthis.bg.skyOffset,  cthis.bg.skySpeed  * playerSegment.curve * speedPercent, 1);
							  

							  //var dx = dt * 2 * carObj.speedPercent; // at top carObj.speed, should be able to cross from left to right (-1 to 1) in 1 second
							  //Render.background(ctx, background, width, height, BACKGROUND.HILLS);
							  
							  var bg = {};
							  bg.w = 735;
							  bg.h = 315;
							  bg.x = 1;
							  bg.y = 1;
							  
							  
							  dispBgImg(cthis, width, height, bg, cthis.bg.skyOffset);	
							 
							  var dx = dt * 2 * speedPercent; // at top carObj.speed, should be able to cross from left to right (-1 to 1) in 1 second
							  var keyLeft = cthis.car.keyLeft;
							  var keyFaster = cthis.car.keyFaster;
							  var keyRight = cthis.car.keyRight;
							  var keySlower = cthis.car.keySlower;
							  var playerX = cthis.rd.playerX;
							  startPosition = cthis.rd.position;
 							  cthis.rd.position = cthis.car.mechanism().increase(cthis.rd.position, dt * carObj.speed, cthis.rd.trackLength);
							
							  if (keyLeft)
								playerX = playerX - dx;
							  else if (keyRight)
								playerX = playerX + dx;
								
							  if(cthis.rd.rType == 'straight'){
								   this.update_straight(cthis, carObj, keyFaster, keySlower,playerX, dt);
							  }else{
								this.update_curve(cthis, carObj, keyFaster, keySlower,playerX, dt, dx, speedPercent, playerSegment);
							  }
							 //this.update_straight(cthis, carObj, keyFaster, keySlower,playerX, dt);
							 //this.update_curve(cthis, carObj, keyFaster, keySlower,playerX, dt, dx, speedPercent, playerSegment);
							
							 /* playerX = playerX - (dx * carObj.speedPercent);
							  if (keyFaster)
								carObj.speed = cthis.car.mechanism().accelerate(carObj.speed, carObj.accel, dt);
							  else if (keySlower)
								carObj.speed = cthis.car.mechanism().accelerate(carObj.speed, carObj.breaking, dt);
							  else
								carObj.speed = cthis.car.mechanism().accelerate(carObj.speed, carObj.decel, dt);
							
							  var position = cthis.rd.position;		
							  cthis.rd.playerX = cthis.car.mechanism().limit(playerX, -3, 3);     // dont ever let it go too far out of bounds
							  carObj.speed   = cthis.car.mechanism().limit(carObj.speed, 0, carObj.maxSpeed); // or exceed maxcarObj.speed*/
							  var position = cthis.rd.position;		
							  
							  
							
							  // this can be disable till we are not use for curve
							  
							  /*
							  skyOffset  = cthis.car.mechanism().increase(skyOffset,  skycarObj.speed  * playerSegment.curve * (position-startPosition)/segmentLength, 1);
							  hillOffset = cthis.car.mechanism().increase(hillOffset, hillcarObj.speed * playerSegment.curve * (position-startPosition)/segmentLength, 1);
							  treeOffset = cthis.car.mechanism().increase(treeOffset, treecarObj.speed * playerSegment.curve * (position-startPosition)/segmentLength, 1);*/
							  var playerZ = cthis.rd.playerZ;
							  
							  if (position > playerZ) {
								if (cthis.rd.currentLapTime && (startPosition < playerZ)){
								   if(cthis.rd.rType == 'straight'){
										var userInput = confirm("You have finished first round 1  Do you want go for round second");
									  if(userInput == true){
											resetGame(cthis, 'curve');		
									  }
									this.run = false;
									cthis.rd.lastLapTime    = cthis.rd.currentLapTime;
									cthis.rd.currentLapTime = 0;
									
									//this can be disabled for right now
								   }else{
										alert("YOU HAVE FINISHED SECOND ROUND, After press ok you can start a new gam3e");
										this.run = false;
										music.pause();
										runMusic=false;
										var endGameTime = new Date().getTime();
										//console.log("endGameTime " + endGameTime);
										//console.log("gameStartTime " + cthis.gameStartTime);
										//console.log('totalTime ' + (endGameTime-cthis.gameStartTime));
										var bestTime =  endGameTime-cthis.gameStartTime;
										
										loadData(bestTime);
										this.gameStarted = false;	
										resetGame(cthis, 'straight');
								   }
								}
								else {
								  cthis.rd.currentLapTime += dt;
								}
							  }
							}
						},
						
						update_straight : function (cthis, carObj, keyFaster, keySlower, playerX, dt){
							
						if (((playerX < -1) || (playerX > 1)) && (carObj.speed > carObj.offRoadLimit)){
								carObj.speed = carObj.mechanism().accelerate(carObj.speed, carObj.offRoadDecel, dt);
						}	
						cthis.rd.playerX = cthis.car.mechanism().limit(playerX, -3, 3);     // dont ever let it go too far out of bounds

							if (keyFaster){
								//console.log("faster");
								carObj.speed = cthis.car.mechanism().accelerate(carObj.speed, carObj.accel, dt);
							}	
							else if (keySlower){
								//console.log("slower");
								carObj.speed = cthis.car.mechanism().accelerate(carObj.speed, carObj.breaking, dt);
							}else{
								//console.log("default");
								carObj.speed = cthis.car.mechanism().accelerate(carObj.speed, carObj.decel, dt);
							}
							
							//console.log('faster ' +keyFaster);
							
							var position = cthis.rd.position;		
							cthis.rd.playerX = cthis.car.mechanism().limit(playerX, -3, 3);     // dont ever let it go too far out of bounds
							carObj.speed   = cthis.car.mechanism().limit(carObj.speed, 0, carObj.maxSpeed); // or 
							//console.log("carObj.speed " + carObj.speed);
						},
						
						update_curve : function(cthis, carObj, keyFaster, keySlower, playerX, dt, dx, speedPercent,playerSegment){
							playerX = playerX - (dx * speedPercent * playerSegment.curve * cthis.rd.centrifugal);
							if (keyFaster)
								carObj.speed = cthis.car.mechanism().accelerate(carObj.speed, carObj.accel, dt);
							else if (keySlower)
								carObj.speed = cthis.car.mechanism().accelerate(carObj.speed, carObj.breaking, dt);
							else
								carObj.speed = cthis.car.mechanism().accelerate(carObj.speed, carObj.decel, dt);
							
							if (((playerX < -1) || (playerX > 1)) && (carObj.speed > carObj.offRoadLimit))
							carObj.speed	 = cthis.car.mechanism().accelerate(carObj.speed, carObj.offRoadDecel, dt);

							cthis.rd.playerX = cthis.car.mechanism().limit(playerX, -2, 2);     // dont ever let player go too far out of bounds
							carObj.speed   = cthis.car.mechanism().limit(carObj.speed, 0, carObj.maxSpeed); // or exceed maxSpeed
						},
					}
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
							//  alert(result);
							return result;
						  },
						  
						 accelerate: function(v, accel, dt) { 
							return v + (accel * dt); 
						 }, 
						 
						 limit: function(value, min, max)   { 
							return Math.max(min, Math.min(value, max)); 
						 },
						
/* 						 easeIn: function(a,b,percent)       { 
							return a + (b-a)*Math.pow(percent,2);
						 },
						
    					 easeOut: function(a,b,percent)       { 
							return a + (b-a)*(1-Math.pow(1-percent,2));                     
						 },
						
						 easeInOut: function(a,b,percent) { 
							return a + (b-a)*((-Math.cos(percent*Math.PI)/2) + 0.5);        
						 }, */

						 percentRemaining: function(n, total) { 
							return (n%total)/total;
						},
						 
					}
				}
			};
		}

		
		//var keyLeft  = false;
		//var keyRight = false;
		//var keyUp  	 = false;
		//var keydown  = false;
		
		//class Event
		var event = function (){
			var tfunc, func;
			return{
				attachEventListener : function(elemId, kthis){
					//alert(kthis.events);
					for(evt in kthis.events){
					 //  //console.log.log("hello guys what is up");
					 //document.getElementById(elemId).addEventListener = (evt, kthis.events[evt]());
					 //	alert(kthis.events[evt]);	
					 //	alert(kthis);
						//debugger;
						
						/* link.onclick = function (num){
							return function (){
								alert(num);
							};
						}(i); */	
						
						//this is the use of clousre concept
						tfunc = kthis.events[evt];
						//func =  kthis[tfunc];
						func = function (kthis, tfunc){
							//debugger;
							return function (evt){
								kthis[tfunc](evt);
							}
						}(kthis, tfunc);
					
						//the name should be dyanamic
						document.getElementById("bdRcGame").addEventListener(evt, func);
					}
				}, 
			};
		}
		
		var runMusic = false;
		var Keys = function (cthis){
			return {
				init : function (){
					this.events = {'keydown' : 'down', 'keypress' : 'press', 'keyup' : 'up'};
					event().attachEventListener("bdRcGame", this);
					
					this.keyCodes =  {	 
							  left:  37,
							  up:    38,
							  right: 39,
							  down:  40,
						};
				}, 
				
				down : function (evt){
					//for(keyProp in  this.keyCodes){
						//console.log.log(this.keyCodes[keyProp]);
						
						
						/* if(evt.keyCode == 37){
							cthis.car.keyLeft = true;
						}else if(evt.keyCode == 38){
							cthis.car.keyFaster = true;
						}else if(evt.keyCode == 39){
							cthis.car.keyRight = true;
						}else if(evt.keyCode == 40){
							cthis.car.keySlower = true;
						} */
						
						if(evt.keyCode == 37){
							//console.log("cthis.car.keyLeft " + cthis.car.keyLeft);
							cthis.car.keyLeft = true;
							//console.log("cthis.car.keyFaster " + cthis.car.keyFaster);
						}
						
						if(evt.keyCode == 38){
							
							cthis.car.keyFaster = true; 
						}
						
						if(evt.keyCode == 39){
							cthis.car.keyRight = true;
						}
						if(evt.keyCode == 40){
							cthis.car.keySlower = true;
						}
							
						//if(this.keyCodes[keyProp] == evt.keyCode){
						//console.log.log(evt.keyCode);
							
						if(evt.keyCode == 38){
							if(!cthis.gameStarted){
								cthis.gameStartTime = new Date().getTime();
								cthis.gameStarted = true;
							}
							
							
							var step = cthis.step;
							var carRun = cthis.car.run();
							carRun.init({step:step}, cthis);
							carRun.frame(cthis);
						
							
							if(runMusic == false){
								playMusic(); 
								runMusic = true;
							}
							
							
					}
							
						//alert("the game begins now with press down button " + evt.keyCode);	
					//}
//}
				},
				
				up : function (evt){
					var step = cthis.step;
					
					if((cthis.car.keyFaster == true && cthis.car.keyRight != true && cthis.car.keyLeft != true
					) 
					){
						cthis.car.keyFaster = false;	
					}
					if(cthis.car.keyRight== true){
						cthis.car.keyRight = false;
					}
					if(cthis.car.keyLeft == true){
						cthis.car.keyLeft = false;
					}
				}, 
				
				press : function (ev){
					for(keyProp in  this.keyCodes){
						if(this.keyCodes[keyProp] == ev.keyCode){
							//alert("the game ends now with press up button");
						}
					}
					
					if(ev.keyCode == 38){
						//	cthis.car.init({step:step});
						//cthis.car.run().frame(cthis);
						//cthis.car.keyFaster = true;
					}
				},
			};
		}
		
		 function easeIn(a,b,percent){ 
			return a + (b-a)*Math.pow(percent,2);
		 }
		
		 function easeOut(a,b,percent){ 
			return a + (b-a)*(1-Math.pow(1-percent,2));                     
		 }
		 
		 function easeInOut(a,b,percent) { 
			return a + (b-a)*((-Math.cos(percent*Math.PI)/2) + 0.5);        
		 }
		 
		function resetGame(cthis, rtype){
			cthis.rd.init(rtype);
			//when the second track is loaded in that time
			// the road is loaded before the background
			// this is a work around
			//cthis.bgload=false; //TODO handling for background image
			cthis.bg.skyOffset = (cthis.bg.skyOffset || 0)
			cthis.car.speed = 0;
			
			cthis.ctx.clearRect(0, 0, 1024, 768);
			imgAddress = cthis.bg.img;
			cthis.ctx.drawImage(imgAddress, 0, 0, 1050, 390);
							
			cthis.rd.load(cthis.ctx);
			//cthis.bgload=true;
			/* if(rtype == 'straight'){
				music.play();
			} */
			
		}
		
		var COLORS = {
			SKY:  '#72D7EE',
			TREE: '#005108',
			FOG:  '#005108',
			LIGHT:  { road: '#6B6B6B', grass: '#10AA10', rumble: '#555555', lane: '#CCCCCC'  },
			DARK:   { road: '#696969', grass: '#009A00', rumble: '#BBBBBB'                   },
			START:  { road: 'white',   grass: 'white',   rumble: 'white'                     },
			FINISH: { road: 'black',   grass: 'black',   rumble: 'black'                     }
		};	
	mycar = gup('car');
	
	if(mycar == ""){
		mycar = "rcar";
	}
	var myCarRace = new carRace("racingCan");
	 myCarRace.init("straight", mycar);
	// playMusic(); 
	 
	 function setUpCar (){
		var myCarRace2 = new carRace("racingCan");
		window.location.href = "game.php?car="+this.id;
	}
		
	function gup( name ){
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec( window.location.href );
		if( results == null )
			return "";
		else
			return results[1];
	}
}
	
	
	
		//this code should be used into future.
		if (!window.requestAnimationFrame) { // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
			window.requestAnimationFrame = window.webkitRequestAnimationFrame || 
			 window.mozRequestAnimationFrame    || 
			 window.oRequestAnimationFrame      || 
			 window.msRequestAnimationFrame     || 
			 function(callback, element) {
			   window.setTimeout(callback, 1000 / 60);
			 }
		}
		
		function dispBgImg(cthis, width, height, layer, rotation, offset){
		 	cthis.ctx.clearRect(0, 0, width, height);
			imgAddress = cthis.bg.img;
			cthis.ctx.drawImage(imgAddress, 0, 0, 1050, 390); 
		}

var music = "";		
	function playMusic() {
	music = document.getElementById("music");
	music.loop = true;
	music.volume = 0.08; // shhhh! annoying music!
	music.play();
}

function loadData(totTime){
	var xmlhttp;
	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else {// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			var resArr = JSON.parse(xmlhttp.responseText);
			var bestTime = resArr['best_time'];
			var seconds = bestTime/1000;
			var minute = (seconds/60).toFixed(2);
			var total_game = resArr['total_game'];
			
			var bstTimeMsg = "Your best time is " + minute + " minute in your total game " + total_game; 
			document.getElementById("myDiv").innerHTML = bstTimeMsg;
		}
	}
	
	xmlhttp.open("GET","bestTime.php?currTime="+totTime,true);
	xmlhttp.send();
}

function formatTime(dt) {
      var minutes = Math.floor(dt/60);
      var seconds = Math.floor(dt - (minutes * 60));
      var tenths  = Math.floor(10 * (dt - Math.floor(dt)));
      if (minutes > 0)
        return minutes + "." + (seconds < 10 ? "0" : "") + seconds + "." + tenths;
      else
        return seconds + "." + tenths;
    }

})(window, document);