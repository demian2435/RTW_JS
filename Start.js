//var c, ctx, img, cityHover, legionHover;
var UnitaFPS = 0.01; // 1 = tutti
var tassoConversione = 100;

var city = [];
var legion = [];

var UOMINI = 5000;
var CIBO = 250;
var DENARO = 7000;
var ANNO = 753;

var TASSE = 0.01;
var AGRICOLTURA = 0.02;
var CRESCITA = 0.015;

var MALCONTENTO = 0.002;

var rangeTruppe = 175;

var unitaSelezionata = [];
var GUERRA = 0;

var mousePos = [];
var BATTAGLIA = false;
var unitaBattaglia = [];
var PUNTI_ALLEATO = 0;
var PUNTI_NEMICO = 0;
var Hover = [];
var EsercitoPlayer = [];
var EsercitoEnemy = [];

var unitSpeed = 5;


function setup() {
	noCanvas();
	document.body.scrollTop += 450;
	document.getElementById("anno").innerHTML = ANNO + " a.C.";
	//document.firstElementChild.style.zoom = "reset";
	//document.body.style.zoom = 1;

	for (var x = 0; x < elencoCity.length; x++) {
		city.push(new City(elencoCity[x][0], elencoCity[x][1], elencoCity[x][2], elencoCity[x][3], elencoCity[x][4], elencoCity[x][5]));
	}

	document.oncontextmenu = function () { return false };

	var c = document.getElementById("MAPPA");
	var ctx = c.getContext("2d");
	var img = new Image;
	img.src = "img/mappa.jpg";
	img.onload = function () {
		ctx.drawImage(img, 0, 0, c.width, c.height);
	}

	//document.onmousewheel = function () { return false; };

	c.addEventListener("mousemove", function (evt) {
		mousePos = getMousePos(c, evt);
	}, false);


	/*-------------- FUNZIONE MOUSE X - Y -------------------*/

	function getMousePos(c, evt) {
		var rect = c.getBoundingClientRect();
		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};
	}

	//legion.push(new Legion(statLegione[0][0], statLegione[0][1], statLegione[0][2], statLegione[0][3], statLegione[0][4], statLegione[0][6]));
	//statLegione[0][5] = true;
}

function mousePressed() {
	if (BATTAGLIA == false) {

		if (mouseButton == LEFT) {
			if (GUERRA != 0) {
				console.log(unitaSelezionata[0].nome + " HA ATTACCATO " + Hover[0].nome);
				BATTAGLIA = true;
				BATTAGLIAcanvas(unitaSelezionata[0], Hover[0]);
				document.getElementById("CAMPO_DI_BATTAGLIA").style.width = "100%";
			}

			console.log(mousePos.x, mousePos.y)

			if (!isOnDiv)
				closeNav();

			if (!isOnDiv2)
				closeNav2();

			if (!isOnStat)
				closeStat();

			for (var i = 0; i < legion.length; i++) {
				legion[i].tastoSinistro(legion[i]);
			}

			for (var i = 0; i < city.length; i++) {
				city[i].tastoSinistro(city[i]);
			}


		}

		if (mouseButton == RIGHT) {
			if (unitaSelezionata.length != 0) {
				unitaSelezionata[0].click = false;
				unitaSelezionata = [];
			} else {

				if (!isOnDiv)
					closeNav();

				if (!isOnDiv2)
					closeNav2();

				if (!isOnStat)
					closeStat();

				for (var i = 0; i < city.length; i++) {
					city[i].tastoDestro(city[i]);
				}
				for (var i = 0; i < legion.length; i++) {
					legion[i].tastoDestro(legion[i]);
				}

			}
		}

		if (mouseButton == CENTER) {

		}
	}
}

