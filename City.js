var elencoCity = [
	["Roma", 917, 926, "Player", 5000, 3000],
	["Neapolis", 953, 960, "Enemy", 2000, 2000],
	["Brundisium", 1086, 992, "Enemy", 1000, 1500],
	["Cosentia", 1021, 1058, "Enemy", 1250, 1500],
	["Arminium", 941, 816, "Enemy", 2000, 2000],
	["Velathri", 867, 842, "Enemy", 1500, 3000]
];

function City(nome, x, y, owner, uomini, soldati) {

	this.nome = nome;
	this.x = x;
	this.y = y;
	this.owner = owner;
	this.uomini = uomini;
	this.soldati = soldati;
	this.isCitta = true;

	this.displayC = function () {

		if (this.owner == "Player") {
			this.col = "rgba(255, 0, 0, 0.3)";
		} else {
			this.col = "rgba(0, 0, 255, 0.3)";
		}

		c = document.getElementById("MAPPA");
		ctx = c.getContext("2d");
		ctx.beginPath();
		ctx.arc(this.x, this.y, 18, 0, Math.PI * 2, true);
		ctx.fillStyle = this.col;
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = "white";
		ctx.stroke();
	}

	this.hover = function () {
		var dH = dist(mousePos.x, mousePos.y, this.x, this.y);
		if (dH < 15) {
			Hover.push(this);
		}
	}

	this.tastoSinistro = function () {
		var dS = dist(mousePos.x, mousePos.y, this.x, this.y);
		if (dS < 15) {

		}
	}

	this.tastoDestro = function (cittaDestro) {
		var dD = dist(mousePos.x, mousePos.y, this.x, this.y);
		if (dD < 15) {

			document.getElementById("NAV1").innerHTML = this.nome.toUpperCase();

			document.getElementById("NAV2").innerHTML = "Esercito non Disponibile";
			document.getElementById("NAV2").onclick = "";

			if (cittaDestro.owner == "Player") {
				document.getElementById("mySidenav").style.backgroundColor = "#AF0000";

				for (var ii = 0; ii < statLegione.length; ii++) {

					if (statLegione[ii][4] == "Player" && cittaDestro.nome == statLegione[ii][0] && statLegione[ii][5] == false) {
						document.getElementById("NAV2").innerHTML = "Crea Esercito";
						document.getElementById("NAV2").onclick = function creaLegione() {

							closeNav();

							mscConfirm({
								title: cittaDestro.nome,
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
				document.getElementById("NAV4").onclick = function () {

					document.getElementById("selTitle").innerHTML = "COSTRUZIONI";

					document.getElementById("sel0").innerHTML = "";
					document.getElementById("sel0").onclick = "";
					document.getElementById("sel1").innerHTML = "";
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

			} else {

				document.getElementById("mySidenav").style.backgroundColor = "#2D2DA6";
				document.getElementById("NAV2").innerHTML = "Invia dei Diplomatici";
				document.getElementById("NAV2").onclick = "";
				document.getElementById("NAV3").innerHTML = "Invia dei Mercanti";
				document.getElementById("NAV3").onclick = "";
				document.getElementById("NAV4").innerHTML = "";
				document.getElementById("NAV4").onclick = "";
			}

			document.getElementById("mySidenav").style.width = "15%";
		}
	}
}