var statLegione = [
	["Roma", "Esercito Popolare di Roma", 949, 889, "Player", false, 3000],
	["Velathri", "I Difensori di Velathri", 896, 839, "Enemy", false, 1000]
];

function Legion(citta, nome, x, y, owner, soldati) {

	this.citta = citta;
	this.nome = nome;
	this.x = x;
	this.y = y;
	this.owner = owner;
	this.soldati = soldati;
	this.click = false;

	var canvas = document.getElementById("defaultCanvas0");
	var context = canvas.getContext("2d");

	var imgPopolare = new Image();
	imgPopolare.src = "img/icons/rom_rorarii.png";

	var imgNordIta = new Image();
	imgNordIta.src = "img/icons/cel_tribesmen.png";


	this.display = function (proprietario) {

		if (proprietario == "Player") {
			if (this.click == true) {
				fill(255, 255, 254, 80);
				noStroke();
				ellipse(this.x, this.y, 150);
			};

			context.drawImage(imgPopolare, this.x - 20, this.y - 50, 40, 95);
		}
		if (proprietario == "Enemy")
			context.drawImage(imgNordIta, this.x - 20, this.y - 50, 40, 95);
	}

	this.hover = function () {
		if (collides(this, mouseX, mouseX)) {
			legionHover.push(this.nome);
		}
	}

	this.tastoSinistro = function () {
		if (collides(this, mouseX, mouseX)) {
			unitaSelezionata = true;
			this.click = true;
		} else {
			this.click = false;
			unitaSelezionata = false;
		}
	}

	this.tastoDestro = function (legioneDestro) {

		if (collides(legioneDestro, mouseX, mouseX)) {

			if (legioneDestro.owner == "Player") {

				document.getElementById("mySidenav").style.backgroundColor = "#660000";

				document.getElementById("NAV1").innerHTML = legioneDestro.nome.toUpperCase();
				document.getElementById("NAV2").innerHTML = "Addestra truppe";
				document.getElementById("NAV2").onclick = "";
				document.getElementById("NAV3").innerHTML = "Congeda Esercito";
				document.getElementById("NAV3").onclick = function cancellaLegione() {

					closeNav();;

					mscConfirm({
						title: legioneDestro.nome.toUpperCase(),
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
											return;
										}
									}
								}
							}
						}
					});

				};
				document.getElementById("NAV4").innerHTML = "Assolda Mercenari";
				document.getElementById("NAV4").onclick = "";
				document.getElementById("mySidenav").style.width = "20%";
			} else if (legioneDestro.owner != "Player") {

				document.getElementById("mySidenav").style.backgroundColor = "#001040";

				document.getElementById("NAV1").innerHTML = legioneDestro.nome.toUpperCase();
				document.getElementById("NAV2").innerHTML = "Parla con il Generale";
				document.getElementById("NAV2").onclick = "";
				document.getElementById("NAV3").innerHTML = "Corrompi Esercito";
				document.getElementById("NAV3").onclick = "";
				document.getElementById("NAV4").innerHTML = "";
				document.getElementById("mySidenav").style.width = "20%";
			}
		}
	}
}