function draw() {
	Hover = [];
	GUERRA = 0;
	sfondoMappa();

	for (var i = 0; i < city.length; i++) {
		city[i].displayC();
		city[i].hover();
	};

	for (var i = 0; i < legion.length; i++) {
		legion[i].displayL(legion[i].owner);
		legion[i].hover();
	};

	if (Hover.length == 0 && unitaSelezionata == 0) {
		document.getElementsByTagName("body")[0].style.cursor = "auto"
	} else if (Hover.length != 0 && unitaSelezionata == 0) {
		document.getElementsByTagName("body")[0].style.cursor = "pointer";

		var c = document.getElementById("MAPPA");
		var ctx = c.getContext("2d");

		ctx.font = "25px Arial";
		ctx.fillStyle = "white";

		ctx.fillText(Hover[0].nome, mousePos.x + 20, mousePos.y + 16);

	} else if (unitaSelezionata != 0) {
		document.getElementsByTagName("body")[0].style.cursor = "move";
		var dH = dist(mousePos.x, mousePos.y, unitaSelezionata[0].x, unitaSelezionata[0].y + 25);
		if (dH <= (unitaSelezionata[0].move / 2)) {
			if (Hover.length == 0 || Hover[0].owner == "Player") {
				document.getElementsByTagName("body")[0].style.cursor = "move";
			} else if (Hover.length != 0) {
				GUERRA = 1;
				document.getElementsByTagName("body")[0].style.cursor = "crosshair";

				var c = document.getElementById("MAPPA");
				var ctx = c.getContext("2d");

				ctx.font = "25px Arial";
				ctx.fillStyle = "white";
				ctx.fillText("ATTACCA " + Hover[0].nome, mousePos.x + 20, mousePos.y + 16);
			}
		}
		else {
			document.getElementsByTagName("body")[0].style.cursor = "no-drop"
		}
	}


	RISORSE();



	if (BATTAGLIA == true) {
		sfondoCampo();

		for (var i = 0; i < unitaBattaglia.length; i++) {
			unitaBattaglia.sort(function (a, b) { return a.y - b.y; }); //rimette in prospettiva le icone
		};

		for (var i = 0; i < unitaBattaglia.length; i++) {
			unitaBattaglia[i].avanzare();
			unitaBattaglia[i].displayU();
		}


		PUNTI_ALLEATO = 0;
		PUNTI_NEMICO = 0;

		for (var i = 0; i < unitaBattaglia.length; i++) {
			if (unitaBattaglia[i].owner == "Player" && unitaBattaglia[i].vivo == true) {
				PUNTI_ALLEATO += 1;
			}
			if (unitaBattaglia[i].owner == "Enemy" && unitaBattaglia[i].vivo == true) {
				PUNTI_NEMICO += 1;
			}
		}

		if (PUNTI_ALLEATO == 0) {
			EsercitoEnemy[0].soldati = PUNTI_NEMICO * tassoConversione;
			if (EsercitoPlayer[0].isCitta == true) {
				EsercitoPlayer[0].owner = EsercitoEnemy[0].owner;

				mscAlert(EsercitoEnemy[0].nome + " HA CONQUISTATO " + EsercitoPlayer[0].nome);
			} else if (EsercitoPlayer[0].isCitta == false) {
				for (var i = 0; i < legion.length; i++) {
					if (legion[i].nome == EsercitoPlayer[0].nome) {
						for (var j = 0; j < statLegione.length; j++) {
							if (EsercitoPlayer[0].nome == statLegione[j][1]) {
								statLegione[j][5] = false;
								UOMINI += PUNTI_ALLEATO * tassoConversione;
								legion.splice(i, 1);

								mscAlert(EsercitoEnemy[0].nome + " HA SCONFITTO " + EsercitoPlayer[0].nome);
							}
						}
					}
				}
			}
			BATTAGLIA = false;
			closeCAMPO();
			EsercitoPlayer = [];
			EsercitoEnemy = [];
		}

		if (PUNTI_NEMICO == 0) {
			EsercitoPlayer[0].soldati = PUNTI_ALLEATO * tassoConversione;
			if (EsercitoEnemy[0].isCitta == true) {
				EsercitoEnemy[0].owner = EsercitoPlayer[0].owner;
				UOMINI += EsercitoEnemy[0].uomini;
				DENARO += EsercitoEnemy[0].uomini;
				CIBO += EsercitoEnemy[0].uomini / 2;

				mscAlert(EsercitoPlayer[0].nome + " HA CONQUISTATO " + EsercitoEnemy[0].nome);
			} else if (EsercitoEnemy[0].isCitta == false) {
				for (var i = 0; i < legion.length; i++) {
					if (legion[i].nome == EsercitoEnemy[0].nome) {
						for (var j = 0; j < statLegione.length; j++) {
							if (legion[i].nome == statLegione[j][1]) {
								statLegione[j][5] = false;
								legion.splice(i, 1);
								DENARO += 500;
								UOMINI += PUNTI_NEMICO * tassoConversione;

								mscAlert(EsercitoPlayer[0].nome + " HA SCONFITTO " + EsercitoEnemy[0].nome);
							}
						}
					}
				}
			}

			BATTAGLIA = false;
			closeCAMPO();
			EsercitoPlayer = [];
			EsercitoEnemy = [];
		}

		//unitaSelezionata[0].soldati = (PUNTI_ALLEATO.length * UnitaFPS);
		//Hover[0].soldati = (PUNTI_NEMICO.length * UnitaFPS);


	}
}

/*------------- FUNZIONI DI SERVIZIO --------------*/

function passaTurno() {

	var SOL = 0;

	for (var i = 0; i < legion.length; i++) {
		if (legion[i].owner == "Player") {
			SOL += legion[i].soldati;
			legion[i].move = rangeTruppe;
		}
	};

	var bonusU = floor(UOMINI * CRESCITA);
	var bonusC = floor(UOMINI * AGRICOLTURA);
	var bonusD = floor(UOMINI * TASSE);
	var CCU = floor(UOMINI * MALCONTENTO);
	var CCC = floor(UOMINI * 0.004);
	var CCD = floor(UOMINI * 0.003);
	var CEU = floor(SOL * 0.001);
	var CEC = floor(SOL * 0.005);
	var CED = floor(SOL * 0.01);

	UOMINI += bonusU - CCU - CEU;
	CIBO += bonusC - CCC - CEC;
	DENARO += bonusD - CCD - CED;


	ANNO--;

	document.getElementById("anno").innerHTML = ANNO + " a.C.";

	Vittoria();
	EVENTI(ANNO);
}

