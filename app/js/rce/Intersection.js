/*Copyright 2020 Félix Albertos Marco

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Calculate intersections
class Intersection{
	// Origin coordinates (the player)
	constructor(gridSize){
		this._gs = gridSize;
		this._x = null; // Intersection values
		this._y = null;
		this._xoff = null; // Offset
		this._yoff = null;
		this._hxoff = null; // hit coordinate for textures
		this._hyoff = null;
		this._wallType = null; // Type of wall for textures
	}

	run(originX,originY,angle){
		this._ox = originX;
		this._oy = originY;
		this._a = angle;
		this._calculate(angle);
	}

	// Returns the offset of the intersection respect the wall
	getWallHitOffset(){

	}

	setWallType(t){
		this._wallType = t;
	}

	getWallType(){
		return this._wallType;
	}

}

class HorizontalIntersection extends Intersection{
	constructor(gs){
		super(gs);
	}

	_calculate(angle){
		this._xoff = this._gs/Math.tan(angle*Math.PI/180);
		let facingA = null;
		if(angle>0 && angle<180){
			facingA = -0.0001;
			this._yoff = -this._gs;
		}else{
			facingA = this._gs;
			this._yoff = this._gs;
		}
		if(angle>180 && angle<=360){
			this._xoff = -this._xoff;	
		}

		this._y = Math.floor(this._oy/this._gs) * this._gs + facingA;
		this._x = this._ox + (this._oy- this._y) / Math.tan((angle)*Math.PI/180);

	}

	setWallHitOffset(x,y){
		this._hxoff = x;
	}

	getWallHitOffset(){
		return this._hxoff;
	}
}

class VerticalIntersection extends Intersection{
	constructor(gs){
		super(gs);
	}

	_calculate(angle){
		this._yoff = this._gs*Math.tan((angle)*Math.PI/180);
		let facingA = null;
		let facingB = null;
		if(angle>90 && angle<270){
			facingB = -0.0001;
			this._xoff = -this._gs;
		}else{
			facingB = this._gs;
			this._xoff = this._gs;
			this._yoff = -this._yoff;
		}
		this._x =  Math.floor(this._ox/this._gs) * this._gs + facingB;
		this._y = this._oy + (this._ox-this._x) * Math.tan((angle)*Math.PI/180);
	}

	setWallHitOffset(x,y){
		this._hyoff = y;
	}
	getWallHitOffset(){
		return this._hyoff;
	}
}
