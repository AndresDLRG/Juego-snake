window.onload = function(){

	var i,j,nuevo = false;
	var inter;
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var cWidth = ctx.canvas.width;
	var cHeight = ctx.canvas.height;
	var pPuntos = document.getElementById("puntos");
	var pRecord = document.getElementById("record");
	pPuntos.style.float = "left";
	pRecord.style.float = "right";
	var puntos = -10;
	var tiempo = 400;
	var best = localStorage.getItem("best");
	if (best === null) {
		best = 0;
	}
	inter = setInterval( main  ,tiempo);
	
	function player(x,y){
		this.posX = x;
		this.posY = y;
		this.dir = "none";
		this.width = 20;
		this.height = 20;
		this.choque = false;
	}

	function comida(x,y){
		this.posX = x;
		this.posY = y;
	}
	
	var vibora = [];
	vibora[0] = new player(60,80);
	vibora[1] = new player(80,80);
	vibora[2] = new player(100,80);
	vibora[2].dir = "right";
		
	var escenario =  [];
		for(i = 0; i < 25 ; i++){			// 0  vacio   1 ocupado
			escenario[i] = [];				
			for( j = 0; j < 20 ; j++){
				escenario[i][j] = 0;
			}
		}
	escenario[3][4] = 1;
	escenario[4][4] = 1;
	
	drawComida();
	
	function main(){
		if(!vibora[vibora.length - 1].choque){
			if(!nuevo)
				limpiar();
			else
				nuevo = false;
			drawPlayer("red",vibora);
		}
	}

	function limpiar(){
		var actual = vibora[vibora.length - 1];
		ctx.fillStyle = "white";
		if(actual.choque === false){
			ctx.fillRect(vibora[0].posX, vibora[0].posY, 20 , 20);
			escenario[vibora[0].posX / 20][vibora[0].posY / 20] = 0;
			vibora.shift();
		}
	}
	
	function drawPlayer(color, serp){
		var vib;
		var actual = serp[serp.length - 1];
		switch(actual.dir){
			case "up":
						if(actual.posY > 0){
							vib = new player(actual.posX, actual.posY - 20);
							i--;
							}
						else{
							actual.choque  = true;
							}
						break;
			case "left":
						if(actual.posX > 0){
							vib = new player(actual.posX - 20, actual.posY);
							j--;
							}
						else
							actual.choque  = true;
						break;
			case "down":
						if(actual.posY < cHeight - 20){
							vib = new player(actual.posX, actual.posY + 20);
							i++;
							}
						else
							actual.choque  = true;
						break;
			case "right":
						if(actual.posX < cWidth - 20){
							vib = new player(actual.posX + 20, actual.posY);
							j++;
							}
						else
							actual.choque  = true;
						break;
					
		}
		vib.dir = actual.dir;
		serp.push(vib);
		if(escenario[serp[serp.length - 1].posX / 20][serp[serp.length - 1].posY / 20] == 1)
			serp[serp.length - 1].choque = true;
		else if(escenario[serp[serp.length - 1].posX / 20][serp[serp.length - 1].posY / 20] == 2) {
			nuevo = true;
			drawComida();
		}
		if(serp[serp.length - 1].choque === false){
			ctx.fillStyle = color;
			ctx.fillRect(serp[serp.length - 1].posX, serp[serp.length - 1].posY, 20 , 20);
			escenario[serp[serp.length - 1].posX / 20][serp[serp.length - 1].posY / 20] = 1;
		}
	}

	function drawComida(){
		var x,y;
		do{
		x = Math.floor(Math.random() * 25);
		y = Math.floor(Math.random() * 20);
		}while(escenario[x][y] != 0);
		escenario[x][y] = 2;
		var comi  = new comida(x * 20,y * 20);
		ctx.fillStyle = "yellow";
		ctx.fillRect(comi.posX, comi.posY, 20 , 20);
		
		puntos += 10;
		if (puntos > best) {
			localStorage.setItem("best",puntos);
			best = puntos;
		}
		pPuntos.innerHTML = "Puntos: " + puntos;
		pRecord.innerHTML = "Record: " + best;
		if(tiempo > 400)
			tiempo -= 40;
		else if(tiempo > 300)
			tiempo -= 24;
		else if (tiempo  > 200)
			tiempo -=18;
		else if (tiempo > 90)
			tiempo -=8;
		
		clearInterval(inter);
		inter = setInterval( main , tiempo);

	}
	
	window.onkeydown = function(event){
		var tecla = event.keyCode;
		var actual = vibora[vibora.length - 1];
		switch(tecla){
		
			case 37: 
						if( vibora[vibora.length - 2].dir != "right")
							actual.dir = "left";
						break;
			case 38: 
						if( vibora[vibora.length - 2].dir != "down")
							actual.dir = "up";
						break;
			case 39: 
						if( vibora[vibora.length - 2].dir != "left")
							actual.dir = "right";
						break;
			case 40: 
						if( vibora[vibora.length - 2].dir != "up")
							actual.dir = "down";
						break;
		}
	}
}

