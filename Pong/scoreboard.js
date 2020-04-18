
// 3-20-2020
class Scoreboard{
    constructor(){
        //build score board
        console.log("Board created");
        this.leftScore = 0;
        this.rightScore = 0;
        this.width = displayWidth*0.2;
        this.length = 0.5*this.width;
        this.x = (displayWidth*0.5)-(0.5 * this.width);
        this.y = 50;
        this.scorePos = this.width * 0.05;
        

        textSize(100);
    }

    //show board
    draw(){
        fill(0);
        rect(this.x, this.y, this.width, this.length);
        fill(255, 255, 255);
        rect(displayWidth*0.5-5, this.y, 10, this.length);

        text(this.leftScore, this.x+this.scorePos, 150);
        text(this.rightScore, this.x+(0.5*this.width)+this.scorePos, 150);
    }

    //update if a player scores
    update(player){
        //if player is left leftScore++
        //else rightScore++
        if(player === 1)
            this.leftScore++;
        else    
            this.rightScore++;
    }

    checkScore(){
        if(this.leftScore > 5 || this.rightScore > 5){
            alert("GAME OVER");
            this.leftScore = 0;
            this.rightScore = 0;
            return true;
        }            
        return false;
    }
}