var arena;
var paddle_one;
var paddle_two;
var ball;
var scoreboard;
let sb;

//called only once
function setup(){    
    arena = new Arena();
    scoreboard = new Scoreboard();
    paddle_one = new LeftPaddle(20, 150, 7);    
    paddle_two = new ComputerPaddle(20, 150, 7);      
    ball = new Ball(20, 10, paddle_one, paddle_two, scoreboard);    
    paddle_two.setBall(ball);
}

//infinte loop while browser is open
function draw(){
    paddle_one.display();
    paddle_two.display();
    ball.display();
    scoreboard.draw();
}