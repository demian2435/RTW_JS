var elencoCity = [
	["Roma", 917, 926, "Player", 5000],
	["Neapolis", 953, 960, "Enemy", 2000],
	["Brundisium", 1086, 992, "Enemy", 1000],
	["Cosentia", 1021, 1058, "Enemy", 1250],
	["Arminium", 941, 816, "Enemy", 2000],
	["Velathri", 867, 842, "Enemy", 1500]
];

function City(nome, x, y, owner, uomini) {

	this.nome = nome;
	this.x = x;
	this.y = y;
	this.owner = owner;
	this.uomini = uomini;

	if (owner == "Player")
		this.col = color(150, 0, 24);
	else
		this.col = color(0, 123, 167);

	this.display = function () {
		stroke(255);
		fill(this.col);
		ellipse(this.x, this.y, 30);
	}

	this.hover = function () {
		var dH = dist(mouseX, mouseY, this.x, this.y);
		if (dH < 15) {
			mouseHover.push(this.nome);
		}
	}

	this.tastoSinistro = function () {
		var dS = dist(mouseX, mouseY, this.x, this.y);
		if (dS < 15) {
		}
	}

	this.tastoDestro = function (cittaDestro) {
		var dD = dist(mouseX, mouseY, this.x, this.y);
		if (dD < 15) {

			document.getElementById("NAV1").innerHTML = this.nome.toUpperCase();

			if (cittaDestro.owner == "Player") {
				document.getElementById("mySidenav").style.backgroundColor = "#AF0000";

				for (var ii = 0; ii < statLegione.length; ii++) {

					if (statLegione[ii][4] == "Player" && cittaDestro.nome == statLegione[ii][0] && statLegione[ii][5] == false) {
						console.log(statLegione[ii]);
						document.getElementById("NAV2").innerHTML = "Crea Esercito";
						document.getElementById("NAV2").onclick = function creaLegione() {

							closeNav();

							mscConfirm({
								title: cittaDestro.nome.toUpperCase(),
								subtitle: "CREARE ESERCITO?",
								okText: "SI",
								cancelText: "NO",
								dismissOverlay: true,
								onOk: function () {

									for (var i = 0; i < statLegione.length; i++) {
										if (statLegione[i][0] === cittaDestro.nome && statLegione[i][5] === false) {
											if (DENARO >= 5000 && CIBO >= 100 && UOMINI >= statLegione[i][6]) {
												legion.push(new Legion(statLegione[i][0], statLegione[i][1], statLegione[i][2], statLegione[i][3], statLegione[i][4], statLegione[i][6]));
												statLegione[i][5] = true;
												DENARO -= 5000;
												CIBO -= 100;
												UOMINI -= statLegione[i][6];
											} else {
												mscAlert("RISORSE INSUFFICENTI");
											}
										};
									}
								}
							});
						};

					} else if (statLegione[ii][4] == "Player" && cittaDestro.nome == statLegione[ii][0] && statLegione[ii][5] == true) {
						document.getElementById("NAV2").innerHTML = "Esercito in servizio";
						document.getElementById("NAV2").onclick = "";
					}
				};
				document.getElementById("NAV3").innerHTML = "Crea Flotta";
				document.getElementById("NAV3").onclick = "";
				document.getElementById("NAV4").innerHTML = "Gestisci Città";
				document.getElementById("NAV4").onclick = function () { document.getElementById("mySidenav2").style.width = "20%"; };

			} else {

				document.getElementById("mySidenav").style.backgroundColor = "#2D2DA6";
				document.getElementById("NAV2").innerHTML = "Invia dei Diplomatici";
				document.getElementById("NAV2").onclick = "";
				document.getElementById("NAV3").innerHTML = "Invia dei Mercanti";
				document.getElementById("NAV3").onclick = "";
				document.getElementById("NAV4").innerHTML = "Attacca Città";
				document.getElementById("NAV4").onclick =  function attaccaCitta() {
					var disponibili = 0;

					for (var ii = 0; ii < legion.length; ii++) {
						if (legion[ii].owner == "Player" && collidesLegion(cittaDestro, legion[ii])) {
							console.log("OK");
							disponibili++;
						}
					}

					if (disponibili == 0) {
						closeNav();
						mscAlert("NESSUN ESERCITO DISPONIBILE");
					}
				};

			}

			document.getElementById("mySidenav").style.width = "20%";
		}
	}
}