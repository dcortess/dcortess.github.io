/*Copyright 2020 Félix Albertos Marco

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// RayCasting Engine
// Origin (player)
// Map
class RCEngine{
	// the map with the walls
	// width and height of the screen (or the canvas in our case)
	constructor(map,canvasID,fullScreen){
		this._m = map;
		this._c = document.getElementById(canvasID);
		this._fullScreen = fullScreen;
		if(fullScreen){
			this._c.width = window.innerWidth;
        	this._c.height = window.innerHeight;
        }
		this._ctx = this._ctx = this._c.getContext("2d");
		this._w = this._c.width;
		this._h = this._c.height;
		this._o = null; // Origin
		this._v2d = null;// Map 2D view
		this._tx=[]; // Textures
		this._eagle = 1250; // How far I can see !
		this._dov = Math.max(this._c.width,this._c.height)*4;// Distance of view

		this.ini();

		this._by=null;
		this._tx[1] = new ImageTexture(["app/img/wall1.png"]);
		this._tx[2] = new ImageTexture(["app/img/wall2.png"]);
		this._tx[3] = new ImageTexture(["app/img/wall3.png"]);
		this._tx[4] = new ImageTexture(["app/img/wall4.png"]);
		this._tx[5] = new ImageTexture(["app/img/wall5.png"]);
		this._tx[6] = new ImageTexture(["app/img/wall6.png"]);
		this._tx[7] = new ImageTexture(["app/img/wall7.png"]);
		this._tx[8] = new ImageTexture(["app/img/wall8.png"]);
		this._tx[9] = new ImageTexture(["app/img/wall9.png"]);

		this._bestInt = null; // Intersection where the ray hits originally. To get coordinate when drawing texture
		this._hitObj = []; // Objects hit on the cast
		this._zindex = [] // save zindex of each ray casted on the canvas for positioning objects

	}

	ini(){
		this._HI = new HorizontalIntersection(this._m._gridSize); // horizontal intersection
		this._VI = new VerticalIntersection(this._m._gridSize); // vertical intersection

		this._videoElement = document.getElementById("myVideo");

	}

	setOrigin(o){
		this._o = o;
	}

	set2DView(v2d){
		this._v2d=v2d;
	}

	ini_Variables(){
		// Remove duplicates
		// Distance to the projection plane
		this._dpp = (this._c.width/2) / Math.tan((this._o.getFOV()/2)*Math.PI/180); //277
	}
	// raycast
	update(){
		
		this._ctx.clearRect(0, 0, this._c.width, this._c.height);
		
		let aux = ((this._o._angle-(this._o.getFOV()/2)));
		if(aux<0){
			aux=aux+360;
		}

		// Run objects
		let _this=this;
		this._m._objs.forEach(function(o){
			if(o.run());
		});

		for(let i=0;i<this._w;i++){
			this._bestInt = null
			let angle = (aux+((this._o.getFOV()/this._w)*i))%360;
			this._HI.run(this._o._x,this._o._y,angle);
			this._VI.run(this._o._x,this._o._y,angle);
			this.shotRay(i);
		}

				// Only draws where there is nothing drawed
		this._ctx.globalCompositeOperation = 'destination-over';

		this.drawGround();
	 	this.drawCeiling();

	 	this._ctx.globalCompositeOperation = 'source-over';

	 	this.drawObjects();
 		this._hitObj=[]; // Remove objects from array
	}

	drawObjects(){
		for(let cont=this._hitObj.length-1;cont>=0;cont--){
	 		let o = this._hitObj[cont];
		 	if(o.isVisible()){
			 	let bestD = this.getDistance(this._o._x,this._o._y,o._x,o._y);

//			 	let dpp = (this._c.width/2) / Math.tan((this._o.getFOV()/2)*Math.PI/180); //277
				let psh = this._m._gridSize / bestD * this._dpp;
				let cpp = this._c.height/2;

				let alfa =Math.atan2(this._o._y-o._y,this._o._x-o._x)*180/Math.PI;

				if(alfa>0){
					alfa=180-alfa;
				}else{
					alfa=180+Math.abs(alfa);
				}
				let viewAngle = alfa - this._o._angle;
				// We use distance to projection plane, no distance from point to point ;) ;)
				let x = Math.tan(viewAngle*Math.PI / 180) * this._dpp;
				x = Math.floor(this._c.width-( x +this._c.width/2)-psh/2);
				let step=null;
				try{
					step = o.getFrame().width/psh; // each step
				}catch(e){
					console.log(e);
				}
					let alpha = 1-bestD/this._eagle/3;
					this._ctx.globalAlpha = alpha;
					for(let i=0;i<psh;i++){
						if(bestD<this._zindex[Math.floor(i+x)]){
							try{
							this._ctx.drawImage(o.getFrame(),step*i,0,step,o.getFrame().width,i+x,cpp+(psh/2),1,-psh);
							}catch(e){
								// Fixed --> When explosion .. fails but not crash
								console.log(e);
							}
						}
					}
					this._ctx.globalAlpha = 1;
	 			o.setVisible(false,this._hitObj);
	 		}
 		}
	}

	drawGround(){
		var my_gradient=this._ctx.createLinearGradient(this._c.width/2,this._c.height/2,this._c.width/2,this._c.height);
		my_gradient.addColorStop(0,'black');
		my_gradient.addColorStop(1,'darkgray');
		this._ctx.fillStyle=my_gradient;
	    this._ctx.fillRect(0,this._c.height/2,this._c.width,this._c.height/2);
	}

	drawCeiling(){
	    var my_gradient=this._ctx.createLinearGradient(this._c.width/2,0,this._c.width/2,this._c.height/2);
		my_gradient.addColorStop(0,'darkgray');
		my_gradient.addColorStop(1,'black');
		this._ctx.fillStyle=my_gradient;
	    this._ctx.fillRect(0,0,this._c.width,this._c.height/2);
	}

	// Shot Ray ;) --> find a wall or the end of the map
	shotRay(i){
		let Hx=this._HI._x;
		let Hy=this._HI._y;
		let bestD = this._dov; // Best distance to a point in a wall
		do{
			bestD=this.findWall(Hx,Hy,bestD,this._HI);
			Hx+=this._HI._xoff;
			Hy+=this._HI._yoff;

		}while(this._m.onTheLimits(Hx,Hy));

		let Vx=this._VI._x;
		let Vy=this._VI._y;
		do{
			bestD=this.findWall(Vx,Vy,bestD,this._VI);
			Vx+=this._VI._xoff;
			Vy+=this._VI._yoff;
		}while(this._m.onTheLimits(Vx,Vy));


		if(bestD<this._dov){
			// Show field of view
			this._v2d.drawLine((this._o.getFOV()/this._w)*i-this._o.getFOV()/2,bestD,"#DCDCDC",0.3);
			this.drawRayWall(bestD,i);
		}
	}

	findWall(x,y,bestD,Int){

		if(this._m.isSolidWallbyPixel(x,y)){
			bestD=this.checkPoint(x,y,bestD,Int);
		}else if(this._m.getWallbyPixel(x,y)!=0){
			this._m.getWallbyPixel(x,y).setVisible(true,this._hitObj);
		}
		return bestD;
	}

	// Check distance of the point
	checkPoint(x,y,bestD,Int){
		let d = this.getDistance(this._o._x,this._o._y,x,y);

		if(d<bestD){
			bestD=d;

			Int.setWallHitOffset(x,y);
			this._bestInt = Int;
			let Gy = Math.floor(y / this._m._gridSize);
			let Gx = Math.floor(x / this._m._gridSize);
			Int.setWallType(this._m.getWallbyPixel(x,y));
		}
		return bestD;
	}
	// Get distance between points a and b
	getDistance(ax,ay,bx,by){
		return Math.hypot(bx-ax,by-ay);
	}

	drawRayWall(bestD,offGr){
		// Avoid "fishbowl effect"
		// cos of the angle respect the viewing angle multiplied with the distance
		let angle =  ((this._o.getFOV()/this._w)*offGr) - (this._o.getFOV()/2)  ;
		bestD=bestD*Math.cos(angle*Math.PI/180);
		this._ctx.beginPath();
		// Projected Slice Height
		let psh = this._m._gridSize / bestD * this._dpp;
		// Center of the projection plane is 100 // canvas height/2 --> center is 50
		let cpp = this._c.height/2;
		
		if(this._bestInt.getWallType().isWall()){
			let alpha = 1-bestD/this._eagle;
			this._ctx.globalAlpha = alpha;
			if(bestD<this._eagle){
			this._ctx.drawImage(this._bestInt.getWallType()._t.get(),Math.floor(this._bestInt.getWallHitOffset())%this._m._gridSize,0,1,this._m._gridSize,this._w-offGr,cpp+(psh/2),1,-psh);
			}
			this._zindex[this._w-offGr]=bestD;
			this._ctx.globalAlpha = 1;
		}
	}
}
