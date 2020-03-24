/*Copyright 2020 Félix Albertos Marco

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

class Overlay{
	constructor(e){
		
		this._div = document.createElement("div");
		
		this._ini(e);
	}

	_ini(e){
		let x=window.getComputedStyle(e,null).getPropertyValue("left");
		let y=window.getComputedStyle(e,null).getPropertyValue("top");
		let w=window.getComputedStyle(e,null).getPropertyValue("width");
		let h=window.getComputedStyle(e,null).getPropertyValue("height");
		document.body.appendChild(this._div);
		this._div.style.position ="fixed";
		this._setPosition(x,y);
		this._setSize(w,h);
		this._div.style.backgroundColor="rgba(0,0,0,0.9)";
		this._visible=false;
		this._setVisible(this._visible);
	}

	_setPosition(x,y){
		this._div.style.left= x;
		this._div.style.top = y;
	}
	_setSize(w,h){
		this._div.style.width = w;
		this._div.style.height = h;
	}
	_setVisible(v){
		this._visible=v;
		this._update();
	}
	_update(){
		if(this._visible){
			this._div.style.display="block";
		}else{
			this._div.style.display="none";
		}
	}
	_isVisible(){
		return this._visible;
	}
	_switchVisible(){
		this._setVisible(!this._visible);
		return this._isVisible();
	}

	setContent(c){
		this._div.innerHTML = c;
	}


}
