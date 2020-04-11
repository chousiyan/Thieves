class Player {
    //center position
    x = 352;
    y = 370;
    width = 93;
    height = 59;
    speed = {
        x: 0,
        y: 0,
    }
    angle = 0;
    scale = 0.75;

    // player image
    playerImage;
    playerImageSrc = 'assets/img/player.png';

    // player walking image
    playerWalkingImage;
    playerWalkingImageSrc = 'assets/img/playerWalking.png';
    walkWidth = 93;
    walkHeight = 65;

    // player walking sprite
    walkSprite = [
        0,
        65,
        130,
        195
    ]
    walkFrame = 4;
    walkSpriteCount = 0;

    // walk boolean
    isWalking = false;

    // player path
    playerPath;

    // sight image
    sightImage;
    sightImageSrc = 'assets/img/black_mask.png';

    // Keeps track of timers
    _start = {};

    constructor() {

        // Get the player image loaded
        this.playerImage = new Image();
        this.playerImage.src = this.playerImageSrc;

        // Get the player walking image loaded
        this.playerWalkingImage = new Image();
        this.playerWalkingImage.src = this.playerWalkingImageSrc;

        // Get the sight image loaded
        this.sightImage = new Image();
        this.sightImage.src = this.sightImageSrc;

        this.playerPath = new Path2D();

    }

    // player tick function
    tick(timestamp) {
        this.timestamp = timestamp;
        this._draw();
    }

    // player turning
    move() {
        if (key.isDown(key.UP)) {
            this.angle = Math.PI;
            this.isWalking = true;
        } else if (key.isDown(key.LEFT)) {
            this.angle = Math.PI / 2;
            this.isWalking = true;
        } else if (key.isDown(key.DOWN)) {
            this.angle = 0;
            this.isWalking = true;
        } else if (key.isDown(key.RIGHT)) {
            this.angle = Math.PI * 1.5;
            this.isWalking = true;
        } else {
            this.isWalking = false;
        }
    }

    _draw() {

        //rotate player
        ctx.save();
        ctx.translate(300, 300);
        ctx.rotate(this.angle);
        ctx.scale(this.scale, this.scale);
        ctx.translate(-300 / this.scale, -300 / this.scale);

        // player is not moving
        if (this.isWalking === false) {

            this._drawSight();
            this._drawPlayer();
            this._drawPlayerPath();

        } else {

            this._drawSight();
            this._drawWalking();
            this._fps(100, this._updateWalkingCounter.bind(this));
            this._drawPlayerPath();
        }
        ctx.restore();


    }

    // draw player path
    _drawPlayerPath() {
        ctx.translate(this.x, this.y);
        ctx.strokeStyle = "red";
        this.playerPath.rect(0, 0, 93, 65);
        // ctx.stroke(this.playerPath);
    }

    // draw walking animation
    _drawWalking() {
        ctx.drawImage(
            this.playerWalkingImage,
            0,
            this.walkSprite[this.walkSpriteCount],
            93,
            65,
            this.x,
            this.y,
            this.walkWidth,
            this.walkHeight,
        );
        let dotPath = new Path2D();
        dotPath.rect(352, 370, 10, 10);
        ctx.strokeStyle = "white";
        // ctx.stroke(dotPath);
    }

    _updateWalkingCounter() {
        this.isWalking = true;
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

    //Draw black mask of player sight
    _drawSight() {

        ctx.drawImage(
            this.sightImage,
            0,
            0,
            800,
            800
        );
    }

    //Draw player image
    _drawPlayer() {
        ctx.drawImage(
            this.playerImage,
            this.x,
            this.y,
            this.width,
            this.height
        );
        let dotPath = new Path2D();
        dotPath.rect(352, 370, 10, 10);
        ctx.strokeStyle = "white";
        // ctx.stroke(dotPath);

    }


}
