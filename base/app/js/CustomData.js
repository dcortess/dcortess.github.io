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
1            h                 1
1    22222222222 2222222222    1
1    2d   d    2          2    1
1    2d        2          2    1
1    2   d  d2 2  2       2    1
1    222222222 2  222222222    1
1    2 e  e    2      g  g2    1
1    2  e      2    g    g2    1
1    2e   e  2 2  2  g  g 2    1
1    222222222 2  222222222    1
1    2    i i  2    77777 2    1
1    2i        2         72    1
1    2 i  i  2    2 77777 2    1
1    2222222222222222222222    1
1                              1
1                              1
11111111111111111111111111111111
`;
		this.set('map0',aux);

aux=`
<h1>La granja de Juanito</h1>
<p>Ayuda a Juanito en sus labores de granja</p>
<p>Para comenzar acercate a el</p>
			<hr/>
<h2>Pulsa m para abrir/cerrar esta pantalla</h2>
			<hr/>
`;
		this.set('welcome',aux);
aux=`
<h1>Enhorabuena</h1>
<h2>Los huevos estan a salvo</h2>
<h2>Dirigete a la puerta de detras tuyo</h2>
`;
		this.set('missionCompleted1',aux);
aux=`
<h1>Enhorabuena</h1>
<h2>El cerdo ha vuelto a su establo</h2>
<h2>Has superado todas las pruebas</h2>
<h2>Juanito ha quedado muy contento con tu trabajo</h2>
`;
		this.set('missionCompleted2',aux);
aux=`
<h1>Algo está sucediendo</h1>
<p>Se ha oido un ruido. Parece como si se hubiera abierto una puerta secreta.</p>
			<hr/>
<h2>Investiga la zona</h2>
			<hr/>
`;
		this.set('missionSkull',aux);
aux=`
<h1>Esta es la zona de las gallinas</h1>
<p>Recoje los huevos y dejalos al fondo del siguiente establo</p>
			<hr/>
<h2>Para recojerlos pasa por encima</h2>
			<hr/>
<h2>Para soltarlos pulsa "i"</h2>
			<hr/>
<h2>Asegurate de pulsar "3" antes de recojerlos</h2>
			<hr/>
`;
		this.set('misionGallinas',aux);
aux=`
<h1>Esta es la zona de los caballos</h1>
<p>Esto deberia estar lleno de caballos, si ves algun animal que no sea un caballo recojelo y dejalo en su establo correspondiente</p>
			<hr/>
<h2>Para recojerlo pasa por encima</h2>
			<hr/>
<h2>Para soltarlo pulsa "i"</h2>
			<hr/>
<h2>Asegurate de pulsar "5" antes de pasar recojerlo</h2>
			<hr/>
`;
		this.set('misionCerdo',aux);
aux=`
<h1>Ya tienes los huevos</h1>
<p>Recuerda dejarlos al fondo del siguiente establo</p>
			</p><img src='app/img/huevos.png'/></p>
<h2>Para dejarlos usa "i"</h2>
			<hr/>
`;
		this.set('missionSkull2',aux);
aux=`
<h1>Has encontrado un cerdo</h1>
<p>Mira los siguientes establos y deja el cerdo en el correspondiente</p>
			</p><img src='app/img/objd.png'/></p>
<h2>Para dejarlo usa "i"</h2>
			<hr/>
`;
		this.set('missionSkull3',aux);
aux=`
<h1>¡Has conseguido una llave!</h1>
<p>Utiliza las llaves para abrir puertas</p>
			<p><img src='app/img/llave.png'/></p>
<h2>Click izquierdo mientras mires a una puerta</h2>
`;
		this.set('missionKill',aux);

aux=`
<h1>Eliminar el bicho</h1>
<p>Este bicho puede ser eliminado utilizando algún objeto</p>
			<p><img src='app/img/obja.png'/></p>
			<hr/>
<h2>Investiguemos un poco ...</h2>
			<hr/>
`;
		this.set('missionKill1',aux);
aux=`
<h1>PASTO CONSEGUIDO</h1>
<p>Vuelve con las ovejas y haz clic izquierdo para darselo</p>
			<p><img src='app/img/objb.png'/></p>
<hr/>
<h2>Botón izquierdo de ratón para lanzar el pasto</h2>
			<hr/>
`;
		this.set('missionKill2',aux);
aux=`
<h1>Grietas en la pared</h1>
<p>Una pared con grietas tiene pinta de poder ser derruida.</p>
			<p><img src='app/img/wall3.png'/></p>
			<hr/>
<h2>Quizás utilizando un explosivo ...</h2>
			<hr/>
`;
		this.set('missionBomb',aux);
aux=`
<h1>Gestión del Inventario</h1>
<p>Los objetos se colocan en el inventario al tocarlos</p>
<p>Tienes 10 posiciones de inventario:</p>
			<hr/>
<h2>1 2 3 4 5 6 7 8 9 0</h2>
			<hr/>
<h2>Cada posicón se representa con un cuadrado en la parte superior de la pantalla</h2>
			<hr/>
<h2>Cambia de posición con la tecla del número correspondiente</h2>
			<hr/>
<h2>Sólo puedes tener un objeto por posición</h2>
			<hr/>
`;
		this.set('multipleObjects',aux);
aux=`
<h1>Puerta encontrada</h1>
<p>Las puertas necesitan una llave para abrirse</p>
<p>Busca la llave por fuera de la granja</p>
			<hr/>
<h2>Asegurate de apretar la tecla "4" antes de pasar por ella</h2>
			<hr/>
<h2>Luego click izquiero para usarlo</h2>
			<hr/>
`;
		this.set('puertaEncontrada',aux);
aux=`
<h1>Granjero Juanito</h1>
<p>Te doy la bienvenida a mi granja. Para comenzar deberas</p>
</hr>
<p>dar comida a los perros, pulsa en la foto para saber como se</p>
</hr>
</hr>
<p>dice, luego pulsa "h" y di la palabra comida</p>
</hr>
<p>
<button onclick="
 speechSynthesis.speak(new SpeechSynthesisUtterance('comida'));
		">
<img src='app/img/pienso.png'/>
			</button>
			</p>
</hr>
<h2>Para hablar pulsa la tecla "h"</h2>
`;
		this.set('missionGetTurtle',aux);
aux=`
<h1>Posición ocupada</h1>
			<p>Selecciona una posición libre en el menú</p>
			<hr/>
			<h2>Para ello utiliza las teclas numéricas del 1 al 9</h2>
			<hr/>
`;
		this.set('selectAvailableStopMenu',aux);
aux=`
<h1>Enhorabuena, has completado la primera mision. Te espero en la granja.</h1>
<p><img src='app/img/pienso.png'/></p>
`;
		this.set('misionComidaCompletada',aux);
aux=`
<h1>Nueva mision</h1>
<p>¡Las ovejas estan hambrientas!</p>
<p>Busca pasto por fuera de la granja.</p>
			<hr/>
<p>Tienes 10 posiciones de inventario:</p>
			<hr/>
<h2>1 2 3 4 5 6 7 8 9 0</h2>
			<hr/>
<h2>Cada posicón se representa con un cuadrado en la parte superior de la pantalla</h2>
			<hr/>
<h2>Asegurate de pulsar "2" antes de pasar por encima del pasto</h2>
			<hr/>
<h2>Sólo puedes tener un objeto por posición</h2>
<h2>Pulsa m para abrir/cerrar esta pantalla</h2>
			<hr/>
`;
		this.set('granjero1',aux);
	}
}
