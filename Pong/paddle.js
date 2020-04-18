
//3-17-2020
class Paddle{
    constructor(width, length, v){
        this.startPosX = displayWidth * 0.05;  
        this.startPosY = displayHeight * 0.5;    
        this.width = width;
        this.length = length;
        this.vel = v;
    }

    //draws a rect(width, length) at pos
    display(){
        this.draw();        
    }

    

    //updates location based on vel.y
    update(){
        this.move();
    }

    //function used to draw background at prev location
    //draw new ball at new location
    draw(){        
        //cover where the paddle was
        stroke(0);
        strokeWeight(10);
        fill(0);
        rect(this.pos.x, this.pos.y, this.width, this.length);

        //update position
        this.update();
        
        //draw new paddle
        strokeWeight(1);
        stroke(255, 255, 255);
        fill(255, 255, 255);
        rect(this.pos.x, this.pos.y, this.width, this.length);
    }

    checkDOWN(){        
        return (this.pos.y + this.length >= displayHeight) ? false : true;
    }

    checkUP(){
        return (this.pos.y < 0) ? false : true;
    }

    collisionBox(){
        // var box = [[this.pos.x, this.pos.y], [this.pos.x+this.width, this.pos.y], 
        //            [this.pos.x, this.pos.y+this.length], [this.pos.x+this.width, this.pos.y+this.length]];
        var collisionBox = [this.pos.x, this.pos.x+this.width, this.pos.y, this.pos.y+this.length];
        return collisionBox;
    }
}

