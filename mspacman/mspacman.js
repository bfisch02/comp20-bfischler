function start_game()
{
	canvas = document.getElementById('mspacman');
	if (canvas.getContext) 
	{
		ctx = canvas.getContext('2d');
		ctx.save();
		img = new Image();
		
            img.src = 'pacman10-hp-sprite.png';
            ctx.drawImage(img, 322, 0, 464, 138, 0, 0, 464, 138);
            ctx.drawImage(img, 81, 22, 17, 17, 280, 117, 17, 17);
            ctx.drawImage(img, 82, 82, 17, 17, 280, 54, 17, 17);
       //     ctx.drawImage(img, 8, 326, 24, 27, 0, 528, 15, 16.875);
	
	
	
	
	
	
	}
	
	else 
	{
    	alert('Sorry, canvas is not supported on your browser!');
    }
}