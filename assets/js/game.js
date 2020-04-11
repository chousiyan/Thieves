

class Game {

    constructor(id) {

        this.map = new Map();
        this.player = new Player();
        this.guard = new Guard();
        this.guard.y = this.map.y + this.guard.startPoint;

    }

    tick(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.guard.x = this.map.x + 254;

        // map
        this.map.move();
        this.map.draw();

        // Enemy
        this.guard.tick(timestamp);
        this.guard.patrol(this.map.y);
        this.guard.canSeePlayer(this.player);

        // player turning
        this.player.move();
        this.player.tick(timestamp);




        // let dotPath = new Path2D();
        // dotPath.rect(352, 370, 10, 10);
        // ctx.strokeStyle = "white";
        // ctx.stroke(dotPath);

        // console.log(
        //     this.player.x,
        //     this.player.y,
        //     ctx.isPointInPath(this.map.roomPath, this.player.x - 93, this.player.y)
        // )

        canvas.addEventListener("click", function (event) {
            const x = event.clientX;
            const y = event.clientY;

            game.map.isClickedOn(x, y);

        });

        canvas.addEventListener("mouseleave", function (event) {
            document.body.style.cursor = "default";
        })

        canvas.addEventListener("mousemove", function (event) {
            const x = event.clientX;
            const y = event.clientY;

            game.map.isOnMouseOver(x, y);
        })


        // End Game

        if (isGameOver == true) {
            gameFail();
        } else if (isGameWin == true) {
            gameSuccess();
        } else {
            window.requestAnimationFrame(this.tick.bind(this));
        }

    }
}
