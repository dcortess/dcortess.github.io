//// DATA ////
// *****************
// Jugador
// P
// *****************
// Paredes
// 1-9 --> wallx.png
// *****************
// Objetos
// a-j --> objx.png
// *****************
class CustomDATA extends DATA{
	constructor(){
		super();
	}

	_ini(){
		super._ini();

let aux=`
11111111111111111111111111111111
1               P              1
1           h                  1
1 a          h   c             1
1    2222222222  2222222222    1
1    2d   d         f  f  2    1
1    2d                f  2    1
1    2   d  d2    2 f   f 2    1
1    222222222    222222222    1
1    2 e  e           g  g2    1
1    2  e           g    g2    1
1    2e   e  2    2  g  g 2    1
1    222222222    222222222    1
1    2                    2    1
1    2                    2    1
1    2       2    2       2    1
1    2222222222222222222222    1
1                              1
1                              1
11111111111111111111111111111111
`;
		this.set('map0',aux);
	}
}