var statLegione = [
	["Roma", "Esercito Popolare di Roma", 949, 889, "Player", false, 3000],
	["Velathri", "I Difensori di Velathri", 896, 839, "Enemy", false, 2500]
];

function Legion(citta, nome, x, y, owner, soldati) {

	this.citta = citta;
	this.nome = nome;
	this.x = x;
	this.y = y;
	this.owner = owner;
	this.soldati = soldati;
	this.click = false;
	this.move = rangeTruppe;
	this.isCitta = false;

	var canvas = document.getElementById("MAPPA");
	var context = canvas.getContext("2d");

	var imgPopolare = new Image();
	imgPopolare.src = "img/icons/rom_rorarii_Flip.png";

	var imgNordIta = new Image();
	imgNordIta.src = "img/icons/cel_tribesmen.png";


	this.displayL = function (proprietario) {
		if (this.click == true) {
			//fill(255, 191, 0, 20);
			//stroke(255);
			//ellipse(this.x, this.y + 25, this.move);

			c = document.getElementById("MAPPA");
			ctx = c.getContext("2d");
			ctx.beginPath();
			ctx.arc(this.x, this.y + 25, (this.move / 2), 0, Math.PI * 2, true);
			ctx.fillStyle = "rgba(255, 191, 0, 0.1)";
			ctx.fill();
			ctx.lineWidth = 1;
			ctx.strokeStyle = "white";
			ctx.stroke();

		};

		if (proprietario == "Player") {
			context.drawImage(imgPopolare, this.x - 20, this.y - 50, 40, 95);
		}
		if (proprietario == "Enemy")
			context.drawImage(imgNordIta, this.x - 20, this.y - 50, 40, 95);
	}

	this.hover = function () {
		if (collides(this, mousePos.x, mousePos.x)) {
			Hover.push(this);
		}
	}

	this.tastoSinistro = function () {
		if (this.owner == "Player") {
			if (unitaSelezionata.length == 0) {
				if (collides(this, mousePos.x, mousePos.x)) {
					unitaSelezionata = [];
					unitaSelezionata.push(this);
					unitaSelezionata[0].click = true;
				}

			} else {
				unitaSelezionata[0].click = false;

				var dH = dist(mousePos.x, mousePos.y, unitaSelezionata[0].x, unitaSelezionata[0].y + 25);
				if (dH <= (unitaSelezionata[0].move / 2)) {
					unitaSelezionata[0].x = mousePos.x;
					unitaSelezionata[0].y = mousePos.y - 25;
					unitaSelezionata[0].move -= dH * 2;
					unitaSelezionata = [];
					legion.sort(function (a, b) { return a.y - b.y; }); //rimette in prospettiva le icone
				}
				unitaSelezionata = [];
			}
		}
	}


	this.tastoDestro = function (legioneDestro) {

		if (collides(legioneDestro, mousePos.x, mousePos.x)) {

			if (legioneDestro.owner == "Player") {

				document.getElementById("mySidenav").style.backgroundColor = "#660000";

				document.getElementById("NAV1").innerHTML = legioneDestro.nome.toUpperCase();
				document.getElementById("NAV2").innerHTML = "Addestra truppe";
				document.getElementById("NAV2").onclick = "";
				document.getElementById("NAV3").innerHTML = "Congeda Esercito";
				document.getElementById("NAV3").onclick = function cancellaLegione() {

					closeNav();;

					mscConfirm({
						title: legioneDestro.nome,
						subtitle: "CONGEDARE?",
						okText: "SI",
						cancelText: "NO",
						dismissOverlay: true,
						onOk: function () {
							for (var i = 0; i < legion.length; i++) {
								if (legion[i].nome == legioneDestro.nome) {
									for (var j = 0; j < statLegione.length; j++) {
										if (legion[i].nome == statLegione[j][1]) {
											statLegione[j][5] = false;
											UOMINI += legion[i].soldati;
											legion.splice(i, 1);
											break;
										}
									}
								}
							}
						}
					});

				};
				document.getElementById("NAV4").innerHTML = "Informazioni";
				document.getElementById("NAV4").onclick =  function () {

					document.getElementById("selTitle").innerHTML = "INFO";

					document.getElementById("sel0").innerHTML = "SOLDATI";
					document.getElementById("sel0").onclick = "";
					document.getElementById("sel1").innerHTML = legioneDestro.soldati;
					document.getElementById("sel1").onclick = "";
					document.getElementById("sel2").innerHTML = "";
					document.getElementById("sel2").onclick = "";
					document.getElementById("sel3").innerHTML = "";
					document.getElementById("sel3").onclick = "";
					document.getElementById("sel4").innerHTML = "";
					document.getElementById("sel4").onclick = "";
					document.getElementById("sel5").innerHTML = "";
					document.getElementById("sel5").onclick = "";

					document.getElementById("mySidenav2").style.width = "15%";
				};
				document.getElementById("mySidenav").style.width = "15%";
			} else if (legioneDestro.owner != "Player") {

				document.getElementById("mySidenav").style.backgroundColor = "#001040";

				document.getElementById("NAV1").innerHTML = legioneDestro.nome.toUpperCase();
				document.getElementById("NAV2").innerHTML = "Parla con il Generale";
				document.getElementById("NAV2").onclick = "";
				document.getElementById("NAV3").innerHTML = "Corrompi Esercito";
				document.getElementById("NAV3").onclick = "";
				document.getElementById("NAV4").innerHTML = "Informazioni";
				document.getElementById("NAV4").onclick =  function () {

					document.getElementById("selTitle").innerHTML = "INFO";

					document.getElementById("sel0").innerHTML = "SOLDATI";
					document.getElementById("sel0").onclick = "";
					document.getElementById("sel1").innerHTML = legioneDestro.soldati;
					document.getElementById("sel1").onclick = "";
					document.getElementById("sel2").innerHTML = "";
					document.getElementById("sel2").onclick = "";
					document.getElementById("sel3").innerHTML = "";
					document.getElementById("sel3").onclick = "";
					document.getElementById("sel4").innerHTML = "";
					document.getElementById("sel4").onclick = "";
					document.getElementById("sel5").innerHTML = "";
					document.getElementById("sel5").onclick = "";

					document.getElementById("mySidenav2").style.width = "15%";
				};
				document.getElementById("mySidenav").style.width = "15%";
			}
		}
	}
}