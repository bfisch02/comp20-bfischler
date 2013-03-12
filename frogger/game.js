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
	moving=0;
	my_level = 1;
	my_score = 0;    
	high_score = 0;
	remaining_lives = 3; 
    timer = 0;   
    frog_x = 183;
    frog_y = 498; 
    incrementUp = false;
    incrementLeft = false;
    incrementRight = false;
    incrementDown = false;
    carOneSpeed = 300; //(px/s)
    carTwoSpeed = 100;
    carThreeSpeed = 0;
    carFourSpeed = 0;
    carFiveSpeed = 0;
    logOneSpeed = 200;
    logTwoSpeed = 0;
    logThreeSpeed = 0;
    turtleOneSpeed = 0;
    turtleTwoSpeed = 0;
    game_over = false;
    canvas = document.getElementById('game');
    document.addEventListener("keydown", moveFrog, false);
    start_animation();
}
    
function start_animation()
{
	delay = 33.333; // milliseconds
	
    setInterval(game_loop, delay); // draw refers to the function  

}     

function game_loop()
{
	draw_image();
}

function moveFrog(e) {
  var keyCode = e.keyCode;
  if(keyCode==38 && !incrementLeft && !incrementRight && !incrementDown) {
    incrementUp=true;
  } 
  else if(keyCode==37 && !incrementUp && !incrementRight && !incrementDown) {
    incrementLeft = true;
  }
  else if(keyCode==39 && !incrementLeft && !incrementUp && !incrementDown) {
    incrementRight = true;
  }
  else if(keyCode==40 && !incrementLeft && !incrementRight && !incrementUp) {
    incrementDown = true;
  }
}



function draw_image()
{
	moveCheck();
	
	timer = timer + .013;
	ctx.clearRect(0,0,canvas.width,canvas.height);
 		ctx.fillStyle = '#191970';
        ctx.fillRect(0,0,399,290); 
        ctx.fillStyle = '#000000';
        ctx.fillRect(0,285,399,300);
	img = new Image();
    img.src = 'assets/frogger_sprites.png';
    ctx.drawImage(img, 0, 0, 399, 113, 0, 0, 399, 113);
    ctx.drawImage(img, 0, 116, 399, 36, 0, 280, 399, 36);
    ctx.drawImage(img, 0, 116, 399, 36, 0, 490, 399, 36);
    ctx.drawImage(img, 8, 326, 24, 27, 0, 528, 15, 16.875);
    if (remaining_lives > 1)
        ctx.drawImage(img, 8, 326, 24, 27, 12, 528, 15, 16.875);
    if (remaining_lives > 2)
        ctx.drawImage(img, 8, 326, 24, 27, 24, 528, 15, 16.875);
    
    ctx.drawImage(img, 10, 366, 27, 22, frog_x, frog_y, 27, 22);
    ctx.drawImage(img, 5, 226, 90, 30, (logOneSpeed*timer), 210, 90, 30);
    ctx.drawImage(img, 80, 262, 31, 29, (175-carOneSpeed*timer), 458, 31, 29); //carOne
    ctx.drawImage(img, 44, 262, 31, 29, (175+carTwoSpeed*timer), 350, 31, 29); //carTwo
    // ctx.drawImage(img, 5, 226, 90, 30, 0, 240, 90, 30);
    
    ctx.fillStyle="rgb(0, 255, 0)";
    ctx.font = "bold 20px arial";
    ctx.fillText("Level " + my_level, 47, 546);
    ctx.font = "bold 12px arial";
    ctx.fillText("Score: " + my_score, 0, 562);
    ctx.fillText("High Score: " + high_score, 90, 562);
                	
}

function moveCheck()
{
	if (incrementUp) {
		frog_y -= 3.5;
		moving++;
		if (moving>=10) {
			incrementUp = false;
			moving = 0;
		}
	}
	
	else if (incrementLeft) {
		frog_x -= 2.8;
		moving++;
		if (moving>=10) {
			incrementLeft = false;
			moving = 0;
		}
	}
	
	else if (incrementRight) {
		frog_x += 2.8;
		moving++;
		if (moving>=10) {
			incrementRight = false;
			moving = 0;
		}
	}
	
	else if (incrementDown){
		frog_y += 3.5;
		moving++;
		if (moving>=10) {
			incrementDown = false;
			moving = 0;
		}
	}

}



