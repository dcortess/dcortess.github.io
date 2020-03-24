/*Copyright 2020 Félix Albertos Marco

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// If game changes grid size, change textures to that size
class Game{
	constructor(files,rows,grid){
		// load textures
		this._textures = [];
		this._loadTextures(grid);
		this._data = new CustomDATA();
		this._rooms = new Room(this);
		this._p = null;
		this._k = new Keyboard();
		this._o=null; // addItem
	}

	_hardBoot(id,files,rows,grid){
		this._m = new Map(files,rows,grid);
		this._RCE = new RCEngine(this._m,'rc',false);
		this._rooms.run(0);
		this._m2d = new map2DView(this._p,this._m,document.getElementById("miCanvas"));
		this._RCE.setOrigin(this._p);
		this._RCE.set2DView(this._m2d);
		this._mouse = new Mouse(this._RCE._c);
		this._over = new Overlay(this._RCE._c);
		this._over.setContent(this._data.get('GameInstruccions'));
		this._paused=false;
		this._RCE.ini_Variables();
	}

	_changeRoom(id){
		this._m._reset();
		this._rooms.run(id);
	}

	addItem(id,x,y){
		switch(id){
			case 'P':
				if(this._p == null){
					this._p = new Player(x,y);
				}else{
					this._p.setPosition(x,y);
				}
				break;
			case 'a':
				this._o = new Object(this,x,y,new ImageTexture(["app/img/obja.png"]));
				break;
			case 'b':
				this._o = new Object(this,x,y,new ImageTexture(["app/img/objb.png"]));
				break;
			case 'c':
				this._o = new Object(this,x,y,new ImageTexture(["app/img/objc.png"]));
				break;
			case 'd':
				this._o = new Object(this,x,y,new ImageTexture(["app/img/objd.png"]));
				break;
			case 'e':
				this._o = new Object(this,x,y,new ImageTexture(["app/img/obje.png"]));
				break;
			case 'f':
				this._o = new Object(this,x,y,new ImageTexture(["app/img/objf.png"]));
				break;
			case 'g':
				this._o = new Object(this,x,y,new ImageTexture(["app/img/objg.png"]));
				break;
			case 'h':
				this._o = new Object(this,x,y,new ImageTexture(["app/img/objh.png"]));
				break;
			case 'i':
				this._o = new Object(this,x,y,new ImageTexture(["app/img/obji.png"]));
				break;
			case 'j':
				this._o = new Object(this,x,y,new ImageTexture(["app/img/objj.png"]));
				break;
		  	default:
				if(id>0){
					this._o = new Wall(this,x,y,this._RCE._tx[id]);
				}
		}
		if(this._o!=null){
			this._m.addObject(this._o);
		}	
	}

	_setTimer(){
		window.setInterval(() => this.update(), 1000/30);
	}

	update(){
		let k = this._k.keypressed();
		this.saveMovement();
		for(let i=0;i<k.length;i++){
			switch(k[i]){
				case 'w':
					this._p.moveForward();
					break;
				case 's':
					this._p.moveBack();
					break;
				case 'a':
					this._p.moveLeft();
					break;
				case 'd':
					this._p.moveRight();
					break;
				case 'p':
					this._pause(k[i]);
					break;
				case '0':
					this._changeRoom(0);
					break;
				case '1':
					this._changeRoom(1);
					break;
			}
		};

		this._p.rotate(this._mouse.getAngle());

		if(this._mouse.getClickLmb()){
			this._p.action();
		}

		this.checkMovement();
		this._m2d.update();
		this._RCE.update();
	}

	saveMovement(){
		this._preX = this._p._x;
		this._preY = this._p._y;
	}

	checkMovement(){
		if(this._m.isSolidWallbyPixel(this._p._x,this._preY)){
			this._p._x = this._preX;
		}
		if(this._m.isSolidWallbyPixel(this._p._x,this._p._y)){
			this._p._y = this._preY;
		}
		// Check over object for actions
		let o = this._m.getWallbyPixel(this._p._x,this._p._y);
		if(this._m.getWallbyPixel(this._p._x,this._p._y)){
			if(o.isUsable()){
				o.touch(this._p);
			}
		}

	}

	_pause(key){
		if(this._paused){
			this._k = new Keyboard();
			this._mouse = new Mouse(this._RCE._c);
		}else{
			this._k = new pausedKeyboard(key);
			this._mouse = new pausedMouse();
		}
		this._paused=!this._paused;
		this._over._setVisible(this._paused);
	}

	_loadTextures(gridSize){
	}

	_start(){
		this._setTimer();
	}

	_fire(p){
	}

	addExplosion(x,y){
		let o = new Sprite(this,x,y,this._textures['explosion']);
		this._m.addObject(o);
	}
	
}
