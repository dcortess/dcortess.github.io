/*Copyright 2020 Félix Albertos Marco

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

class Object{
	constructor(id,g,x,y,t){
		this._id = id;
		this._g = g; // game
		this._x = x;
		this._y = y;
		this._t = t;
		this._v = false; // is visible
		this._u = false; // usable, can be taken
		this._k = false; // killable
		this._prop = []; // Properties, free to use
	}
	isVisible(){
		return this._v;
	}
	setVisible(v,hitObj){
		if(!this._v&&v){
			hitObj.push(this);
		}
		this._v = v;
	}
	// Process on each iteration
	run(){

	}

	die(){
		CustomGame.com(
			"dieObject",
			this,
			[
				CustomGame.getCellX(this._x),
				CustomGame.getCellY(this._y)
			]
		);
	}

	isUsable(){
		return this._u;
	}

	touch(){
			CustomGame.com(
				"touchItem",
				this,[
					CustomGame.getCellX(this._x),
					CustomGame.getCellY(this._y)
				]
			);
	}
	use(){}

	isKillable(){
		return this._k;
	}

	/*getResource(){
		return this._t.get();
	}*/
	getFrame(){
		return this._t.get();
	}

	isWall(){
		return false;
	}
	setX(x){
		this._x=x;
	}
	setY(y){
		this._y=y;
	}
	setProp(id,p){
		this._prop[id]=p;
	}
	getProp(id){
		return this._prop[id];
	}
	delProp(id){
		this._prop[id]=null;
	}
}

class movingObject extends Object{
	constructor(id,g,x,y,a,t){
		super(id,g,x,y,t);
		this._a = a; // Angle
		this._s = this._g._m._gridSize/2; // Speed
	}

	run(){
		super.run();
		this._preMove();
		this._postMove();
	}
	_preMove(){
		this._g._m.remObject(this);
		this._x+=Math.cos(this._a*Math.PI/180)*this._s;
		this._y-=Math.sin(this._a*Math.PI/180)*this._s;
	}

	_postMove(){
		this._g._m.addObject(this);
	}
}

class movingObjectKill extends movingObject{
	constructor(id,g,x,y,a,t,h){
		super(id,g,x,y,a,t);
		this._hurting=h;
	}

	// Updates position
	x__run(){
		super.run();
		this._g._m.remObject(this);
		this._x+=Math.cos(this._a*Math.PI/180)*this._s;
		this._y-=Math.sin(this._a*Math.PI/180)*this._s;
		this._g._m.addObject(this);
		return true;
	}

	run(){
		//this._preMove();
		//this._postMove();
		super.run();
	}

	_preMove(){
		super._preMove();
	}

	_postMove(){
		let o = this._g._m.getWallbyPixel(this._x,this._y);
		if(o){
			try{
				if(o.isKillable()){
					o.die(this._hurting);
				}else if(o.isWall()){
					//this._g.addExplosion(Math.floor(this._x),Math.floor(this._y));
				}
			}catch(err){
				console.log(err.message);
			}
		}else{
			this._g._m.addObject(this);
		}
	}
}

class usableItem extends Object{
	constructor(id,g,x,y,t){
		super(id,g,x,y,t);
		this._u = true;
	}

	touch(p){
		if(p.takeItem(this)){
			super.touch(p);
			this._g._m.remObject(this);
		}
	}


	use(p){

	}
}

class usableItemShot extends usableItem{
	constructor(id,g,x,y,t,h){
		super(id,g,x,y,t);
		this._hurting=h;
	}

	touch(p){
		super.touch(p);
	}

	use(p){
		this._g._m.addObject(new movingObjectKill(p.id,this._g,Math.floor(p._x),Math.floor(p._y),p._angle,this._t,this._hurting));
	}
}


class Portal extends usableItem{
	constructor(id,g,x,y,t,roomID){
		super(id,g,x,y,t);
		this._roomID=roomID;
	}

	touch(p){
		super.touch(p);
		p.useItem(this);
	}

	use(p){
		this._g._changeRoom(this._roomID);
	}
}

class killableItem extends Object{
	constructor(id,g,x,y,t){
		super(id,g,x,y,t);
		this._k = true;
	}

	die(h){
		super.die(h);
		this._g._m.remObject(this);
	}
}

