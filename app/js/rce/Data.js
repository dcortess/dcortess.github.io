/*Copyright 2020 Félix Albertos Marco

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

//// DATA ////
class DATA{
	constructor(){
		this._data=[];
		this._ini();
	}
	set(id,d){
		this._data[id]=d;
	}
	get(id){
		return this._data[id];
	}
	del(id){
		this._data[id]=false;
	}

	_ini(){

let aux=`
<h2>How to play:<h2>
<p>[p] pause/resume</p>
<p>[a] left</p>
<p>[d] right</p>
<p>[w] forward </p>
<p>[s] backward</p>
<p>[mouse] look left/right</p>
<p>[mouse left click] fire</p>
`;
		this.set('GameInstruccions',aux);
	}
}
