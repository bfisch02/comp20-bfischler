function start_game() 
{
	canvas = document.getElementById('game');
    if (canvas.getContext) {
    	ctx = canvas.getContext('2d');
		        ctx.save();
        high_score = 0;
        initialize_game();
        start_animation();
    }
    
    else {
        alert('Sorry, canvas is not supported on your browser!');
	}
}

function initialize_game()
{
	getImages();

	my_level = 1;
	my_score = 0;
	nextExtraLife=10000;
	remaining_lives = 3; 
    timer = 0;
	elapsedTime=0;
    death = false;
    death_time = 0;
    victory = false;
    victoryTime = 0;
    game_over = false;
    
    carDimensions = new Array;
    logDimensions = new Array;
    turtleDimensions = new Array;
	
	car1 = new Array;
	car2 = new Array;
	car3 = new Array;
	car4 = new Array;
	car5 = new Array;
	log1 = new Array;
    log2 = new Array;
	log3 = new Array;
	turtle1 = new Array;
	turtle2 = new Array;
	victorySquare = new Array;
	
	
	initializeSpeed();

    canvas = document.getElementById('game');
    
    document.addEventListener("keydown", moveFrog, false);
    
    initialize_level();

}

function initialize_level()
{
	initializeCarLocations();
	initializeLogLocations();
	initializeTurtleLocations();
	initializeFrog();
	initializeVictory();
	fly=false;
	flyCounter=0;
	if (my_level>1) {
		carOneSpeed += 20;
    	carTwoSpeed += 20;
    	carThreeSpeed += 20;
    	carFourSpeed += 20;
    	carFiveSpeed += 20;
    	logOneSpeed += 20;
    	logTwoSpeed += 20;
    	logThreeSpeed += 20;
    	turtleSpeed += 20;
    }
}

function initializeCarLocations()
{
	car1[0] = 65;
	car1[1] = 175;
	car1[2] = 285;
    
    car2[0] = 35;
	car2[1] = 155;
	car2[2] = 275;
	
    car3[0] = 165;
	car3[1] = 275;
	car3[2] = 385;
	
    car4[0] = 105;
	car4[1] = 215;
	car4[2] = 325;
	
    car5[0] = 15;
	car5[1] = 165;
	car5[2] = 315;
}

function initializeLogLocations()
{
	log1[0] = 65;
	log1[1] = 215;
	log1[2] = 435;
	log2[0] = 15;
	log2[1] = 255;
	log2[2] = 495;
	log3[0] = 100;
	log3[1] = 300;
	log3[2] = 600;
}

function initializeTurtleLocations()
{
	turtle1[0] = 65;
	turtle1[1] = 215;
	turtle1[2] = 365;
	turtle1[3] = 515;
	turtle1[4] = 665;
	turtle2[0] = 15;
	turtle2[1]= 115;
	turtle2[2]= 215;
	turtle2[3]= 315;
}

function initializeFrog()
{
	frog_x = 185;
    frog_y = 498.5;
    
    progressUp=0;
    progressUpMax=0;
    victory=false;
    incrementUp = false;
    incrementLeft = false;
    incrementRight = false;
    incrementDown = false;
    moving = 0;
    up=true;
    left=false;
    right=false;
    down=false;
}

function initializeVictory()
{
	for (i = 0; i<5; i++)
		victorySquare[i] = false;
	victoryCount = 0;
}

function getImages()
{
	img = new Image();
    img.src = 'assets/frogger_sprites.png';
}

function initializeSpeed()
{
	carOneSpeed = 40; //(px/s)
    carTwoSpeed = 60;
    carThreeSpeed = 80;
    carFourSpeed = 70;
    carFiveSpeed = 50;
    logOneSpeed = 55;
    logTwoSpeed = 115;
    logThreeSpeed = 85;
    turtleSpeed = 80;
}

function start_animation()
{
	delay = 33.333; // milliseconds
	
    setInterval(game_loop, delay); // draw refers to the function  

}     

function game_loop()
{
	draw_image();
	victoryCheck();
	carCollision();
	onLogCheck();
	onTurtleCheck();
	if (my_score>nextExtraLife && remaining_lives<4) {
		remaining_lives++;
		nextExtraLife+=10000;
	}
	if (progressUp>6 && logging==false && turtling==false &&!moving && !victory)
		frogDeath();
	if (game_over) {
		alert("GAME OVER");
		my_level = 1;
		initialize_game();
	}
		
}

