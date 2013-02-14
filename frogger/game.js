function start_game() {
	canvas = document.getElementById('game');
    if (canvas.getContext) {
    	ctx = canvas.getContext('2d');
        ctx.save();
        
        initialize_game();
    }
    
    else {
        alert('Sorry, canvas is not supported on your browser!');
	}
}


function initialize_game()
{
	my_level = 1;
	my_score = 0;    
	high_score = 0;
	remaining_lives = 3; 
    timer = 0;   
    frog_xStart = 175;
    frog_yStart = 498; 
    carOneSpeed = 0; //(px/s)
    carTwoSpeed = 0;
    carThreeSpeed = 0;
    carFourSpeed = 0;
    carFiveSpeed = 0;
    logOneSpeed = 0;
    logTwoSpeed = 0;
    logThreeSpeed = 0;
    turtleOneSpeed = 0;
    turtleTwoSpeed = 0;
    game_over = false;
    canvas = document.getElementById('game');
    
    start_animation();
}
    
function start_animation()
{
	delay = 50; // milliseconds
    setInterval(draw_image, delay); // draw refers to the function  

}     
  
function draw_image()
{
	timer = timer + .05;
	ctx.clearRect(0,0,canvas.width,canvas.height);
 		ctx.fillStyle = '#191970';
        ctx.fillRect(0,0,399,290); 
        ctx.fillStyle = '#000000';
        ctx.fillRect(0,280,399,300);
	img = new Image();
    img.src = 'assets/frogger_sprites.png';
    ctx.drawImage(img, 0, 0, 399, 113, 0, 0, 399, 113);
    ctx.drawImage(img, 0, 116, 399, 36, 0, 275, 399, 36);
    ctx.drawImage(img, 0, 116, 399, 36, 0, 490, 399, 36);
    ctx.drawImage(img, 8, 326, 24, 27, 0, 528, 15, 16.875);
    if (remaining_lives > 1)
        ctx.drawImage(img, 8, 326, 24, 27, 12, 528, 15, 16.875);
    if (remaining_lives > 2)
        ctx.drawImage(img, 8, 326, 24, 27, 24, 528, 15, 16.875);
    
    ctx.drawImage(img, 10, 366, 27, 22, frog_xStart, frog_yStart, 27, 22);
    ctx.drawImage(img, 5, 226, 90, 30, logOneSpeed*timer, 210, 90, 30);
    ctx.drawImage(img, 80, 262, 31, 29, 175-carOneSpeed*timer, 458, 31, 29);
    ctx.drawImage(img, 44, 262, 31, 29, 175+carTwoSpeed*timer, 350, 31, 29);
    // ctx.drawImage(img, 5, 226, 90, 30, 0, 240, 90, 30);
    
    ctx.fillStyle="rgb(0, 255, 0)";
    ctx.font = "bold 20px arial";
    ctx.fillText("Level " + my_level, 47, 546);
    ctx.font = "bold 12px arial";
    ctx.fillText("Score: " + my_score, 0, 562);
    ctx.fillText("High Score: " + high_score, 90, 562);
                	
}

