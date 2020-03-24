class CustomGame extends Game{
	constructor(files,rows,grid){
		super(files,rows,grid);
		this._rooms.load(0,this._data.get('map0'));
		this._hardBoot(0,files,rows,grid);
		// Start the Game
		this._start();
	}

	addItem(id,x,y){
		this._o=null;
		super.addItem(id,x,y);
	}

	_loadTextures(gridSize){
		super._loadTextures(gridSize);
	}
}