function moveFrog(e) 
{
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
	timer = timer + .03;
	ctx.clearRect(0,0,canvas.width,canvas.height);
 		ctx.fillStyle = '#191970';
        ctx.fillRect(0,0,399,290); 
        ctx.fillStyle = '#000000';
        ctx.fillRect(0,285,399,300);
    ctx.drawImage(img, 0, 0, 399, 53, 23, 0, 399, 53);
    ctx.drawImage(img, 0, 53, 399, 60, 0, 53, 399, 60);
    ctx.drawImage(img, 0, 116, 399, 36, 0, 280, 399, 36);
    ctx.drawImage(img, 0, 116, 399, 36, 0, 490, 399, 36);
    if (remaining_lives > 0)
    	ctx.drawImage(img, 8, 326, 24, 27, 0, 528, 15, 16.875);
    if (remaining_lives > 1)
        ctx.drawImage(img, 8, 326, 24, 27, 12, 528, 15, 16.875);
    if (remaining_lives > 2)
        ctx.drawImage(img, 8, 326, 24, 27, 24, 528, 15, 16.875);
    if (remaining_lives > 3)
        ctx.drawImage(img, 8, 326, 24, 27, 36, 528, 15, 16.875);
    
    ctx.fillStyle="rgb(0, 255, 0)";
    ctx.font = "bold 20px arial";
    ctx.fillText("Level " + my_level, 57, 546);
    ctx.fillText("Time", 350, 562);
    ctx.font = "bold 12px arial";
    ctx.fillText("Score: " + my_score, 0, 562);
    ctx.fillText("High Score: " + high_score, 90, 562);
    
    drawTimer();
 
	drawCars(img);
    
    drawLogs(img);
    
    drawTurtles(img);
    
    drawVictory(img);
    
    drawFly(img);
    
    if (victory)
		victoryHelper();
 	else if (death)
		deathHelper();
	else {
		moveCheck();
    	drawFrog(img);
    }  
    if (my_score>high_score)
		high_score = my_score;       	
}

