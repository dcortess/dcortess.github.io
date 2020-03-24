/*Copyright 2020 Félix Albertos Marco

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

class Room{
	constructor(g){
		this._g = g;
		this._rooms= [];
	}

	del(id){
		this._rooms[id] = null;
	}

	get(id){
		return this._rooms[id];
	}

	load(id,d){
		this._rooms[id] = d.replace(" ","0").replace(/(?:\r\n|\r|\n)/g, '');
	}
	run(id){
		for(let i=0;i<this._rooms[id].length;i++){
			this._g.addItem(this._rooms[id][i],i%this._g._m._nX*this._g._m._gridSize+this._g._m._gridSize/2,Math.floor(i/this._g._m._nX)*this._g._m._gridSize+this._g._m._gridSize/2);
		}
	}

}
