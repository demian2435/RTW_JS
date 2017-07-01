function Unita(x, y, owner, vivo) {

    this.x = x;
    this.y = y;
    this.owner = owner;
    this.vivo = vivo;

    this.displayU = function () {

        var canvas = document.getElementById("CAMPO_DI_BATTAGLIA");
        var context = canvas.getContext("2d");

        var imgPopolare = new Image();
        imgPopolare.src = "img/icons/rom_rorarii_Flip.png";

        var imgNordIta = new Image();
        imgNordIta.src = "img/icons/cel_tribesmen.png";

        var sangue = new Image();
        sangue.src = "img/sangue.png";

        if (this.owner == "Player" && this.vivo == true)
            context.drawImage(imgPopolare, this.x - 20, this.y - 50, 100, 237);

        if (this.owner == "Enemy" && this.vivo == true)
            context.drawImage(imgNordIta, this.x - 20, this.y - 50, 100, 237);

        if (this.vivo == false)
            context.drawImage(sangue, this.x, this.y + 200, 200, 50);
    }


    /*
        this.avanzare = function () {
            if (this.owner == "Player" && this.vivo == true) {
                if (this.x > random(950, 940)) {
                    this.x -= random(8,9);
    
                    for (var i = 0; i < unitaBattaglia.length; i++) {
                        if (unitaBattaglia[i].owner == "Enemy" && unitaBattaglia[i].vivo) {
                            if (dist(this.y, this.x, unitaBattaglia[i].y, unitaBattaglia[i].x) < 100) {
                                if (random(10) < 5) {
                                    this.vivo = false;
                                    return;
                                } else {
                                    unitaBattaglia[i].vivo = false;
                                    return;
                                }
                            }
                        }
                    }
                }
            }
            if (this.owner == "Enemy" && this.vivo == true) {
                if (this.x < random(950, 940)) {
                    this.x += random(8,9);
                }
            }
        }*/

    this.avanzare = function () {

        if (this.vivo == true) {
            var speed = random(unitSpeed);

            for (var i = 0; i < unitaBattaglia.length; i++) {
                if (unitaBattaglia[i].vivo == true && unitaBattaglia[i].owner != this.owner && (Math.abs(this.x - unitaBattaglia[i].x)) < 20) {
                    if (random(100) <= 50) {
                        this.vivo = false;
                        return;
                    } else {
                        unitaBattaglia[i].vivo = false;
                        return;
                    }
                }

                if (unitaBattaglia[i].vivo == true && unitaBattaglia[i].owner != this.owner) {

                    if (this.owner == "Player" && this.x > 960) {
                        this.x -= speed;
                        return;
                    } else if (this.owner == "Player") {
                        this.x += random(-unitSpeed, unitSpeed);
                        this.y += random(-unitSpeed, unitSpeed);
                        return;
                    }

                    if (this.owner == "Enemy" && this.x < 960) {
                        this.x += speed;
                        return;
                    } else if (this.owner == "Enemy") {
                        this.x += random(-unitSpeed, unitSpeed);
                        this.y += random(-unitSpeed, unitSpeed);
                        return;
                    }
                }
            } return;
        } else { return }
    }
}