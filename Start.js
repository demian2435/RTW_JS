//var c, ctx, img, cityHover, legionHover;

var city = [];
var legion = [];

var UOMINI = 4000;
var CIBO = 250;
var DENARO = 50000;
var ANNO = 753;

var TASSE = 0.01;
var AGRICOLTURA = 0.02;
var CRESCITA = 0.015;

var MALCONTENTO = 0.002;



function setup() {
	createCanvas(3000, 1650);
	background(0);

	document.getElementById("anno").innerHTML = ANNO + " a.C.";
	//document.firstElementChild.style.zoom = "reset";
	//document.body.style.zoom = 1;

	for (var x = 0; x < elencoCity.length; x++) {
		city.push(new City(elencoCity[x][0], elencoCity[x][1], elencoCity[x][2], elencoCity[x][3], elencoCity[x][4]));
	}

	document.oncontextmenu = function () { return false };

	c = document.getElementById("defaultCanvas0");
	ctx = c.getContext("2d");

	var img = new Image;
	img.src = "img/mappa.jpg";
	img.onload = function () {
		ctx.drawImage(img, 0, 0, c.width, c.height);
	}

	document.onmousewheel = function () { return false; };

	var body = document.body;
	body.scrollTop += 450;
}

function mousePressed() {

	if (mouseButton == LEFT) {

		console.log(mouseX, mouseY);
		if (!isOnDiv)
			closeNav();

		if (!isOnDiv2)
			closeNav2();

		if (!isOnStat)
			closeStat();

		//legion[0].x = mouseX;
		//legion[0].y = mouseY;

		for (var i = 0; i < city.length; i++) {
			city[i].tastoSinistro();
		}
	}

	if (mouseButton == RIGHT) {
		for (var i = 0; i < city.length; i++) {
			city[i].tastoDestro(city[i]);
		}
		for (var i = 0; i < legion.length; i++) {
			legion[i].tastoDestro(legion[i]);
		}
	}

	if (mouseButton == CENTER) {

	}
}

function draw() {
	mouseHover = [];
	legionHover = [];
	sfondoMappa();

	for (var i = 0; i < city.length; i++) {
		city[i].display();
		city[i].hover();
	};

	for (var i = 0; i < legion.length; i++) {
		legion[i].display(legion[i].owner);
		legion[i].hover();
	};

	if (mouseHover.length != 0 || legionHover.length != 0) {
		document.getElementsByTagName("body")[0].style.cursor = "pointer";
	} else {
		document.getElementsByTagName("body")[0].style.cursor = "auto";
	};

	RISORSE();
}

/*------------- FUNZIONI DI SERVIZIO --------------*/

function passaTurno() {

	var SOL = 0;

	for (var i = 0; i < legion.length; i++) {
		if (legion[i].owner == "Player") {
			SOL += legion[i].soldati;
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
	c = document.getElementById("defaultCanvas0");
	ctx = c.getContext("2d");
	var img = new Image;
	img.src = "img/mappa.jpg";

	ctx.drawImage(img, 0, 0, c.width, c.height);
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

function collides(rect) {
	var isCollision = false;
	var left = rect.x - 15;
	var right = left + 30;
	var top = rect.y - 32;
	var bottom = top + 68;
	if (right >= mouseX && left <= mouseX && bottom >= mouseY && top <= mouseY) {
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
	if(A == 750){ 
	legion.push(new Legion(statLegione[1][0], statLegione[1][1], statLegione[1][2], statLegione[1][3], statLegione[1][4], statLegione[1][6]));
	}
}