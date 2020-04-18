//THE MAN HIMSELF
class Pacman{
    constructor(x,y,size,grid){ //size OR "speed" must be this.p
        this.x = x;
        this.y = y;
        this.speed = size;
        this.grid = grid;
        this.direction = 1; // 0(up),1(right),2(down),3(left)
    }

    display(){
        translate(this.speed/2,this.speed/2);
        fill(255,255,0);
        switch(this.direction){
            case 0:
                arc(this.x, this.y, this.speed,this.speed, -55,240,PIE);//UP
                break;
            case 1:
                arc(this.x, this.y, this.speed,this.speed, 35,325,PIE);//RIGHT
                break;
            case 2:
                arc(this.x, this.y, this.speed,this.speed, 125,55,PIE);//DOWN
                break;
            case 3:
                arc(this.x, this.y, this.speed,this.speed, -145,145,PIE);//LEFT
                break;
        }
    }
    
    move(){
        if(keyCode === LEFT_ARROW)
        {            
            if(this.plotFree(this.x/this.speed-1,this.y/this.speed))
            {
                fill(0,0,205);
                translate(-this.speed/2,-this.speed/2);
                rect(this.x,this.y,this.speed,this.speed);                
                this.x -= this.speed;
                this.direction = 3;
            }
            else{
                console.log("CANT MOVE LEFT");
                return;
            }
        }
        if(keyCode === RIGHT_ARROW)
        {            
            if(this.plotFree(this.x/this.speed+1,this.y/this.speed))
            {
                fill(0,0,205);
                translate(-this.speed/2,-this.speed/2);
                rect(this.x,this.y,this.speed,this.speed);
                this.x += this.speed;
                this.direction = 1;
            }
            else{
                console.log("CANT MOVE RIGHT");
                return;
            }
        }
        if(keyCode === UP_ARROW)
        {            
            if(this.plotFree(this.x/this.speed,this.y/this.speed-1))
            {
                fill(0,0,205);
                translate(-this.speed/2,-this.speed/2);
                rect(this.x,this.y,this.speed,this.speed);
                this.y -= this.speed;
                this.direction = 0;
            }
            else{
                console.log("CANT MOVE UP");
                return;
            }
        }
        if(keyCode === DOWN_ARROW)
        {            
            if(this.plotFree(this.x/this.speed,this.y/this.speed+1))
            {
                fill(0,0,205);
                translate(-this.speed/2,-this.speed/2);
                rect(this.x,this.y,this.speed,this.speed);                
                this.y += this.speed;
                this.direction = 2;               
            }
            else{
                console.log("CANT MOVE DOWN");
                return;
            }
        }            
    }
    plotFree(x,y){
        return this.grid[x][y];        
    }    
}