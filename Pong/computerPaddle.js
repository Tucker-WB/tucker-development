
//AI Paddle :)
class ComputerPaddle extends Paddle{
    constructor(width, length, v){
        super(width, length, v);
        this.pos = createVector(displayWidth-this.startPosX-this.width, this.startPosY-(0.5*this.length));
        this.ball;
    }

    move(){
        if(this.ball.pos.x > (0.7 * displayWidth))
            this.pos.y = Number(this.ball.pos.y)-(this.length*0.5);
    }

    setBall(ball){
        this.ball = ball;
    }
}