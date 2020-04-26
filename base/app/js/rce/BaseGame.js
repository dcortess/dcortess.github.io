class BaseGame{
	static game = null;
	static _obj=[];
	// Game
	static configureGame(files,rows,grid,fulscreen,minimap,debug){
		if(CustomGame.game==null){
			CustomGame.game=new Game(files,rows,grid,fulscreen,minimap,debug);
			CustomGame.updateInventory();
		}
	}
	static getGame(){
		if(CustomGame.game!=null){
			return CustomGame.game;
		}
		else{
			console.log("Debug: Game not configured");
		}
	}
	// Protocol
	// Proxy for protocol in CustomGame
	static com(msg,obj,par){
		if(msg=='restoreFromPause'){
			//CustomGame.restoreMessage();
		}else{
			//CustomGame.showMessage('CustomMessage');
		}
		//console.log(CustomGame.getObjects());
		if(CustomGame.getGame().isDebug()){
			BaseGame.printCom(msg,obj,par);
		}
		switch(msg){
			case 'dropItem':
				CustomGame.updateInventory();
				CustomGame.protocol(msg,obj,par);
				break;
			case 'takeItem':
				CustomGame.updateInventory();
				CustomGame.protocol(msg,obj,par);
				break;
			case 'touchItem':
				CustomGame.protocol(msg,obj,par);
				break;
			case 'useItem':
				CustomGame.updateInventory();
				CustomGame.protocol(msg,obj,par);
				break;
			case 'selectItem':
				CustomGame.updateInventory();
				CustomGame.protocol(msg,obj,par);
				break;
			case 'dieObject':
				CustomGame.protocol(msg,obj,par);
				break;
			case 'playerPosition':
				CustomGame.protocol(msg,obj,par);
				break;
			case 'speechToText':
				CustomGame.protocol(msg,obj,par);
				break;
		}
	}

	static printCom(msg,obj,par){
		console.log("**********");
		console.log("----------");
		console.log(msg);
		console.log("----------");
		console.log(obj);
		for(let i=0;i<par.length;i++){
			console.log(par[i]);
		}
		console.log("**********");
	}


	// Objects
	static remObj(o){
		CustomGame.getGame().getMap().remObject(o);
	}
	static addWallXY(x,y,id){
		x = x*CustomGame.getGame().getMap()._gridSize+CustomGame.getGame().getMap()._gridSize/2;
		y = y*CustomGame.getGame().getMap()._gridSize+CustomGame.getGame().getMap()._gridSize/2;
		console.log(x+" + "+y);
		CustomGame.getGame().addItem(id,x,y);
	}
	static remWallXY(x,y){
		CustomGame.getGame().getMap().delWall(x,y);
	}

	static setObject(id,o){
		CustomGame._obj[id]=o;
	}
	static getObject(id){
		return CustomGame._obj[id];
	}
	static delObject(id){
		CustomGame.remObj(CustomGame._obj[id]);
		CustomGame._obj[id]=null;
	}

	// Creation of objects
	static createItem(id,x,y,texture){
		CustomGame.setObject(
			id,
			new Object(
				id,
				CustomGame.getGame(),
				CustomGame.getPositionX(x),
				CustomGame.getPositionY(y),
				new ImageTexture([texture])
			)
		);
		return CustomGame.getGame().addObject(CustomGame.getObject(id)); 	
	}
	static createUsableItem(id,x,y,texture){
		CustomGame.setObject(
			id,
			new usableItem(
				id,
				CustomGame.getGame(),
				CustomGame.getPositionX(x),
				CustomGame.getPositionY(y),
				new ImageTexture([texture])
			)
		);
		return CustomGame.getGame().addObject(CustomGame.getObject(id)); 	
	}
	static createUsableItemShot(id,x,y,texture,hurt){
		CustomGame.setObject(
			id,
			new usableItemShot(
				id,
				CustomGame.getGame(),
				CustomGame.getPositionX(x),
				CustomGame.getPositionY(y),
				new ImageTexture([texture]),
				hurt
			)
		);
		return CustomGame.getGame().addObject(CustomGame.getObject(id)); 	
	}
	static createKillableItem(id,x,y,texture,hurts){
		CustomGame.setObject(
			id,
			new killableItemHurts(
				id,
				CustomGame.getGame(),
				CustomGame.getPositionX(x),
				CustomGame.getPositionY(y),
				new ImageTexture([texture]),
				hurts
			)
		);
		return CustomGame.getGame().addObject(CustomGame.getObject(id)); 	
	}
	static createBreakableWall(id,x,y,texture,hurts){
		CustomGame.setObject(
			id,
			new breakableWallHurts(
				id,
				CustomGame.getGame(),
				CustomGame.getPositionX(x),
				CustomGame.getPositionY(y),
				new ImageTexture([texture]),
				hurts
			)
		);
		return CustomGame.getGame().addObject(CustomGame.getObject(id)); 	
	}
	static createAnimatedItem(id,x,y,src,scaleX,scaleY,spriteNumber,cols,files,arraySpriteNumbers,hurts,startNormal,endNormal,startKill,endKill){
		let texture= new SpriteTextureFiltered([src],spriteNumber,cols,files,CustomGame.getGame().getMap().getGridSize(),CustomGame.getGame().getMap().getGridSize(),CustomGame.getGame().getMap().getGridSize(),CustomGame.getGame().getMap().getGridSize(),scaleX,scaleY,arraySpriteNumbers);
		CustomGame.setObject(
			id,
			new NPC(
				id,
				CustomGame.getGame(),
				CustomGame.getPositionX(x),
				CustomGame.getPositionY(y),
				texture,
				startNormal,
				endNormal,
				startKill,
				endKill,
				hurts
			)
		);
		return CustomGame.getGame().addObject(CustomGame.getObject(id)); 	
	}

	// Manage Objects' properties

	//	setProp(id,p){
	//		this._prop[id]=p;
	//	}
	static setItemProperty(itemid,id,p){
		CustomGame.getObject(itemid).setProp(id,p);
	}
	//	getProp(id){
	//		return this._prop[id];
	//	}
	static getItemProperty(itemid,id){
		return CustomGame.getObject(itemid).getProp(id);
	}
	//	delProp(id){
	//		this._prop[id]=null;
	//	}
	static delItemProperty(itemid,id){
		CustomGame.getObject(itemid).delProp(id);
	}

	// Overlay
	static showMessage(id){
		//CustomGame.getGame()._over.saveContent();
		CustomGame.getGame()._over.setContent(
			CustomGame.getDataContent(id)
		);
		if(!CustomGame.getGame()._paused){
			CustomGame.getGame()._pause('m');
		}
		//CustomGame.getGame()._over.restoreContent();

	}
	static restoreMessage(){
		CustomGame.getGame()._over.restoreContent();
	}

	// Data
	static getDataContent(id){
		return CustomGame.getGame()._data.get(id);
	}
	static setDataContent(id,data){
		return CustomGame.getGame()._data.set(id,data);
	}

	// Player
	static getObjects(){
		let objs=[];
		for(let i=0;i<10;i++){
			objs[i]=CustomGame.getGame()._p.getNItem(i);
		}
		return objs;
	}
	static getObjectsID(){
		let objs=[];
		for(let i=0;i<10;i++){
			if(CustomGame.getGame()._p.getNItem(i)){
				objs[i]=CustomGame.getGame()._p.getNItem(i)._id;
			}else{
				objs[i]=null;
			}
		}
		return objs;
	}

	static updateInventory(){
		for(let i=0;i<10;i++){
			document.getElementById("rctableid"+i).className="available";
			if(CustomGame.getGame()._p._item[i]){
				document.getElementById("rctableid"+i).innerHTML="<img src='"+CustomGame.getGame()._p._item[i]._t._resource.src+"'/>";
			}else{
				document.getElementById("rctableid"+i).innerHTML="";
			}
		}
		document.getElementById("rctableid"+CustomGame.getGame()._p.getSelectedItem()).className="selected";
	}
	static takeItem(item){
		if(CustomGame.getGame()._p.takeItem(item)){
			CustomGame.remObj(item);
			return true;
		}
		return false;
	}

	// Utility
	static getPositionX(x){
		return	x*CustomGame.getGame().getMap().getGridSize()+CustomGame.getGame().getMap().getGridSize()/2;
	}
	static getPositionY(y){
		return	y*CustomGame.getGame().getMap().getGridSize()+CustomGame.getGame().getMap().getGridSize()/2;
	}
	static getCellX(x){
		return Math.floor(x/CustomGame.getGame().getMap().getGridSize());
	}
	static getCellY(y){
		return Math.floor(y/CustomGame.getGame().getMap().getGridSize());
	}

	static getGridSize(){
		return CustomGame.getGame().getMap().getGridSize();
	}
	static setGradientCeiling(color1,color2){
		CustomGame.getGame()._RCE.setGradientCeiling(color1,color2);
	}
	static setImageBackground(url){
		CustomGame.getGame()._RCE.setImageBackground(url);
	}
	static setGradientGround(color1,color2){
		CustomGame.getGame()._RCE.setGradientGround(color1,color2);
	}
}
