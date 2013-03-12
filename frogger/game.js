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
    
    frog_x = 185;
    frog_y = 498.5;
    
    incrementUp = false;
    incrementLeft = false;
    incrementRight = false;
    incrementDown = false;
    moving = 0;
    
    up=true;
    left=false;
    right=false;
    down=false;
    
    car1 = new Array;
	car1[0] = 65;
	car1[1] = 175;
	car1[2] = 285;
    
    car2 = new Array;
    car2[0] = 35;
	car2[1] = 155;
	car2[2] = 275;
	
	car3 = new Array;
    car3[0] = 165;
	car3[1] = 275;
	car3[2] = 385;
	
	car4 = new Array;
    car4[0] = 105;
	car4[1] = 215;
	car4[2] = 325;
	
	car5 = new Array;
    car5[0] = 15;
	car5[1] = 165;
	car5[2] = 315;
	
	log1 = new Array;
	log1[0] = 65;
	log1[1] = 175;
	log1[2] = 285;
    
    log2 = new Array;
    log2[0] = 65;
	log2[1] = 175;
	log2[2] = 285;
	
	log3 = new Array;
    log3[0] = 65;
	log3[1] = 175;
	log3[2] = 285;
	
	
	
	carOneSpeed = 40; //(px/s)
    carTwoSpeed = 60;
    carThreeSpeed = 80;
    carFourSpeed = 70;
    carFiveSpeed = 50;
    logOneSpeed = 65;
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
  else if(keyCode==37 && !incrementUp && !incrementRight && !incrementDown && frog_x > 5) {
    incrementLeft = true;
  }
  else if(keyCode==39 && !incrementLeft && !incrementUp && !incrementDown && frog_x < 364.5) {
    incrementRight = true;
  }
  else if(keyCode==40 && !incrementLeft && !incrementRight && !incrementUp && frog_y != 498.5) {
    incrementDown = true;
  }
}



function draw_image()
{
	moveCheck();
	
	timer = timer + .03;
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
    
    drawCars(img);
    
    drawLogs(img);
    
    drawFrog(img);
    
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
		up = true;
		down = false;
		left = false;
		right = false;
		frog_y -= 7;
		moving++;
		if (moving>=5) {
			incrementUp = false;
			moving = 0;
		}
	}
	
	else if (incrementLeft) {
		left = true;
		up = false;
		right = false;
		down = false;
		frog_x -= 6.1;
		moving++;
		if (moving>=5) {
			incrementLeft = false;
			moving = 0;
		}
	}
	
	else if (incrementRight) {
		right = true;
		up = false;
		left = false;
		down = false;
		frog_x += 6.1;
		moving++;
		if (moving>=5) {
			incrementRight = false;
			moving = 0;
		}
	}
	
	else if (incrementDown){
		frog_y != 498.5
		down = true;
		up = false;
		left = false;
		right = false;
		frog_y += 7;
		moving++;
		if (moving>=5) {
			incrementDown = false;
			moving = 0;
		}
	}

}

function drawFrog(img)
{
	if (up) {
		if (incrementUp)
			ctx.drawImage(img, 44, 365, 22, 27, frog_x, frog_y, 22, 27);
		else
			ctx.drawImage(img, 11, 368, 26, 21, frog_x, frog_y, 26, 21);
	}
	
	else if (right) {
		if (incrementRight)
			ctx.drawImage(img, 42, 335, 27, 22, frog_x, frog_y, 27, 22);
		else
			ctx.drawImage(img, 11, 334, 20, 24, frog_x, frog_y, 20, 24);
	}
	
	else if (left) {
		if (incrementLeft)
			ctx.drawImage(img, 112, 338, 27, 22, frog_x, frog_y, 27, 22);
		else
			ctx.drawImage(img, 81, 334, 24, 21, frog_x, frog_y, 24, 21);
	}
	
	else if (down ) {
		if (incrementDown)
			ctx.drawImage(img, 113, 366, 23, 26, frog_x, frog_y, 23, 26);
		else
			ctx.drawImage(img, 79, 369, 25, 19, frog_x, frog_y, 25, 19);
	}
}

