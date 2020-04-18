
//3-17-2020
class Ball{
    constructor(d, v, paddleOne, paddleTwo, sb){
        this.diameter = d;
        this.leftPaddle = paddleOne;
        this.rightPaddle = paddleTwo;
        this.scoreBoard = sb;
        this.pos = createVector(displayWidth*0.5+(0.5*this.diameter), 
                                displayHeight*0.5-(0.5)*this.diameter);
        this.vel = createVector(v,v);
    }

    //draws a circle at pos
    display(){
        this.draw();
    }

    //updates location based on velocity
    update(){
        this.pos.add(this.vel);
    }

    move(){

        //check if it hit the paddle, if it did
        //it obviously couldn't hit a wall
        if(this.hitPaddle()){}

        else{
            if(this.hitUP())
                this.vel.y = -this.vel.y;
            else if(this.hitLeft()){
                //score right player                
                this.scoreBoard.update(2);                
                this.scoreBoard.checkScore();
                this.resetVelocity();
                this.reset();
            }
            
            else if(this.hitRight()){
                //score left player
                this.scoreBoard.update(1);                
                this.scoreBoard.checkScore();
                this.resetVelocity();
                this.reset();
            }
            else if(this.hitDown())
                this.vel.y = -this.vel.y;
        }
        
        this.update();
    }

    //function used to draw background at prev location
    //draw new ball at new location
    draw(){
        fill(0);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.diameter+1);

        this.move();
        
        fill(255, 255, 255);
        ellipse(this.pos.x, this.pos.y, this.diameter);
        stroke(0);
    }

    hitPaddle(){
        //indexs -> 0: x
        //       -> 1: x+width
        //       -> 2: y
        //       -> 3: y+length
        let box, leftX, rightX, topY, bottomY;

        let d = (0.5*this.diameter);

        if(this.goingLeft()){
            //can only hit left paddle
            box = this.leftPaddle.collisionBox();
            leftX = box[0]
            rightX = box[1];
            topY = box[2];
            bottomY = box[3];
            
            //left pos not need because the ball
            //will never hit the left side of the left padd

            if(this.pos.x-d <= rightX && this.pos.x+d > leftX){
                if(this.pos.y+d >= topY && this.pos.y <= bottomY){
                    console.log("HIT LEFT PADDLE");
                    this.vel.x = -this.vel.x;
                    return true;
                }
                return false;
            } else{ return false; }
            
        }
        else{
            //must be going right
            box = this.rightPaddle.collisionBox();
            leftX = box[0];
            rightX = box[0]; 
            topY = box[2];
            bottomY = box[3];

            //ball wont hit back side of paddle            
            if(this.pos.x+d  >= leftX && this.pos.x-d < rightX){
                if(this.pos.y+d >= topY && this.pos.y <= bottomY){
                    console.log("HIT RIGHT PADDLE");
                    this.vel.x = -this.vel.x;
                    return true;
                }
                return false;                
            }else{ return false;}
        }
    }

    reset(){
        this.pos = createVector(displayWidth*0.5+(0.5*this.diameter), 
                                displayHeight*0.5-(0.5)*this.diameter);
    }

    resetVelocity(){
        let rX = floor(random(1)) == 0 ? -1 : 1;
        let rY = floor(random(1)) == 0 ? -1 : 1;
        this.vel.x = rX * this.vel.x;
        this.vel.y = rY * this.vel.y;
    }

    goingLeft(){return this.vel.x < 0;}
    hitUP(){return this.pos.y-(0.5*this.diameter) <= 0;}
    hitDown(){return this.pos.y + (0.5*this.diameter) >= displayHeight;}
    hitLeft(){return this.pos.x -(0.5*this.diameter)<= 0;}
    hitRight(){return this.pos.x + (0.5*this.diameter) >= displayWidth;}
}