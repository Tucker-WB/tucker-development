
//left side player paddle
class LeftPaddle extends Paddle{
    constructor(width, length, v){
        super(width, length, v);
        this.pos = createVector(this.startPosX, this.startPosY-(0.5*this.length));
    }

    move(){
        if(keyIsDown(DOWN_ARROW) && this.checkDOWN())
            this.pos.y += this.vel;
            
        else if(keyIsDown(UP_ARROW) && this.checkUP())
            this.pos.y -= this.vel;  
    }
}