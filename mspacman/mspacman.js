function start_game()
{
	canvas = document.getElementById('mspacman');
	if (canvas.getContext) 
	{
		ctx = canvas.getContext('2d');
		img = new Image();
            img.src = 'mspacman/pacman10-hp-sprite.png';
            ctx.drawImage(img, 0, 0, 138, 464, 0, 0, 138, 464);
   //         ctx.drawImage(img, 0, 116, 399, 36, 0, 275, 399, 36);
     //       ctx.drawImage(img, 0, 116, 399, 36, 0, 490, 399, 36);
       //     ctx.drawImage(img, 8, 326, 24, 27, 0, 528, 15, 16.875);
	
	
	
	
	
	
	}
	
	else 
	{
    	alert('Sorry, canvas is not supported on your browser!');
    }
}