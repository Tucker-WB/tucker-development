//monster
class Monster{
    constructor(x,y,size, grid){
        this.x = x;
        this.y = y;
        this.gridX = x/size;
        this.gridY = y/size;
        this.grid = grid;
        this.size = size;
        this.speed = 1;
        this.direction = 0;
    }

    //random number -1,0,1
    //Math.floor(Math.random()*3)-1;

    display(){
        translate(this.size/2,this.size/2);
        fill(255,0,0);
        ellipse(this.x,this.y,this.size,this.size);
        // if(this.x < width && this.y < height){
        //     this.x += 1;
        //     this.y += 1;
        // }
        translate(0,0);
    }

    move(){                
        if(this.freeToMove(this.x,this.y)){   
            this.direction = floor(random(4));         
            console.log("MOVING: " +this.direction); 
            switch(this.direction){
                case 1:
                    if(this.checkRIGHT()){
                        console.log("ATTEMPTING TO MOVE RIGHT");
                        if(this.gridX>=this.grid.length-1){
                            console.log("ATTEMPT FAIL");
                            break;
                        }
                        else{
                            this.x += this.speed;
                            this.gridX = floor(this.x/this.size);                            
                            console.log("ATTEMPT SUCCESS\nNEW x Postion: "+this.x);
                            console.log("NEW GRIDX POSITION: "+this.gridX);
                            break;
                        }
                    }
                    else{break;}
                case 3:
                    if(this.checkLEFT()){
                        console.log("ATTEMPTING TO MOVE LEFT");
                        if(this.gridX<1){
                            console.log("ATTEMPT FAILED");
                            break;
                        }
                        else{
                            this.x -= this.speed;
                            this.gridX = floor(this.x/this.size);
                            console.log("ATTEMPT SUCCESS\nNEW x Postion: "+this.x);
                            console.log("NEW GRIDX POSITION: "+this.gridX);
                            break;
                        }
                    }
                    else{break;}
                case 2:
                    if(this.checkDOWN()){
                        console.log("ATTEMPTING TO MOVE DOWN");                        
                        if(this.gridY>=this.grid[0].length-1){
                            console.log("ATTEMPT FAILED");
                            break;
                        }
                        else{
                            this.y += this.speed;
                            this.gridY = floor(this.y/this.size);
                            console.log("ATTEMPT SUCCESS\nNEW y Postion: "+this.y);
                            console.log("NEW GRID Y POSITION: "+this.gridY);
                            break;
                        }
                    }
                    else{break;}
                case 0:
                    if(this.checkUP()){
                        console.log("ATTEMPTING TO MOVE UP");
                        if(this.gridY<1){
                            console.log("ATTEMPT FAILED");
                            break;
                        }
                        else{
                            this.y -= this.speed;
                            this.gridY = floor(this.y/this.size);
                            console.log("ATTEMPT SUCCESS\nNEW y Postion: "+this.y);
                            console.log("NEW GRID Y POSITION: "+this.gridY);
                            break;
                        }
                    }
                    else{break;}
            }
        }
        else{
             if(this.x%this.size === 0){
                //probably still moving up or down
                 switch(this.direction){
                     case 0:
                        this.y-=this.speed;
                        break;
                     case 2: 
                        this.y+=this.speed;
                        break;
                 }               
             }
             else if(this.y%this.size === 0){
                 //probably still moving left or right
                 switch(this.direction){
                    case 1:
                       this.x+=this.speed;
                       break;
                    case 3: 
                       this.x-=this.speed;
                       break;
                } 
             }
             else{return;}  
        }     
    }

    plotFree(x,y){
        return this.grid[x][y];
    }
    freeToMove(x,y){
        return x%this.size === 0 && y%this.size === 0;
    }
    checkDOWN(){
        return this.plotFree(this.gridX,this.gridY+1);
    }
    checkUP(){
        return this.plotFree(this.gridX,this.gridY-1);
    }
    checkLEFT(){
        return this.plotFree(this.gridX-1,this.gridY);
    }
    checkRIGHT(){
        return this.plotFree(this.gridX+1,1);
    }
}