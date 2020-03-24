/*Copyright 2020 Félix Albertos Marco

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

class Texture{
	constructor(src){
		this._i = 0; //index
		this.create();
		this.load(src[0]);
	}
	create(){}
	load(src){
		this._resource.src = src;
	}
	get(){
		return this._resource;
	}
}

class ImageTexture extends Texture{
	constructor(src){
		super(src);
	}

	create(){
		this._resource = new Image();
	}

	load(src){
		super.load(src);
		this._resource.onload = function(){
  		}
	}
}

class BarImageTexture extends ImageTexture{
	constructor(src,percent){
		super(src);
		this._p=percent;
	}

	load(src){
		super.load(src);
		let _this=this;
		this._resource.onload = function(){
			_this._resource = _this._adjust();
			_this._addBar();
  		}
	}

	_adjust(){
		let c = document.createElement('canvas');
		c.width = this._resource.width;
		c.height = this._resource.height; 
		c.getContext("2d").drawImage(this._resource,0,0,c.width,c.height,5,10,c.width-10,c.height-10);
		return c;
	}

	_addBar(){
		let ctx = this._resource.getContext("2d");
		ctx.strokeStyle="#FF0000";
		ctx.beginPath();
		ctx.moveTo(0,5);
		ctx.lineTo(this._resource.width*this._p/100,5);
		ctx.stroke();
	}

	_clearBar(){
		let ctx = this._resource.getContext("2d");
		ctx.clearRect(0,0,this._resource.width,10);
	}

	update(p){
		this._p=p;
		this._updateBar();
	}

	_updateBar(){
		this._clearBar();
		this._addBar();
	}

}

class SpriteTexture extends Texture{
	constructor(src,spritesNumber,rows,files,spriteWidth,spriteHeight,spriteRW,SpriteRH,ResizeX,ResizeY){
		super(src);
		this._r = rows;
		this._f = files;
		this._sn = spritesNumber;
		this._sw = spriteWidth;
		this._sh = spriteHeight;
		this._srw = spriteRW;
		this._srh = SpriteRH;
		this._as = []; // Array of sprites
		this._as.length = spritesNumber;
		this._c = document.createElement('canvas');
		this._c.width = spriteWidth*rows;
		this._c.height = spriteHeight*files;
		this._rsx = ResizeX;
		this._rsy = ResizeY;
	}

	create(){
		this._resource = new Image();
	}

	load(src){
		super.load(src);
		let _this = this;
		this._resource.onload = function(){
			_this._c.getContext("2d").drawImage(this,0,0,_this._sw,_this._sh,0,_this._sh,_this._ws*this._rsx,-_this._sh*this._rsy); // check canvas size and image size
			_this._createSprites();
  		}
	}

	get(){
		return this._c;
	}

	getSpriteNumber(n){
		return this._as[n];
	}
	getNumberSprites(){
		return this._sn;
	}

	_createSprites(){
		for(let i = 0;i<this._sn;i++){
			this._as[i] = this._createSprite(i);
		}
	}

	_createSprite(n){
		var c = document.createElement('canvas');
		c.width = this._srw;
		c.height = this._srh;
		let sx = n%this._r;
		let sy = Math.floor(n/this._r);
		c.getContext("2d").drawImage(this._resource,sx*this._sw,sy*this._sh,this._sw,this._sh,0,this._srh,this._srw*this._rsx,-this._srh*this._rsy);
		return c;
	}
}

// Esta textura/sprite permite animar paredes
class SpriteTextureWall extends SpriteTexture{
	constructor(src,spritesNumber,rows,files,spriteWidth,spriteHeight,spriteRW,SpriteRH,ResizeX,ResizeY){
		super(src,spritesNumber,rows,files,spriteWidth,spriteHeight,spriteRW,SpriteRH,ResizeX,ResizeY);
		this._tt=4;
		this._cc=0;
		this._f=0;
		this._fe=this.getNumberSprites();
	}

	get(){
		return this.getSpriteNumber(this._cc);
	}
	run(){
		this._f++;
		this._cc+= Math.floor(this._f/this._tt);
		this._f= this._f%this._tt;
		if(this._cc==this._fe){
			this._cc=0;
		}
	}
}

class SpriteTextureFiltered extends SpriteTexture{
	constructor(src,spritesNumber,rows,files,spriteWidth,spriteHeight,spriteRW,SpriteRH,ResizeX,ResizeY,arraySpriteNumbers){
		super(src,spritesNumber,rows,files,spriteWidth,spriteHeight,spriteRW,SpriteRH,ResizeX,ResizeY);
		this._asn = arraySpriteNumbers;
	}
	_createSprites(){
		for(let i=0;i<this._sn;i++){
			this._as[i] = this._createSprite(this._asn[i]);
		}
	}
}

class VideoTexture extends Texture{
	constructor(src){
		super(src);
	}
	create(){
		this._resource = document.createElement('video');
	}
	load(src){
		super.load(src);
		this._resource.oncanplay = function(){
	  		this.play();
  		}

  		this._resource.onended = function(){
  			this.play()
  		}

	}
}
