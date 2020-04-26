/*Copyright 2020 Félix Albertos Marco

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Player will be an origin
class Player{
	constructor(x,y){
		this._x = x;
		this._y = y;
		this._angle = 0; // where is the player looking at
		this._a = 32;
		this._FOV = 60; // Grades - 60 is OK
		this._move = 8; // Movement/rotation speed
		this._rotate = 3;
		this._item = [];
		this._selitem = 1;
		this._defaultItem = null; //new usableItemShotDefault();
		this._ini();
	}

	_ini(){
		for(let i=0;i<10;i++){
			this._item[i] = this._defaultItem;
		}
	}

	moveForward(){
		this._x+=Math.cos(this._angle*Math.PI/180)*this._move;
		this._y-=Math.sin(this._angle*Math.PI/180)*this._move;
	}
	moveBack(){
		this._x-=Math.cos(this._angle*Math.PI/180)*this._move;
		this._y+=Math.sin(this._angle*Math.PI/180)*this._move;
	}
	moveRight(){
		this._x+=Math.cos((this._angle-90)*Math.PI/180)*this._move;
		this._y-=Math.sin((this._angle-90)*Math.PI/180)*this._move;
	}
	moveLeft(){
		this._x+=Math.cos((this._angle+90)*Math.PI/180)*this._move;
		this._y-=Math.sin((this._angle+90)*Math.PI/180)*this._move;
	}
	// AntiClockwise
	rotateACW(){
		this._angle=(this._angle+this._rotate)%360;
	}
	// ClockWise
	rotateCW(){
		this._angle=this._angle-this._rotate
		if(this._angle<0){
			this._angle=360+this._angle;
		}
	}

	rotate(a){
		this._angle+=a;
		if(this._angle<0){
			this._angle=360+this._angle;
		}else{
			this._angle=this._angle%360;
		}
	}

	setPosition(x,y){
		this._x = x;
		this._y = y;
	}

	getFOV(){
		return this._FOV;
	}

	touchItem(i){

	}

	takeItem(i){
		if(!this._item[this.getSelectedItem()]){
			this._item[this.getSelectedItem()] = i;
			// com arguments
			// "takeItem"
			// Object taken
			// x cell, y cell
			CustomGame.com(
				"takeItem",
				this._item[this.getSelectedItem()],[
					CustomGame.getCellX(this._x),
					CustomGame.getCellY(this._y)
				]
			);

			return true;
		}
		return false;
	}

	useItem(i){
		i.use()
	}

	action(){
		if(this._item[this.getSelectedItem()]){
			this._item[this.getSelectedItem()].use(this);
				// com arguments
				// "useItem"
				// Object used
				// x cell, y cell
				CustomGame.com(
					"useItem",
					this._item[this.getSelectedItem()],[
						CustomGame.getCellX(this._x),
						CustomGame.getCellY(this._y)
					]
				);
		}
	}

	dropItem(){
		if(this._item[this.getSelectedItem()]){
			// get next cell position for dropping objects
			let px=this._x+Math.cos(this._angle*Math.PI/180)*CustomGame.getGame().getMap().getGridSize();
			let py=this._y-Math.sin(this._angle*Math.PI/180)*CustomGame.getGame().getMap().getGridSize();
			this._item[this.getSelectedItem()].setX(px);
			this._item[this.getSelectedItem()].setY(py);
			if(CustomGame.getGame().getMap().addObject(this._item[this.getSelectedItem()])){
				let droppedItem=this._item[this.getSelectedItem()];
				this._item[this.getSelectedItem()]= this._defaultItem;//new usableItemShotDefault();
				// com arguments
				// "dropItem"
				// Object dropped
				// x cell, y cell
				CustomGame.com(
					"dropItem",
					droppedItem,[
						CustomGame.getCellX(px),
						CustomGame.getCellY(py)
					]
				);
			}
		}
	}
	selNItem(i){
		if(i>=0&&i<10){
			this._selitem=i;
			CustomGame.com(
				"selectItem",
				this._item[this.getSelectedItem()],[
					i
				]
			);
		}
	}
	getNItem(n){
		if(n>=0&&n<10){
			return this._item[n];
		}else{
			return null
		}

	}

	getSelectedItem(){
		return this._selitem;
	}


}
