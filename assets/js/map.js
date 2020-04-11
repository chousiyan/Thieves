class Map {
    // position
    x = 140;
    y = 20;

    scale = 0.75;

    // size
    width = 975;
    height = 799;

    // initial speed
    speed = {
        x: 0,
        y: 0,
    };

    // image
    image;
    imageSrc = "assets/img/level_01_map.png";

    roomSvg = "M492 0v610h17V0h433v765H509v-24h-17v24H274v-24h-17v24H0V292h257v318h17V0z";
    roomPath;

    constructor() {

        this.image = new Image();
        this.image.src = this.imageSrc;

        this.roomPath = new Path2D(this.roomSvg);

    }

    draw() {
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width * this.scale,
            this.height * this.scale
        );

        //draw svg
        // ctx.save();
        // ctx.translate(this.x + 12.6, this.y + 12.6);
        // ctx.scale(this.scale, this.scale);
        // ctx.strokeStyle = "red";
        // ctx.stroke(this.roomPath);
        // ctx.fillStyle = "rgba(255, 0, 0, 0)";
        // ctx.fill(this.roomPath);

        // ctx.restore();

        // console.log(
        //     // this.roomPath,
        //     this.x,
        //     this.y,
        //     ctx.isPointInPath(
        //         this.roomPath,
        //         this.x,
        //         this.y,
        //         // "evenodd"
        //     )
        // )

    }


    move() {
        //player move = map move backwards
        if (key.isDown(key.UP) && (ctx.isPointInPath(this.roomPath, game.player.x, game.player.y))) {
            this.moveDown();

        }

        if (key.isDown(key.LEFT)) {
            this.moveRight();
        }

        if (key.isDown(key.DOWN)) {
            this.moveUp();
        }

        if (key.isDown(key.RIGHT)) {
            this.moveLeft();
        }
    }

    moveDown() {
        this.speed.y = 1.3;
        this.y += this.speed.y;
    }

    moveLeft() {
        this.speed.x = -1.3;
        this.x += this.speed.x;
    }

    moveUp() {
        this.speed.y = -1.3;
        this.y += this.speed.y;
    }

    moveRight() {
        this.speed.x = 1.3;
        this.x += this.speed.x;
    }

    isClickedOn(x, y) {
        if (this._isSafeBoxClickedOn(x, y)) {
            // display safe box popup
            let SafeBoxPopUp = document.getElementById("safe-box-popup");
            SafeBoxPopUp.style.display = "block";

            // hide interact tutorial
            tutorial02.style.display = "none";
        }
    }

    isOnMouseOver(x, y) {
        if (this._isSafeBoxOnMouseOver(x, y)) {
            document.body.style.cursor = "pointer";
        } else {
            document.body.style.cursor = "default";
        }
    }

    _isSafeBoxClickedOn(x, y) {
        if (this.x + 632 < x + 1 &&
            this.x + 632 + 84.75 > x &&
            this.y + 121 < y + 1 &&
            this.y + 121 + 62.75 > y) {
            return true;
        }

        return false;
    }

    _isSafeBoxOnMouseOver(x, y) {
        if (this.x + 632 < x + 1 &&
            this.x + 632 + 84.75 > x &&
            this.y + 121 < y + 1 &&
            this.y + 121 + 62.75 > y) {
            return true;
        }

        return false;
    }
}