function moveCheck()
{
	if (incrementUp) {
		if (!moving) {
			progressUp++;
			if (progressUp>progressUpMax) {
				progressUpMax++;
				my_score+=10;
			}
		}
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
		if (!moving)
			progressUp--;
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

function drawTimer()
{
	elapsedTime+=.03;
	factor=5;
	if (!death) {
		if (elapsedTime>20 && (Math.floor(elapsedTime*4))%2==0)
			ctx.fillStyle="rgb(255, 0, 0)";
		else
			ctx.fillStyle="rgb(0, 255, 0)";
		ctx.fillRect(195+elapsedTime*factor, 547, 150-elapsedTime*factor, 15);
		if (elapsedTime*factor>=150)
			frogDeath();
	}
}

function drawFrog(img)
{
	if (up) {
		if (incrementUp) {
			ctx.drawImage(img, 44, 365, 22, 27, frog_x, frog_y, 22, 27);
			frogWidth = 20;
			frogLength = 22;
		}
		else {
			ctx.drawImage(img, 11, 368, 26, 21, frog_x, frog_y, 26, 21);
			frogWidth = 24;
			frogLength = 16;
		}
	}
	
	else if (right) {
		if (incrementRight) {
			ctx.drawImage(img, 42, 335, 27, 22, frog_x, frog_y, 27, 22);
			frogWidth = 25;
			frogLength = 17;
		}
		else {
			ctx.drawImage(img, 11, 334, 20, 24, frog_x, frog_y, 20, 24);
			frogWidth = 21;
			frogLength = 19;
		}
	}
	
	else if (left) {
		if (incrementLeft) {
			ctx.drawImage(img, 112, 338, 27, 22, frog_x, frog_y, 27, 22);
			frogWidth = 25;
			frogLength = 27;
		}
		else {
			ctx.drawImage(img, 81, 334, 24, 21, frog_x, frog_y, 24, 21);
			frogWidth = 22;
			frogLength = 16;
		}
	}
	
	else if (down ) {
		if (incrementDown) {
			ctx.drawImage(img, 113, 366, 23, 26, frog_x, frog_y, 23, 26);
			frogWidth = 21;
			frogLength = 21;
		}
		else {
			ctx.drawImage(img, 79, 369, 25, 19, frog_x, frog_y, 25, 19);
			frogWidth = 23;
			frogLength = 14;
		}
	}
	if (frog_x<0 || frog_x>390)
		frogDeath();
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

	
	ctx.drawImage(img, 81, 264, 30, 27, (car1[0]-carOneSpeed*timer), 458, 30, 27); //carOne
		carDimensions[0] = [(car1[0]-carOneSpeed*timer), 458, 25, 27];
    ctx.drawImage(img, 81, 264, 30, 27, (car1[1]-carOneSpeed*timer), 458, 30, 27); //carOne
    	carDimensions[1] = [(car1[1]-carOneSpeed*timer), 458, 25, 27];
    ctx.drawImage(img, 81, 264, 30, 27, (car1[2]-carOneSpeed*timer), 458, 30, 27); //carOne
    	carDimensions[2] = [(car1[2]-carOneSpeed*timer), 458, 25, 27];
    
    
    ctx.drawImage(img, 8, 299, 29, 25, (car2[0]+carTwoSpeed*timer), 425, 29, 25); //carTwo
    	carDimensions[3] = [(car2[0]+carTwoSpeed*timer), 425, 29, 25];
    ctx.drawImage(img, 8, 299, 29, 25, (car2[1]+carTwoSpeed*timer), 425, 29, 25); //carTwo
    	carDimensions[4] = [(car2[1]+carTwoSpeed*timer), 425, 29, 25];
    ctx.drawImage(img, 8, 299, 29, 25, (car2[2]+carTwoSpeed*timer), 425, 29, 25); //carTwo
    	carDimensions[5] = [(car2[2]+carTwoSpeed*timer), 425, 29, 25];
    
    
    ctx.drawImage(img, 9, 266, 32, 23, (car3[0]-carThreeSpeed*timer), 393, 32, 23); //carThree
    	carDimensions[6] = [(car3[0]-carThreeSpeed*timer), 393, 32, 23];
    ctx.drawImage(img, 9, 266, 32, 23, (car3[1]-carThreeSpeed*timer), 393, 32, 23); //carThree
    	carDimensions[7] = [(car3[1]-carThreeSpeed*timer), 393, 32, 23];
    ctx.drawImage(img, 9, 266, 32, 23, (car3[2]-carThreeSpeed*timer), 393, 32, 23); //carThree
    	carDimensions[8] = [(car3[2]-carThreeSpeed*timer), 393, 32, 23];
    
    
    ctx.drawImage(img, 44, 262, 31, 29, (car4[0]+carFourSpeed*timer), 353, 31, 29); //carFour
    	carDimensions[9] = [(car4[0]+carFourSpeed*timer), 353, 31, 29];
    ctx.drawImage(img, 44, 262, 31, 29, (car4[1]+carFourSpeed*timer), 353, 31, 29); //carFour
    	carDimensions[10] = [(car4[1]+carFourSpeed*timer), 353, 31, 29];
    ctx.drawImage(img, 44, 262, 31, 29, (car4[2]+carFourSpeed*timer), 353, 31, 29); //carFour
    	carDimensions[11] = [(car4[2]+carFourSpeed*timer), 353, 31, 29];
    
    
    ctx.drawImage(img, 104, 300, 51, 22, (car5[0]-carFiveSpeed*timer), 322, 51, 22); //carFive
    	carDimensions[12] = [(car5[0]-carFiveSpeed*timer), 322, 51, 22];
    ctx.drawImage(img, 104, 300, 51, 22, (car5[1]-carFiveSpeed*timer), 322, 51, 22); //carFive
    	carDimensions[13] = [(car5[1]-carFiveSpeed*timer), 322, 51, 22];
    ctx.drawImage(img, 104, 300, 51, 22, (car5[2]-carFiveSpeed*timer), 322, 51, 22); //carFive
    	carDimensions[14] = [(car5[2]-carFiveSpeed*timer), 322, 51, 22];
}

function drawLogs(img)
{
	for (i = 0; i<3; i++) {
		if (log1[i] + logOneSpeed*timer > 450)
			log1[i] -= 680;
		if (log2[i] + logTwoSpeed*timer > 400)
			log2[i] -= 720;
		if (log3[i] +logThreeSpeed*timer > 430)
			log3[i] -= 700;
	}

	ctx.drawImage(img, 5, 226, 90, 30, (log1[0]+logOneSpeed*timer), 215, 90, 30); //logOne
		logDimensions[0] = [(log1[0]+logOneSpeed*timer), 215, 90, 30];
    ctx.drawImage(img, 5, 226, 90, 30, (log1[1]+logOneSpeed*timer), 215, 90, 30); //logOne
    	logDimensions[1] = [(log1[1]+logOneSpeed*timer), 215, 90, 30];
    ctx.drawImage(img, 5, 226, 90, 30, (log1[2]+logOneSpeed*timer), 215, 90, 30); //logOne
    	logDimensions[2] = [(log1[2]+logOneSpeed*timer), 215, 90, 30];
    	
    ctx.drawImage(img, 4, 163, 183, 26, (log2[0]+logTwoSpeed*timer), 181, 183, 26); //logTwo
    	logDimensions[3] = [(log2[0]+logTwoSpeed*timer), 181, 183, 26];
    ctx.drawImage(img, 4, 163, 183, 26, (log2[1]+logTwoSpeed*timer), 181, 183, 26); //logTwo
    	logDimensions[4] = [(log2[1]+logTwoSpeed*timer), 181, 183, 26];
    ctx.drawImage(img, 4, 163, 183, 26, (log2[2]+logTwoSpeed*timer), 181, 183, 26); //logTwo
    	logDimensions[5] = [(log2[2]+logTwoSpeed*timer), 181, 183, 26];
    
    ctx.drawImage(img, 4, 196, 121, 24, (log3[0]+logThreeSpeed*timer), 112, 121, 24); //logThree
    	logDimensions[6] = [(log3[0]+logThreeSpeed*timer), 112, 121, 24];
	ctx.drawImage(img, 4, 196, 121, 24, (log3[1]+logThreeSpeed*timer), 112, 121, 24); //logThree
		logDimensions[7] = [(log3[1]+logThreeSpeed*timer), 112, 121, 24];
    ctx.drawImage(img, 4, 196, 121, 24, (log3[2]+logThreeSpeed*timer), 112, 121, 24); //logThree
    	logDimensions[8] = [(log3[2]+logThreeSpeed*timer), 112, 121, 24];
}

function drawTurtles(img)
{
	var increment = 0;
	var numTurtle = 0;
	var i = 0;

	for (k=0; k<750; k+=150) {
		for (j=0; j<99; j+=35) {
			increment=0;
			while (turtle1[0]+j+k+increment-turtleSpeed*timer < -100)
				increment+=810;
			if (k!=600) {
				if ((Math.floor(timer*5))%3 == 0)
					ctx.drawImage(img, 14, 406, 33, 25, (turtle1[0]+j+k+increment-turtleSpeed*timer), 252, 33, 25); //carOne
				else if ((Math.floor(timer*5))%3 == 1)
					ctx.drawImage(img, 54, 406, 33, 25, (turtle1[0]+j+k+increment-turtleSpeed*timer), 252, 33, 25); //carOne
				else
					ctx.drawImage(img, 94, 406, 33, 25, (turtle1[0]+j+k+increment-turtleSpeed*timer), 252, 33, 25); //carOne
				
			}
			else {
				if ((Math.floor(timer*4))%9 == 0)
				ctx.drawImage(img, 14, 406, 33, 25, (turtle1[0]+j+k+increment-turtleSpeed*timer), 252, 33, 25); //carOne
				else if ((Math.floor(timer*4))%9 == 1)
				ctx.drawImage(img, 54, 406, 33, 25, (turtle1[0]+j+k+increment-turtleSpeed*timer), 252, 33, 25); //carOne
				else if ((Math.floor(timer*4))%9 == 2 )
				ctx.drawImage(img, 94, 406, 33, 25, (turtle1[0]+j+k+increment-turtleSpeed*timer), 252, 33, 25); //carOne
				else if ((Math.floor(timer*4))%9 == 3 || (Math.floor(timer*4))%9 == 8)
				ctx.drawImage(img, 134, 406, 33, 25, (turtle1[0]+j+k+increment-turtleSpeed*timer), 252, 33, 25); //carOne
				else if ((Math.floor(timer*4))%9 == 4 || (Math.floor(timer*4))%9 == 7)
				ctx.drawImage(img, 174, 406, 33, 25, (turtle1[0]+j+k+increment-turtleSpeed*timer), 252, 33, 25); //carOne
				
			}
			if(k!=600 || (((Math.floor(timer*4))%9 < 5) || ((Math.floor(timer*4))%9 >6)))
				turtleDimensions[i]=[(turtle1[0]+k+increment-turtleSpeed*timer), 252, 103, 25];
		}
		
		i++;
	}

	for (k=0; k<440; k+=110) {
		for (j=0; j<66; j+=35) {
			increment=0;
			while (turtle1[0]+j+k+increment-turtleSpeed*timer < -100)
				increment+=600;
			if (k!=0) {
				if ((Math.floor(timer*5))%3 == 0)
				ctx.drawImage(img, 14, 406, 33, 25, (turtle1[0]+j+k+increment-turtleSpeed*timer), 147, 33, 25); //carOne
				else if ((Math.floor(timer*5))%3 == 1)
				ctx.drawImage(img, 54, 406, 33, 25, (turtle1[0]+j+k+increment-turtleSpeed*timer), 147, 33, 25); //carOne
				else
				ctx.drawImage(img, 94, 406, 33, 25, (turtle1[0]+j+k+increment-turtleSpeed*timer), 147, 33, 25); //carOne
			}
			else {
				if ((Math.floor(timer*4))%9 == 0)
				ctx.drawImage(img, 14, 406, 33, 25, (turtle1[0]+j+k+increment-turtleSpeed*timer), 147, 33, 25); //carOne
				else if ((Math.floor(timer*4))%9 == 1)
				ctx.drawImage(img, 54, 406, 33, 25, (turtle1[0]+j+k+increment-turtleSpeed*timer), 147, 33, 25); //carOne
				else if ((Math.floor(timer*4))%9 == 2 )
				ctx.drawImage(img, 94, 406, 33, 25, (turtle1[0]+j+k+increment-turtleSpeed*timer), 147, 33, 25); //carOne
				else if ((Math.floor(timer*4))%9 == 3 || (Math.floor(timer*4))%9 == 8)
				ctx.drawImage(img, 134, 406, 33, 25, (turtle1[0]+j+k+increment-turtleSpeed*timer), 147, 33, 25); //carOne
				else if ((Math.floor(timer*4))%9 == 4 || (Math.floor(timer*4))%9 == 7)
				ctx.drawImage(img, 174, 406, 33, 25, (turtle1[0]+j+k+increment-turtleSpeed*timer), 147, 33, 25); //carOne
				
			}
			turtleDimensions[i]=[(turtle1[0]+k+increment-turtleSpeed*timer), 147, 68, 25];
		}
		
		i++;
	}

}

function drawVictory(img)
{
	for (i=0; i<5; i++){
		if (victorySquare[i] && !victory)
			ctx.drawImage(img, 79, 369, 25, 19, 14+85*i, 80, 25, 19);
	}
			
}

function drawFly(img)
{
	var flyHelper=5-victoryCount;
	var j = 0;
	var flyLocationAttempt;
	if (!fly) {
		if (Math.floor(Math.random()*1000)>985) {
			fly=true;
			flyArray = new Array;
			for (i = 0; i < 5; i++) {
				if (!victorySquare[i]) {
					flyArray[j] = i;
					i++;
				}
			}
			flyLocation = flyArray[(Math.floor(Math.random()*flyHelper))];
		}
	}
	if (fly) {
		flyCounter++;
		ctx.drawImage(img, 138, 234, 20, 20, 14+85*flyLocation, 80, 20, 20);
		if (flyCounter>200) {
			fly=false;
			flyCounter=0;
		}
	}
		
		
}

function carCollision()
{
	for (i = 0; i<15; i++) {
		if (frog_x<carDimensions[i][0] && frog_x+frogWidth > carDimensions[i][0]) {
			if (frog_y>carDimensions[i][1] && frog_y+frogLength < carDimensions[i][1]+carDimensions[i][3])
				frogDeath();	
			else if (frog_y<carDimensions[i][1] && frog_y+frogLength>carDimensions[i][1])
				frogDeath();
			else if (frog_y<carDimensions[i][1]+carDimensions[i][3] && frog_y+frogLength>carDimensions[i][1]+carDimensions[i][3])
				frogDeath();
		}
		else if (frog_x>carDimensions[i][0] && frog_x+frogWidth < carDimensions[i][0]+carDimensions[i][2]) {
			if (frog_y>carDimensions[i][1] && frog_y+frogLength < carDimensions[i][1]+carDimensions[i][3])
				frogDeath();	
			else if (frog_y<carDimensions[i][1] && frog_y+frogLength>carDimensions[i][1])
				frogDeath();
			else if (frog_y<carDimensions[i][1]+carDimensions[i][3] && frog_y+frogLength>carDimensions[i][1]+carDimensions[i][3])
				frogDeath();
		}
		else if (frog_x<carDimensions[i][0]+carDimensions[i][2] && frog_x+frogWidth > carDimensions[i][0]+carDimensions[i][2]) {
			if (frog_y>carDimensions[i][1] && frog_y+frogLength < carDimensions[i][1]+carDimensions[i][3])
				frogDeath();	
			else if (frog_y<carDimensions[i][1] && frog_y+frogLength>carDimensions[i][1])
				frogDeath();
			else if (frog_y<carDimensions[i][1]+carDimensions[i][3] && frog_y+frogLength>carDimensions[i][1]+carDimensions[i][3])
				frogDeath();
		}
	}
}

function onLogCheck()
{
	i = 0;
	logging=false;
	if (!moving) {
	while (!logging && i<9) {
		if (frog_x<logDimensions[i][0] && frog_x+frogWidth > logDimensions[i][0]) {
			if (frog_y>logDimensions[i][1] && frog_y+frogLength < logDimensions[i][1]+logDimensions[i][3])
				moveOnLog(i);
			else if (frog_y<logDimensions[i][1] && frog_y+frogLength>logDimensions[i][1])
				moveOnLog(i);
			else if (frog_y<logDimensions[i][1]+logDimensions[i][3] && frog_y+frogLength>logDimensions[i][1]+logDimensions[i][3])
				moveOnLog(i);
		}
		else if (frog_x>logDimensions[i][0] && frog_x+frogWidth < logDimensions[i][0]+logDimensions[i][2]) {
			if (frog_y>logDimensions[i][1] && frog_y+frogLength < logDimensions[i][1]+logDimensions[i][3])
				moveOnLog(i);
			else if (frog_y<logDimensions[i][1] && frog_y+frogLength>logDimensions[i][1])
				moveOnLog(i);
			else if (frog_y<logDimensions[i][1]+logDimensions[i][3] && frog_y+frogLength>logDimensions[i][1]+logDimensions[i][3])
				moveOnLog(i);
		}
		else if (frog_x<logDimensions[i][0]+logDimensions[i][2] && frog_x+frogWidth > logDimensions[i][0]+logDimensions[i][2]) {
			if (frog_y>logDimensions[i][1] && frog_y+frogLength < logDimensions[i][1]+logDimensions[i][3])
				moveOnLog(i);	
			else if (frog_y<logDimensions[i][1] && frog_y+frogLength>logDimensions[i][1])
				moveOnLog(i);
			else if (frog_y<logDimensions[i][1]+logDimensions[i][3] && frog_y+frogLength>logDimensions[i][1]+logDimensions[i][3])
				moveOnLog(i);
		}
		
	i++;
	}
	}
}

function onTurtleCheck()
{
	i = 0;
	turtling=false;
	if (!moving) {
	while (!turtling && i<9) {
		if (frog_x<turtleDimensions[i][0] && frog_x+frogWidth > turtleDimensions[i][0]) {
			if (frog_y>turtleDimensions[i][1] && frog_y+frogLength < turtleDimensions[i][1]+turtleDimensions[i][3])
				moveOnTurtle();
			else if (frog_y<turtleDimensions[i][1] && frog_y+frogLength>turtleDimensions[i][1])
				moveOnTurtle();
			else if (frog_y<turtleDimensions[i][1]+turtleDimensions[i][3] && frog_y+frogLength>turtleDimensions[i][1]+turtleDimensions[i][3])
				moveOnTurtle();
		}
		else if (frog_x>turtleDimensions[i][0] && frog_x+frogWidth < turtleDimensions[i][0]+turtleDimensions[i][2]) {
			if (frog_y>turtleDimensions[i][1] && frog_y+frogLength < turtleDimensions[i][1]+turtleDimensions[i][3])
				moveOnTurtle();
			else if (frog_y<turtleDimensions[i][1] && frog_y+frogLength>turtleDimensions[i][1])
				moveOnTurtle();
			else if (frog_y<turtleDimensions[i][1]+turtleDimensions[i][3] && frog_y+frogLength>turtleDimensions[i][1]+turtleDimensions[i][3])
				moveOnTurtle();
		}
		else if (frog_x<turtleDimensions[i][0]+turtleDimensions[i][2] && frog_x+frogWidth > turtleDimensions[i][0]+turtleDimensions[i][2]) {
			if (frog_y>turtleDimensions[i][1] && frog_y+frogLength < turtleDimensions[i][1]+turtleDimensions[i][3])
				moveOnTurtle();	
			else if (frog_y<turtleDimensions[i][1] && frog_y+frogLength>turtleDimensions[i][1])
				moveOnTurtle();
			else if (frog_y<turtleDimensions[i][1]+turtleDimensions[i][3] && frog_y+frogLength>turtleDimensions[i][1]+turtleDimensions[i][3])
				moveOnTurtle();
		}
	if (((Math.floor(timer*4))%9 == 5 || (Math.floor(timer*4))%9 == 6) && turtling==true && (i==4 || i== 5))
		frogDeath();
	i++;
	}
	}
}

function moveOnLog(whichLog)
{
	logging = true;
	if(whichLog<=2)
		frog_x+=logOneSpeed/delay;
	else if (whichLog<=5)
		frog_x+=logTwoSpeed/delay;
	else
		frog_x+=logThreeSpeed/delay;
}

function moveOnTurtle()
{
	turtling = true;
	frog_x-=turtleSpeed/delay;
}

function victoryCheck()
{
	var i = 0;
	if (progressUp==12 && !moving) {
		while (i<5 && !victory) {
			if ((frog_x > 5+84*i) && (frog_x<30+84*i) && !victorySquare[i]) {
				victory=true;
				victorySquare[i] = true;
				if (fly && flyLocation == i) {
					fly=false;
					my_score+=200;
				}
			}
			i++;
		}
	}
}

function frogDeath()
{
	death=true;
}

function victoryHelper()
{
	
	if (victoryTime==0) {
		victoryLocx=frog_x;
		victoryLocy=frog_y;
	}

	for(i = 0; i<5; i++) {
		if (victorySquare[i] && victoryTime%8<2)
			ctx.drawImage(img, 11, 368, 26, 21, 14+85*i, 80, 23, 26);
		else if (victorySquare[i] && victoryTime%8<4)
			ctx.drawImage(img, 11, 334, 20, 24, 14+85*i, 80, 23, 26);
		else if (victorySquare[i] && victoryTime%8<6)
			ctx.drawImage(img, 81, 334, 24, 21, 14+85*i, 80, 23, 26);
		else if (victorySquare[i] && victoryTime%8<8)
			ctx.drawImage(img, 79, 369, 25, 19, 14+85*i, 80, 23, 26);
	}	
	victoryTime++;
	if(victoryTime > 12) {
		initializeFrog();
		my_score+=50;
		my_score+=10*(Math.floor(30-elapsedTime));
		victory=false;
		victoryTime=0;
		elapsedTime=0;
		victoryCount++;
		if (victoryCount==5) {
			my_score+=1000;
			newLevel();
		}
	}
}

function deathHelper()
{
	deadFrog = new Image;
	deadFrog.src = 'assets/dead_frog.png';
	if (death_time==0) {
		deathLocx=frog_x;
		deathLocy=frog_y;
	}
	ctx.drawImage(deadFrog,0,0,30,30, deathLocx, deathLocy, 30, 30);
	death_time++;
	if(death_time > 45) {
		initializeFrog();
		death=false;
		death_time=0;
		elapsedTime = 0;
		remaining_lives--;
		if (remaining_lives==0)
			game_over = true;
	}
}

function newLevel()
{
	my_level++;
	initialize_level();
}
