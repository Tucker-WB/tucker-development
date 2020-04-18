
//paddle on right side of screen
class RightPaddle extends Paddle{
    constructor(width, length, v){
        super(width, length, v);
        this.pos = createVector(displayWidth-this.startPosX-this.width, this.startPosY-(0.5*this.length));
    }

    move(){
        if(keyIsDown(RIGHT_ARROW) && this.checkDOWN())
            this.pos.y += this.vel;
            
        else if(keyIsDown(LEFT_ARROW) && this.checkUP())
            this.pos.y -= this.vel;  
    }
}