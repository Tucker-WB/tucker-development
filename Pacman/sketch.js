//sketch
var newMap;
var pacman;
//var monster;
function setup(){
    createCanvas(1500, 1000);
    background(55);
    angleMode(DEGREES);
    newMap = new PacManMap(27,17,50);
    pacman = new Pacman(150,150,50, newMap.grid);
    monster = new Monster(550,550,50,newMap.grid);   
}

function draw(){    
    newMap.display();
    monster.display();
    pacman.display();   
    monster.move();     
}
function keyPressed(){
    pacman.move();    
}