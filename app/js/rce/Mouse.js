/*Copyright 2020 Félix Albertos Marco

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

class Mouse{
	constructor(c){
		this.ini(c);
		this._a = 0;
		this._lmb =false; // left mouse button
	}

	ini(c){
		document.addEventListener('pointerlockchange', this._lockChangeAlert, false);
		let _this=this;
		c.onclick = function() {
  			c.requestPointerLock();
		}
		_this = this;
		document.addEventListener("mousemove", function(e) {
  		var movementX = e.movementX       ||
                		e.mozMovementX    ||
                  		e.webkitMovementX ||
                  		0;
        	_this._a-=movementX/7;
		}, false);

		document.addEventListener("mousedown", function(e) {
	  		if(event.button==0){
	  			_this._lmb=true;
	  		}
		}, false);

		document.addEventListener("mouseup", function(e) {
	  		if(event.button==0){
	  			_this._lmb=false;
	  		}
		}, false);
	  		
	}

	getAngle(){
		let z=this._a;
		this._a=0;
		return z;
	}

	getClickLmb(){
		return this._lmb;
	}
}

class pausedMouse extends Mouse{
	constructor(c){
		super();
	}

	ini(c){}
}
