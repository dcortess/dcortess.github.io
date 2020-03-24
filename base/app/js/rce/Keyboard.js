/*Copyright 2020 Félix Albertos Marco

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

class Keyboard{
	constructor(){
		this._kp = []; // Keypressed
		window.addEventListener("keydown", () => this.keypress(window.event));
		window.addEventListener("keyup", () => this.keyup(window.event));
	}

	keypress(e){
		let i = this._kp.indexOf(e.key);
		if(i<0){
			this._kp.push(e.key);
		}
	}

	keyup(e){
		let i = this._kp.indexOf(e.key);
		if(i>=0){
			this._kp.splice(i,1);
		}
	}

	keypressed(){
		return this._kp;
	}

	ispressed(v){
		return (this._kp.indexOf(v)>=0);
	}
}

class pausedKeyboard extends Keyboard{
	constructor(pauseKey){
		super();
		this._pk = pauseKey;
	}
	
	keypress(e){
		if(e.key==this._pk){
			this._kp[0] = e.key;
		}
	}

	keyup(e){
		
	}
}