function sfondoMappa() {
	c = document.getElementById("MAPPA");
	ctx = c.getContext("2d");
	var img = new Image;
	img.src = "img/mappa.jpg";

	ctx.drawImage(img, 0, 0, c.width, c.height);
}

function sfondoCampo() {
	var cCampo = document.getElementById("CAMPO_DI_BATTAGLIA");
	var ctxCampo = cCampo.getContext("2d");
	var imgCampo = new Image;
	imgCampo.src = "img/campo1.jpg";
	imgCampo.onload = function () {
		ctxCampo.drawImage(imgCampo, 0, 0, cCampo.width, cCampo.height);
	}
}


function RISORSE() {
	document.getElementById("uomini").innerHTML = UOMINI;
	document.getElementById("cibo").innerHTML = CIBO;
	document.getElementById("denaro").innerHTML = DENARO;
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
	document.getElementById("mySidenav2").style.width = "0";
}

function closeNav2() {
	document.getElementById("mySidenav2").style.width = "0";
}

function closeCAMPO() {
	document.getElementById("CAMPO_DI_BATTAGLIA").style.width = "0";
}

function collides(rect) {
	var isCollision = false;
	var left = rect.x - 15;
	var right = left + 30;
	var top = rect.y - 32;
	var bottom = top + 68;
	if (right >= mousePos.x && left <= mousePos.x && bottom >= mousePos.y && top <= mousePos.y) {
		isCollision = true;
	}
	return isCollision;
}

function collidesLegion(enemy, allyed) {
	var isCollisionLegion = false;
	var DL = dist(enemy.x, enemy.y, allyed.x, allyed.y);
	if (DL < 1000) {
		isCollisionLegion = true;
	}
	return isCollisionLegion;
}

function Vittoria() {
	if (DENARO < 0) {
		mscAlert("Bancarotta Imminente")
		if (DENARO < (-100)) {
			location.href = "lose.html";
		}
	}
}

function openStat() {

	var SOLDATI = 0;

	for (var i = 0; i < legion.length; i++) {
		if (legion[i].owner == "Player") {
			SOLDATI += legion[i].soldati;
		}
	};

	var bonusUomini = floor(UOMINI * CRESCITA);
	var bonusCibo = floor(UOMINI * AGRICOLTURA);
	var bonusDenaro = floor(UOMINI * TASSE);
	var CCUomini = floor(UOMINI * MALCONTENTO);
	var CCCibo = floor(UOMINI * 0.004);
	var CCDenaro = floor(UOMINI * 0.003);
	var CEUomini = floor(SOLDATI * 0.001);
	var CECibo = floor(SOLDATI * 0.005);
	var CEDenaro = floor(SOLDATI * 0.01);


	document.getElementById("bonusUomini").innerHTML = "+ " + bonusUomini;
	document.getElementById("bonusCibo").innerHTML = "+ " + bonusCibo;
	document.getElementById("bonusDenaro").innerHTML = "+ " + bonusDenaro;
	document.getElementById("CCUomini").innerHTML = "- " + CCUomini;
	document.getElementById("CCCibo").innerHTML = "- " + CCCibo;
	document.getElementById("CCDenaro").innerHTML = "- " + CCDenaro;
	document.getElementById("CEUomini").innerHTML = "- " + CEUomini;
	document.getElementById("CECibo").innerHTML = "- " + CECibo;
	document.getElementById("CEDenaro").innerHTML = "- " + CEDenaro;
	document.getElementById("preUomini").innerHTML = bonusUomini - CCUomini - CEUomini;
	document.getElementById("preCibo").innerHTML = bonusCibo - CCCibo - CECibo;
	document.getElementById("preDenaro").innerHTML = bonusDenaro - CCDenaro - CEDenaro;

	document.getElementById("navStat").style.zIndex = "1";
}

function closeStat() {
	document.getElementById("navStat").style.zIndex = "0";
}

function EVENTI(A) {
	//SPAWN LEGIONE VELATHRI
	if (A == 750) {
		legion.push(new Legion(statLegione[1][0], statLegione[1][1], statLegione[1][2], statLegione[1][3], statLegione[1][4], statLegione[1][6]));
	}
}

function BATTAGLIAcanvas(PLAYER, ENEMY) {
	unitaBattaglia = [];
	EsercitoEnemy = [];
	EsercitoPlayer = [];
	EsercitoEnemy.push(ENEMY);
	EsercitoPlayer.push(PLAYER);

	for (var i = 0; i < (PLAYER.soldati * UnitaFPS); i++) {
		
		unitaBattaglia.push(new Unita(random(1900, 1400), random(900, 700), "Player", true));
	}

	for (var i = 0; i < (ENEMY.soldati * UnitaFPS); i++) {
		unitaBattaglia.push(new Unita(random(20, 520), random(900, 700), "Enemy", true))
	}
}