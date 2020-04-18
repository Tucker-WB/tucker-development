class PacManMap{
    constructor(x, h, p){
        this.x = x+=2; //needs a boarder
        this.h = h+=2; //needs a boarder
        this.p = p;
        this.pixelWidth = this.x*this.p;
        this.pixelHeight = this.h*this.p;
        this.grid = new Array(this.x);
        
        //create grid
        for(let i = 0; i < this.x; i++){
            this.grid[i] = new Array(this.h);
        }
    }

    display(){
        //display map
        strokeWeight(2);
        for(let x = 0; x < this.pixelWidth; x+=this.p){
            for(let y = 0; y < this.pixelHeight; y+=this.p){
                this.fillsquares(x,y);          
                // if(x>=this.pixelWidth-this.p&&y>=this.pixelHeight-this.p){
                //     //console.log("GRID DRAWING COMPLETE");
                //     //noLoop();
                // }              
            }                      
        }
        //console.log("EXITING display()");        
    }

    fillsquares(x,y){
        if(x>=0 && y===0){ //top edge
            this.grid[x/this.p][y/this.p] = false;
            fill(0);
            rect(x,y,this.p,this.p);            
        }
        else if(x===0 && y>=0){ //left edge
            this.grid[x/this.p][y/this.p] = false;
            fill(0);
            rect(x,y,this.p,this.p);
        }
        else if(x===this.pixelWidth-this.p && y>=0){ //right edge
            this.grid[x/this.p][y/this.p] = false;
            fill(0);
            rect(x,y,this.p,this.p);
        }
        else if(x>=0 && y===this.pixelHeight-this.p){ //bottom edge
            this.grid[x/this.p][y/this.p] = false;
            fill(0);
            rect(x,y,this.p,this.p);
        }
        else if(x%(this.p*2)===0 && y%(this.p*2) ===0){//squares(x,y) % (p*2) === 0
            this.grid[x/this.p][y/this.p] = false;
            fill(0);
            rect(x,y,this.p,this.p);
        }
        else{
            this.grid[x/this.p][y/this.p] = true;
            fill(0,0,205);
            rect(x,y,this.p,this.p); 
            fill(255,255,0);
            ellipse(x+this.p/2, y+this.p/2, 12, 12); //food        
        }        
    }
}
