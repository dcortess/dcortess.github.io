/*Copyright 2020 Félix Albertos Marco

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

class Map{
	constructor(nx,ny,gs){
		this._nX = nx; // celdas de ancho
		this._nY = ny; // celdas de altos
		this._data = new Array(this._nX*this._nY);
		this._data.fill(false);
		this._gridSize = gs; // Pixels height and width of each tile 
		this._width = this._nX*this._gridSize;
		this._height = this._nY*this._gridSize;
		this._objs = [];
	}

	_reset(){
		this._data.fill(false);
		this._objs = [];
	}

	_setType(x,y,t){
		this._data[x+(y*this._nX)]=t;
	}

	setTypebyPixel(x,y,t){
		this._setType(Math.floor(x/this._gridSize),Math.floor(y/this._gridSize),t);
	}

	getSizeX(){
		return this._nX;
	}
	getSizeY(){
		return this._nY;
	}

	setWall(x,y){
		this._setType(x,y,1);
	}

	setPillar(x,y){
		this._setType(x,y,4)
	}

	setDoor(x,y){
		this._setType(x,y,2);
	}

	clearPosition(x,y){
		this._setType(x,y,false);
	}

	clearPositionbyPixel(x,y){
		this.clearPosition(Math.floor(x/this._gridSize),Math.floor(y/this._gridSize));
	}

	setVideo(x,y){
		this._setType(x,y,3);
	}

	getWall(x,y){
		if(x>=0&&x<this._nX&&y>=0&&y<this._nY){
			return this._data[x+(y*this._nX)];
		}else{
			return false;
		}
	}

	delWall(x,y){
		this._setType(x,y,false);
	}

	addObject(o){
		if(this.getWallbyPixel(o._x,o._y)){
			return false;
		}else{
			if(!o.isWall()){
				this._objs.push(o);
			}
			this.setTypebyPixel(o._x,o._y,o);
			return true;
		}
	}
	
	remObject(o){
		let i = this._objs.indexOf(o);
		if(i>=0){
			this._objs.splice(i,1);
		}
		this.setTypebyPixel(o._x,o._y,false);
	}

	// Get Wall from pixel coordinates on the map
	getWallbyPixel(x,y){ 
		return this.getWall(Math.floor(x/this._gridSize),Math.floor(y/this._gridSize));
	}

	delWallbyPixel(x,y){
		this.delWall(Math.floor(x/this._gridSize),Math.floor(y/this._gridSize));
	}

	// Solid walls are represented by numbers and class wall
	isSolidWallbyPixel(x,y){
		return this.isSolidWall(Math.floor(x/this._gridSize),Math.floor(y/this._gridSize));
	}

	isSolidWall(x,y){
		if(Number.isInteger(this.getWall(x,y))){
			return true;
		}if(this.getWall(x,y)!=false){
			return this.getWall(x,y).isWall();
		}
		return false;
	}

	onTheLimits(x,y){
		if(x>this._width||x<0||y>this._height||y<0){
			return false;
		}
		return true;
	}

}
