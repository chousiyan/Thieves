class Guard {
    x;
    y;

    width;
    height;

    startPoint = 136;
    endPoint = 400;

    walkWidth = 93;
    walkHeight = 65;
    speed = {
        x: 0,
        y: 0.8,
    };
    angle = 0;
    scale = 0.75;

    walkSprite = [
        0,
        65,
        130,
        195
    ]
    walkFrame = 4;
    walkSpriteCount = 0;

    turnOverTimes = 0;

    // guard animation image
    guardWalkingImage;
    guardWalkingImageSrc = "assets/img/guardWalking.png";

    // flashlight image
    flashlightImage;
    flashlightImageSrc = "assets/img/guard_sight.png";

    // Keeps track of timers
    _start = {};

    constructor() {

        // Load guard image;
        this.guardWalkingImage = new Image();
        this.guardWalkingImage.src = this.guardWalkingImageSrc;

        // Load flashlight image;
        this.flashlightImage = new Image();
        this.flashlightImage.src = this.flashlightImageSrc;

        this.width = this.flashlightImage.width * this.scale;
        this.height = this.flashlightImage.height * this.scale;

    }

    tick(timestamp) {
        this.timestamp = timestamp;
        this._draw();
    }

    _draw() {
        // rotate guard
        ctx.save();
        ctx.translate(this.x + this.walkWidth / 2, this.y + this.walkHeight / 2);
        ctx.rotate(this.angle);
        ctx.scale(this.scale, this.scale);
        ctx.translate(-(this.x + this.walkWidth / 2), -(this.y + this.walkHeight / 2));

        this._drawFlashlight();
        this._drawGuardWalking();
        this._fps(160, this._updateWalkingCounter.bind(this));

        ctx.restore();
    }

    // draw guard walking
    _drawGuardWalking() {

        ctx.drawImage(
            this.guardWalkingImage,
            0,
            this.walkSprite[this.walkSpriteCount],
            93,
            65,
            this.x,
            this.y,
            this.walkWidth,
            this.walkHeight,
        )

    }

    _updateWalkingCounter() {
        this.walkSpriteCount++;
        if (this.walkSpriteCount % this.walkSprite.length === 0) {
            this.walkSpriteCount = 0;
        }

    }

    _fps(fps, callback) {
        let functionName = callback.name;
        if (functionName.indexOf("bound ") >= 0) {
            functionName = functionName.split("bound ").pop();
        }

        if (!this._start[functionName]) {
            this._start[functionName] = this.timestamp;
        }

        const diff = this.timestamp - this._start[functionName];

        if (diff >= fps) {
            callback();
            delete this._start[functionName];
        }
    }


    _drawFlashlight() {

        ctx.drawImage(
            this.flashlightImage,
            this.x - 59,
            this.y + 1,
            216,
            259,
        )
    }

    // guard patrols along a line, keep the guard's resultant velocity at 1, counteract the influence of map moving
    patrol(mapY) {

        if (key.isDown(key.UP)) {
            this.y = this.y + this.speed.y + 1.3;
        } else if (key.isDown(key.DOWN)) {
            this.y = this.y + this.speed.y - 1.3;
        } else {
            this.y += this.speed.y;
        }

        // guard turn over
        if ((this.y >= mapY + this.endPoint) || (this.y <= mapY + this.startPoint)) {
            this.speed.y *= -1;
            this.angle += Math.PI;
            this.turnOverTimes += 1;
        }
    }

    _isEven(number) {
        if (number % 2 == 0) {
            return true;
        } else {
            return false;
        }
    }

    canSeePlayer(player) {

        // console.log(
        // player.x <= this.x + this.width + 201,
        // player.x + player.width >= this.x + 90,
        //     game.map.x,
        //     this._isEven(this.turnOverTimes),
        //     this.y >= game.map.y + 270,
        //     this.y - game.map.y > 273
        // );

        // only works in door areas because map.y = something * sin(guard.y)
        if (game.map.x <= 101 && game.map.x >= -102 && this._isEven(this.turnOverTimes) && this.y >= game.map.y + 270 && this.y - game.map.y > 273) {

            // if guard is walking down
            isGameOver = true;
            // console.log("collided");

        } else {
            // console.log("not collided");
        }

    }
}
