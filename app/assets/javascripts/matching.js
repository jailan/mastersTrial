var tiles = new Array(),
flips = new Array('tb', 'bt', 'lr', 'rl' ),
iFlippedTile = null,
iTileBeingFlippedId = null,
tileImages = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20),
tileImages2 = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20),
tileAllocation = null,
iTimer = 0,
iInterval = 100,
iPeekTime = 3000;

var scory =0;
var flags = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
var a = new Array("شجرة","تُفّاحة","مُوز","فيل","قِرْدْ","كرسي","كرة","ساعة","تمساح","جَزَرْ");


function getRandomImageForTile() {

	var index = Math.floor((Math.random() * tileImages2.length)),
	iRandomImage = tileImages2[index];
	tileImages2.splice(index,1);
	
	/*while(tileAllocation[iRandomImage] >= iMaxImageUse ) {
			
		iRandomImage = iRandomImage + 1;
			
		if(iRandomImage >= tileAllocation.length) {
				
			iRandomImage = 0;
		}
	}*/
	
	return iRandomImage;
}
function displayScory(){
	var scoreField = document.getElementById('score');
	scoreField.innerHTML ='Score : '+scory;


}
function createTile(iCounter) {
	var iRandomImage = getRandomImageForTile(),
	curTile =  new tile("tile" + iCounter);
	tileAllocation[iRandomImage] = tileAllocation[iRandomImage] + 1;
	
	curTile.setFrontColor("tileColor" + Math.floor((Math.random() * 5) + 1));
	curTile.setStartAt(500 * Math.floor((Math.random() * 5) + 1));
	curTile.setFlipMethod(flips[Math.floor((Math.random() * 3) + 1)]);
	curTile.setBackContentImage("/assets/images2/" +(iRandomImage +1)+".jpg");
	curTile.setImageNum(iRandomImage);
	
	return curTile;
}
 function getSpeech(fieldClicked) {
    $.ajax({
        url: 'ool',
        type: 'get',
        contentType: 'application/json; charset=UTF-8',
        accept: 'application/json',
        dataType: 'json',
        data: {speech:fieldClicked}
    
    });
};


function initState() {

	/* Reset the tile allocation count array.  This
		is used to ensure each image is only 
		allocated twice.
		*/
		tileAllocation = new Array(0,0,0,0,0,0,0,0,0,0);
		
		while(tiles.length > 0) {
			tiles.pop();
		}
		
		$('#board').empty();
		iTimer = 0;
		
		
	}

	function initTiles() {

		var iCounter = 0, 
		curTile = null;

		initState();
		
	// Randomly create twenty tiles and render to board
	for(iCounter = 0; iCounter < 20; iCounter++) {
		
		curTile = createTile(iCounter);
		
		$('#board').append(curTile.getHTML());
		
		tiles.push(curTile);
	}	
}

function hideTiles(callback) {
	
	var iCounter = 0;

	for(iCounter = 0; iCounter < tiles.length; iCounter++) {
		if(flags[iCounter]===0) 
			
			tiles[iCounter].revertFlip();

	}
	
	callback();
}

function revealTiles(callback) {
	
	var iCounter = 0,
	bTileNotFlipped = false;

	for(iCounter = 0; iCounter < tiles.length; iCounter++) {
		
		if(tiles[iCounter].getFlipped() === false) {
			
			if(iTimer > tiles[iCounter].getStartAt()) {
				tiles[iCounter].flip();
			}
			else {
				bTileNotFlipped = true;
			}
		}
	}
	
	iTimer = iTimer + iInterval;

	if(bTileNotFlipped === true) {
		setTimeout("revealTiles(" + callback + ")",iInterval);
	} else {
		callback();
	}
}


function playAudio(sAudio) {
	
	var audioElement = document.getElementById('audioEngine');
	
	if(audioElement !== null) {

		audioElement.src = sAudio;
		audioElement.play();
	}	
}

function checkMatch() {
	
	if(iFlippedTile === null) {
		
		iFlippedTile = iTileBeingFlippedId;

	} else {

		//alert("here "+ tiles[iFlippedTile].getImageNum()+" "+tiles[iTileBeingFlippedId].getImageNum());
		
		if((tiles[iFlippedTile].getImageNum())%10 !== (tiles[iTileBeingFlippedId].getImageNum())%10) {
			
			setTimeout("tiles[" + iFlippedTile + "].revertFlip()", 2000);
			setTimeout("tiles[" + iTileBeingFlippedId + "].revertFlip()", 2000);
			
		
			playAudio("/assets/boing.wav");
			if(scory!=0)
				scory-=1;

		} else {
			flags[iFlippedTile]=1;
			flags[iTileBeingFlippedId]=1;
			var textq=a[(tiles[iFlippedTile].getImageNum())%10];
            getSpeech(textq);
           
           // playAudio("/assets/applause..mp3");

			scory+=10;
			 new Audio('/assets/lalazy.mp3').play();
			//alert('array:'+flags[0]+""+flags[1]+""+flags[2]+""+flags[3]+""+flags[4]+""+flags[5]+""+flags[6]+""+flags[7]+""+flags[8]+""+flags[9]+""+flags[10]+""+flags[11]+""+flags[12]+""+flags[13]+""+flags[14]+""+flags[15]+""+flags[16]+""+flags[17]+""+flags[18]+""+flags[19]+"");
			//playAudio("/assets/applause.mp3");

		}
		displayScory();
		iFlippedTile = null;
		iTileBeingFlippedId = null;
	}
}

function onPeekComplete() {

	$('div.tile').click(function() {
		
		iTileBeingFlippedId = this.id.substring("tile".length);
		
		if(tiles[iTileBeingFlippedId].getFlipped() === false) {
			tiles[iTileBeingFlippedId].addFlipCompleteCallback(function() { checkMatch(); });
			tiles[iTileBeingFlippedId].flip();
		}
		
	});
}
var first=true;
function onPeekStart() {
	setTimeout("hideTiles( function() { onPeekComplete(); })",iPeekTime);
}

$(document).ready(function() {


	$('#startGameButton').click(function() {
	    //location.reload(true);
	    scory =0;
	    iFlippedTile = null;
	    iTileBeingFlippedId = null;
	    tileImages = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20);
	    tileImages2 = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20);
	    tileAllocation = null;
	    iTimer = 0;
	    iInterval = 100;
	    flags = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
	    initTiles();
	    displayScory();
	    setTimeout("revealTiles(function() { onPeekStart(); })",iInterval);

	});
	$('#flipAgainButton').click(function() {
		
		//initTiles();
		displayScory();
		setTimeout("revealTiles(function() { onPeekStart(); })",iInterval);

	});
});








