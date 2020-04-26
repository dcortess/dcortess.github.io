/*Copyright 2020 Félix Albertos Marco

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Background
// For been used with RCEngine
class Background{
	constructor(ctx,width,height){
		this._ctx=ctx;
		this._w=width;
		this._h=height;
	}
	draw(){
	}
}

class SolidBackground extends Background{
	constructor(ctx,width,height,color1){
		super(ctx,width,height);
		this._c1=color1;
	}
	draw(){
		this._ctx.fillStyle=this._c1;
		this._ctx.fillRect(0,0,this._w,this._h);
	}
}

class GradientBackground extends SolidBackground{
	constructor(ctx,width,height,color1,color2){
		super(ctx,width,height,color1);
		this._c2=color2;
	}
	createGradient(){
	}
	draw(){
	}
}

class ImageBackground extends Background{
	constructor(ctx,width,height,image){
		super(ctx,width,height);
		this._url=image;
		this._image=null;
		this._loadImage();
	}
	_loadImage(){
		this._image=new Image();
		let _this=this;
		this._image.onload=function(){
			_this._imgViewPort=_this._image.width/6;
			_this._imgStep=_this._image.width/360;
		}
		this._image.src=this._url;
	}
	draw(angle){
		angle=360-angle;
		this._ctx.drawImage(this._image,angle*this._imgStep,0,this._imgViewPort,this._image.height,0,0,this._w,this._h/2);
		this._ctx.drawImage(this._image,0,0,this._imgViewPort,this._image.height,this._w-((this._w/60)*((angle+60)%360)),0,this._w,this._h/2);

		//this._w=width;
		//this._h=height;
	}
}


class GradientCeiling extends GradientBackground{
	constructor(ctx,width,height,color1,color2){
		super(ctx,width,height,color1,color2);
		this.draw();
	}
	createGradient(){
		this._my_gradient=this._ctx.createLinearGradient(this._w/2,0,this._w/2,this._h/2);
		this._my_gradient.addColorStop(0,this._c1);
		this._my_gradient.addColorStop(1,this._c2);
		this._ctx.fillStyle=this._my_gradient;
	}
	draw(){
		this.createGradient();
		this._ctx.fillRect(0,0,this._w,this._h/2);
	}
}

class SolidCeiling extends SolidBackground{
	constructor(ctx,width,height,color1){
		super(ctx,width,height,color1);
	}
	draw(){
		this._ctx.fillStyle=this._c1;
		this._ctx.fillRect(0,0,this._w,this._h/2);
	}
}


class GradientGround extends GradientBackground{
	constructor(ctx,width,height,color1,color2){
		super(ctx,width,height,color1,color2);
		this.draw();
	}
	createGradient(){
		this._my_gradient=this._ctx.createLinearGradient(this._w/2,this._h/2,this._w/2,this._h);
		this._my_gradient.addColorStop(0,this._c1);
		this._my_gradient.addColorStop(1,this._c2);
		this._ctx.fillStyle=this._my_gradient;
	}
	draw(){
		this.createGradient();
		this._ctx.fillRect(0,this._h/2,this._w,this._h/2);
		//this._ctx.drawImage("app/img/wall2.png",0,0,this._c.width,this._c.height/2);
	}
}

class SolidGround extends SolidBackground{
	constructor(ctx,width,height,color1){
		super(ctx,width,height,color1);
	}
	draw(){
		this._ctx.fillStyle=this._c1;
		this._ctx.fillRect(0,this._h/2,this._w,this._h/2);
	}
}