function drawCars(img)
{
	for (i = 0; i<3; i++) {
		if (car1[i] + 50 < carOneSpeed*timer)
			car1[i] += 450;
		if (car2[i] + carTwoSpeed*timer > 400)
			car2[i] -= 490;
		if (car3[i] + 50 < carThreeSpeed*timer)
			car3[i] += 450;
		if (car4[i] + carFourSpeed*timer > 400)
			car4[i] -= 430;
		if (car5[i] + 50 < carFiveSpeed*timer)
			car5[i] += 500;
	}

	ctx.drawImage(img, 80, 262, 31, 29, (car1[0]-carOneSpeed*timer), 458, 31, 29); //carOne
    ctx.drawImage(img, 80, 262, 31, 29, (car1[1]-carOneSpeed*timer), 458, 31, 29); //carOne
    ctx.drawImage(img, 80, 262, 31, 29, (car1[2]-carOneSpeed*timer), 458, 31, 29); //carOne
    
    ctx.drawImage(img, 8, 299, 29, 25, (car2[0]+carTwoSpeed*timer), 425, 29, 25); //carTwo
    ctx.drawImage(img, 8, 299, 29, 25, (car2[1]+carTwoSpeed*timer), 425, 29, 25); //carTwo
    ctx.drawImage(img, 8, 299, 29, 25, (car2[2]+carTwoSpeed*timer), 425, 29, 25); //carTwo
    
    ctx.drawImage(img, 9, 266, 32, 23, (car3[0]-carThreeSpeed*timer), 393, 32, 23); //carThree
    ctx.drawImage(img, 9, 266, 32, 23, (car3[1]-carThreeSpeed*timer), 393, 32, 23); //carThree
    ctx.drawImage(img, 9, 266, 32, 23, (car3[2]-carThreeSpeed*timer), 393, 32, 23); //carThree
    
    ctx.drawImage(img, 44, 262, 31, 29, (car4[0]+carFourSpeed*timer), 353, 31, 29); //carFour
    ctx.drawImage(img, 44, 262, 31, 29, (car4[1]+carFourSpeed*timer), 353, 31, 29); //carFour
    ctx.drawImage(img, 44, 262, 31, 29, (car4[2]+carFourSpeed*timer), 353, 31, 29); //carFour
    
    ctx.drawImage(img, 104, 300, 51, 22, (car5[0]-carFiveSpeed*timer), 322, 51, 22); //carFive
    ctx.drawImage(img, 104, 300, 51, 22, (car5[1]-carFiveSpeed*timer), 322, 51, 22); //carFive
    ctx.drawImage(img, 104, 300, 51, 22, (car5[2]-carFiveSpeed*timer), 322, 51, 22); //carFive
}

function drawLogs(img)
{
	for (i = 0; i<3; i++) {
		if (log1[i] + 120 < logOneSpeed*timer)
			log1[i] += 550;
		if (log2[i] + logTwoSpeed*timer > 400)
			log2[i] -= 490;
		if (log3[i] + 50 < logThreeSpeed*timer)
			log3[i] += 450;
	}

	ctx.drawImage(img, 5, 226, 90, 30, (log1[0]-logOneSpeed*timer), 210, 90, 30); //logOne
    ctx.drawImage(img, 5, 226, 90, 30, (log1[0]-logOneSpeed*timer), 210, 90, 30); //logOne
    ctx.drawImage(img, 5, 226, 90, 30, (log1[0]-logOneSpeed*timer), 210, 90, 30); //logOne
    
    ctx.drawImage(img, 8, 299, 29, 25, (log2[0]+logTwoSpeed*timer), 425, 29, 25); //logTwo
    ctx.drawImage(img, 8, 299, 29, 25, (log2[1]+logTwoSpeed*timer), 425, 29, 25); //logTwo
    ctx.drawImage(img, 8, 299, 29, 25, (log2[2]+logTwoSpeed*timer), 425, 29, 25); //logTwo
    
    ctx.drawImage(img, 9, 266, 32, 23, (log3[0]-logThreeSpeed*timer), 393, 32, 23); //logThree
    ctx.drawImage(img, 9, 266, 32, 23, (log3[1]-logThreeSpeed*timer), 393, 32, 23); //logThree
    ctx.drawImage(img, 9, 266, 32, 23, (log3[2]-logThreeSpeed*timer), 393, 32, 23); //logThree
}




