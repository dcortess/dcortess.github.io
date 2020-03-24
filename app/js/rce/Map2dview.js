/*Copyright 2020 Félix Albertos Marco

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

class map2DView{
	constructor(origin,map,canvas){
		this._p = origin;
		this._m = map;
		this._c = canvas;
		this._ctx = canvas.getContext("2d");
		this._f=0.1; // Scale factor
		this._c.width = map._width*this._f;
		this._c.height = map._height*this._f;
		this._ctx.scale(this._f,this._f);

	}

	clearView(){
		this._ctx.clearRect(0, 0, this._c.width/this._f, this._c.height/this._f);
	}

	drawGrid(){
		this._ctx.strokeStyle ="black";
		for(let i = 0;i< this._m.getSizeY();i++){
			this._ctx.beginPath();
			this._ctx.moveTo(0,i*this._m._gridSize);
			this._ctx.lineTo(this._m._nX*this._m._gridSize,i*this._m._gridSize)

			this._ctx.stroke();
		}

		for(let i = 0;i< this._m.getSizeX();i++){
			this._ctx.beginPath();
			this._ctx.moveTo(i*this._m._gridSize,0);
			this._ctx.lineTo(i*this._m._gridSize,this._m._nY*this._m._gridSize)
			this._ctx.stroke();
		}
	}

	// Draw player on canvas
	drawPlayer(){
		this.drawPoint(this._p._x,this._p._y,5);
		//this.drawPOV();
		//this.drawFOV();
	}

	// Draw from origin with the angle offset
	drawLine(angleOff,size,color,alpha){
		let angle = this._p._angle+angleOff;
		this._ctx.beginPath();
		this._ctx.moveTo(this._p._x,this._p._y);
		this._ctx.lineTo(this._p._x+(Math.cos(angle*Math.PI/180)*size),this._p._y-(Math.sin(angle*Math.PI/180)*size));
		this._ctx.strokeStyle =color;
		let save = this._ctx.globalAlpha;
		this._ctx.globalAlpha=alpha;
		this._ctx.stroke();
		this._ctx.globalAlpha = save;
	}

	// Point of View
	drawPOV(){
		this.drawLine(0,200,"black",1);
	}

	// Field of View
	drawFOV(){
		this.drawLine(-(this._p.getFOV()/2),200,"black",1);
	}

	drawWalls(){
		for(let x = 0;x< this._m.getSizeX();x++){
			for(let y = 0;y<this._m.getSizeY();y++){
				if(this._m.isSolidWall(x,y)){
					this.drawWall(x,y);
				}
			}
		}

	}

	drawPoint(x,y,s){
		this._ctx.beginPath();
		this._ctx.arc(x,y,s,0,2*Math.PI);
		this._ctx.stroke();
	}

	drawWall(x,y){
		this._ctx.beginPath();
		this._ctx.rect(x*this._m._gridSize,y*this._m._gridSize,this._m._gridSize,this._m._gridSize);
		this._ctx.fillStyle = 'rgba(0,255,0,0.1)';
		this._ctx.fill();
	}

	drawObjects(){
		let _this = this;
		this._m._objs.forEach(function(o){
			//_this.drawPoint(o._x,o._y,o._t._resource.width/2);
			let alfa =Math.atan2(_this._p._y-o._y,_this._p._x-o._x)*180/Math.PI;

			if(alfa<0){
				alfa+=360;
			}
			_this._ctx.beginPath();
			_this._ctx.moveTo(o._x+(Math.sin(alfa*Math.PI/180)*(o.getFrame().width/2)),o._y-(Math.cos(alfa*Math.PI/180)*(o.getFrame().width/2)));
			_this._ctx.lineTo(o._x-(Math.sin(alfa*Math.PI/180)*(o.getFrame().width/2)), o._y+(Math.cos(alfa*Math.PI/180)*(o.getFrame().width/2)));
			_this._ctx.strokeStyle="black";
			_this._ctx.stroke();

		});
	}

	update(){
		this.clearView();
		this.drawGrid();
		this.drawPlayer();
		this.drawWalls();
		this.drawObjects();
	}
}
