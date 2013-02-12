function start_game() {
	var my_level = 1;  
	var my_score = 0;    
	var high_score = 0; 
        
        
        
            canvas = document.getElementById('game');
            
            // Check if canvas is supported on browser
            if (canvas.getContext) {
            
                ctx = canvas.getContext('2d');
                
                // Save the default settings (e.g., transformations) now
                ctx.save();
                
                
                ctx.fillStyle = '#191970';
                ctx.fillRect(0,0,399,290);
                ctx.fillStyle = '#000000';
                ctx.fillRect(0,275,399,300);
                img = new Image();
                img.src = 'assets/frogger_sprites.png';
                ctx.drawImage(img, 0, 0, 399, 113, 0, 0, 399, 113);
                ctx.drawImage(img, 0, 116, 399, 36, 0, 267, 399, 36);
                ctx.drawImage(img, 0, 116, 399, 36, 0, 490, 399, 36);
                
                
           
       /* width = image.width;
        height = image.height;
        canvas = $("#canvas")[0];
        context = canvas.getContext("2d");
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
                ctx.fillText("Level " + my_level, 50, 546);
                ctx.font = "bold 12px arial";
                ctx.fillText("Score: " + my_score, 0, 562);
                ctx.fillText("High Score: " + high_score, 90, 562);
            }
            else {
                alert('Sorry, canvas is not supported on your browser!');
            }
        }
    