class killableItemHurts extends killableItem{
	constructor(id,g,x,y,t,h){
		super(id,g,x,y,t);
		this._hurts = h;
	}

	die(h){
		if(this._itHurts(h)){
			super.die(h);
		}
	}
	_itHurts(h){
		return h==this._hurts;
	}
}

class Profesor extends killableItem{
	constructor(id,g,x,y,t,live,hurts){
		super(id,g,x,y,t);
		this._TotalLive=live;
		this._CurrentLive=live;
		this._hurts = hurts;

	}

	die(h){
		if(this._itHurts(h)){
			this._CurrentLive--;
			if(this._CurrentLive<=0){
				super.die(h);
			}
			this._t.update(100-100*(this._CurrentLive/this._TotalLive));
		}
	}

	_itHurts(h){
		return h==this._hurts;
	}
}

class explosiveObject extends killableItem{
	constructor(id,g,x,y,t){
		super(id,g,x,y,t);
	}

	die(h){
		super.die(h);
		this._g.addExplosion(this._x,this._y);
	}
}

class Sprite extends Object{
	constructor(id,g,x,y,t){
		super(id,g,x,y,t);
		this._c = 0; // Count for texture frame
		this._tt = 4; // aux
		this._f = 0; //aux
		this._fs = 0;
		this._fe = this._t.getNumberSprites();
	}

	run(){
		this._f++;
		this._c+= Math.floor(this._f/this._tt);
		this._f= this._f%this._tt;
		if(this._c==this._fe){
			this._framesEnd();
		}
	}

	_framesEnd(){
		this._g._m.remObject(this);
	}

	getFrame(){
		return this._t.getSpriteNumber(this._c);
	}
}

class SpriteBucle extends Sprite{
	constructor(id,g,x,y,t){
		super(id,g,x,y,t);
	}

	run(){
		super.run();
	}

	die(h){
		super.die(h);
		this._g._m.remObject(this);
	}

	_framesEnd(){
		this._c=this._fs;
		this._f=0;
		this.run(); // ¿?
	}
}

class NPC extends Sprite{
	constructor(id,g,x,y,t,normalFrameStart,normalFrameEnd,endFrameStart,endFrameEnd,hurts){
		super(id,g,x,y,t);
		this._fs=normalFrameStart;
		this._fe=normalFrameEnd;
		this._efs=endFrameStart;
		this._efe=endFrameEnd;
		this._k=true; // killableItem -> does sprite extend from it?
		this._end = false;//
		this._hurts = hurts;
		this._c = this._fs;
		this._f = 0;
	}

	run(){
		super.run();
	}

	die(h){
		if(this._itHurts(h)){
			if(this._end){
			//	super.die(h);
			}else{
				//super.die(h);
				// It will die when the animation ends (_framesEnd)
				this._end = true;
				this._c = this._efs;
				this._fe = this._efe;
				this._f=0;
			}
		}
	}

	_itHurts(h){
		return h==this._hurts;
	}

	_framesEnd(){
		if(this._end){
			super.die();
			super._framesEnd();
		}else{
			this._c = this._fs;
			this._f = 0;
		}
	}
}

class Wall extends Object{
	constructor(id,g,x,y,t){
		super(id,g,x,y,t);
	}

	isWall(){
		return true;
	}
	isBreakableWall(){
		return false;
	}

}

class breakableWall extends Wall{
	constructor(id,g,x,y,t){
		super(id,g,x,y,t);
		this._k = true;
	}

	isBreakableWall(){
		return true;
	}

	die(){
		super.die();
		this._g._m.remObject(this);
		//this._g.addExplosion(this._x,this._y);
		// com arguments
		// "breakWall"
		// object broked
		// x cell, y cell
		//CustomGame.com(
		//	"breakWall",
		//	this,
		//	[
		//		CustomGame.getCellX(this._x),
		//		CustomGame.getCellY(this._y)
		//	]
		//);
	}
}

class breakableWallHurts extends breakableWall{
	constructor(id,g,x,y,t,h){
		super(id,g,x,y,t);
		this._hurts = h;
	}

	die(h){
		if(this._itHurts(h)){
			super.die();
		}
	}
	_itHurts(h){
		return h==this._hurts;
	}
}
