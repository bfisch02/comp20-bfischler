function start_game() {
	my_level = 1;
	my_score = 0;    
	high_score = 0;
	remaining_lives = 3; 
        
        
        
            canvas = document.getElementById('game');
            
            // Check if canvas is supported on browser
            if (canvas.getContext) {
            
                ctx = canvas.getContext('2d');
                
                // Save the default settings (e.g., transformations) now
                ctx.save();
                
                
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
                
           
  
    /*   
                setInterval(start_game) () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, xpos, ypos, frameSize, frameSize, 0, 0, frameSize, frameSize);
            xpos += frameSize;
            index += 1;
            if(index >= numFrames) {
                xpos = 0;
                ypos = 0;
                index = 0;
    
            }
            else if(xpos + frameSize > width) {
                xpos = 0;
                ypos += frameSize;
            }
        }, 1000/24);
   */             
                
                
                // Draw rects
             
           /*     ctx.fillStyle = "#191970";
                ctx.fillRect(50, 50, 100, 75);
                ctx.strokeRect(25, 25, 150, 125);
                ctx.clearRect(75, 75, 25, 25);
  */              
                // Draw circle
/*                ctx.arc(300, 300, 50, 0, 260, true);
                  ctx.fill();
 */               
                // Draw line
 /*               ctx.strokeStyle = '#FF0000';
                ctx.lineWidth = 10;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(10, 400);
                ctx.lineTo(400, 450);
               ctx.stroke();
  */              
                // Draw some text
                ctx.fillStyle="rgb(0, 255, 0)";
                ctx.font = "bold 20px arial";
                ctx.fillText("Level " + my_level, 47, 546);
                ctx.font = "bold 12px arial";
                ctx.fillText("Score: " + my_score, 0, 562);
                ctx.fillText("High Score: " + high_score, 90, 562);
            }
            else {
                alert('Sorry, canvas is not supported on your browser!');
            }
        }
    