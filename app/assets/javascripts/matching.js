var tiles = new Array(),
flips = new Array('tb', 'bt', 'lr', 'rl' ),
iFlippedTile = null,
iTileBeingFlippedId = null,
tileImages = new Array(21,2,13,31,12,23),
tileImages2 = new Array(21,2,13,11,12,23),
tileAllocation = null,
iTimer = 0,
iInterval = 100,
iPeekTime = 6000;
var stageNumber =1;
var yalahwytiti = 0 ;
var irequestflip = false;
var scory =0;
var matchletter = $('.temp_information').data('temp'); 
var abc = ['أ','ب','ت','ث','ج','ح','خ','د','ذ','ر', 'ز', 'س','ش','ص', 'ض', 'ط','ظ','ع','غ','ف','ق','ك','ل','م','ن','ه','و','ي'];

var flags = new Array(0,0,0,0,0,0,0);
var a = new Array("ياماما","بَطّة","بِنت","بُرتُقالة");
var b = new Array("ياماما","1","2","3");
var scoreBar = 0;
var barPercentage = 0;
var lettoz = matchletter;
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
	// scoreField.innerHTML ='Score : '+scory;


}
function createTile(iCounter) {
	//var stageNumber =4;
	var iRandomImage = getRandomImageForTile(),
	curTile =  new tile("tile" + iCounter);
	tileAllocation[iRandomImage] = tileAllocation[iRandomImage] + 1;
	
	curTile.setFrontColor("tileColor" + Math.floor((Math.random() * 5) + 1));
	curTile.setStartAt(500 * Math.floor((Math.random() * 5) + 1));
	curTile.setFlipMethod(flips[Math.floor((Math.random() * 3) + 1)]);
	//HERE WE CHOOSE THE IMAGES THAT RELATE TO THIS CERTAIN LETTER(MATCHLETTER)
	//matchletter=""; //JOLLY, UNCOMMENT THIS TO MAKE IT WORK PROPERLY
	curTile.setBackContentImage("/assets/matching/l"+matchletter+"/stage"+stageNumber+"/" +(iRandomImage)+".jpg");
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

			function speak(word){
var msg = new SpeechSynthesisUtterance();
msg.volume = 1; // 0 to 1
msg.rate = 1; // 0.1 to 10
msg.pitch = 1; //0 to 2
msg.text = word;
msg.lang = 'ar';

msg.onend = function(e) {
  console.log('Finished in ' + event.elapsedTime + ' seconds.');
};

speechSynthesis.speak(msg);
}



function initState() {

	/* Reset the tile allocation count array.  This
		is used to ensure each image is only 
		allocated twice.
		*/
		tileAllocation = new Array(0,0,0);
		
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
	for(iCounter = 0; iCounter < 6; iCounter++) {
		
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
				//alert(yalahwytiti +" mmmmmmmm "+iCounter);
      
				tiles[iCounter].flip();

			}
			else {
				bTileNotFlipped = true;
			}
		}
	}
	// if(irequestflip === true){
	// tiles[yalahwytiti].flip();
	// }
	iTimer = iTimer + iInterval;

	if(bTileNotFlipped === true) {
		setTimeout("revealTiles(" + callback + ")",iInterval);
	} else {
		callback();
	}

	irequestflip = false;
}


function playAudio(sAudio) {
	
	var audioElement = document.getElementById('audioEngine');
	
	if(audioElement !== null) {

		audioElement.src = sAudio;
		audioElement.play();
	}	
}


var county =0;
function checkMatch() {
	
	if(iFlippedTile === null) {
		
		iFlippedTile = iTileBeingFlippedId;

	} else {

		//alert("here "+ tiles[iFlippedTile].getImageNum()+" "+tiles[iTileBeingFlippedId].getImageNum());
		
		if((tiles[iFlippedTile].getImageNum())%10 !== (tiles[iTileBeingFlippedId].getImageNum())%10) {
			
			setTimeout("tiles[" + iFlippedTile + "].revertFlip()", 2000);
			setTimeout("tiles[" + iTileBeingFlippedId + "].revertFlip()", 2000);
			
		var h = b[(tiles[iTileBeingFlippedId].getImageNum())%10];

			
			 new Audio("/assets/Audio/l"+matchletter+"/"+h+".mp3");
			 new Audio('/assets/Audio/boing.mp3').play();
			if(scory!=0)
				scory-=1;

		} else {
			flags[iFlippedTile]=1;
			flags[iTileBeingFlippedId]=1;
			var textq=a[(tiles[iFlippedTile].getImageNum())%10];
			var testAudio = b[(tiles[iFlippedTile].getImageNum())%10];
				scoreBar++;
            //getSpeech(textq);
            /*speak(textq);*/ 
         // alert(testAudio);
            new Audio("/assets/Audio/l"+matchletter+"/"+testAudio+".mp3");
           
			
           
           // playAudio("/assets/applause..mp3");

			scory+=10;
			county ++;
			if(county < 3){
			 new Audio('/assets/Audio/applause.mp3').play();}

			 barPercentage = (scoreBar*100)/15;
        document.getElementById('myBar').style.width = barPercentage+'%';

			 //new Audio('/assets/lalazy.mp3').play();
			//alert('array:'+flags[0]+""+flags[1]+""+flags[2]+""+flags[3]+""+flags[4]+""+flags[5]+""+flags[6]+""+flags[7]+""+flags[8]+""+flags[9]+""+flags[10]+""+flags[11]+""+flags[12]+""+flags[13]+""+flags[14]+""+flags[15]+""+flags[16]+""+flags[17]+""+flags[18]+""+flags[19]+"");
			//playAudio("/assets/applause.mp3");

		}
		displayScory();
		iFlippedTile = null;
		iTileBeingFlippedId = null;
		if (county === 3){
			// testAudio = b[(tiles[iFlippedTile].getImageNum())%10];
			//   new Audio("/assets/Audio/l"+matchletter+"/"+testAudio+".mp3");
			 new Audio('/assets/Audio/applausy.mp3').play();
			 new Audio('/assets/Audio/tada.mp3').play();

			upgradeLevel();
		}
	}
}

function onPeekComplete() {

	$('div.tile').click(function() {

		
		iTileBeingFlippedId = this.id.substring("tile".length);
			var g = b[(tiles[iTileBeingFlippedId].getImageNum())%10];
			playAudio("/assets/Audio/l"+matchletter+"/"+g+".mp3");
		
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

function sendStage(stageNo){
stageNumber = stageNo;
setTimeout(function(){ initiateMatchingGame(); }, 6000); 
}

function upgradeLevel(n){


          if(stageNumber < 5){
          stageNumber ++;
           county =0;
          //playAudio("/assets/Audio/applause.mp3");

            barPercentage = (scoreBar*100)/15;
        document.getElementById('myBar').style.width = barPercentage+'%';
       //initiateMatchingGame();/* WE CAN WAIT HERE*/ "SET TIME OUT INSTEAD OF CLICKING THE NEW GAME BUTON AGAIN"
setTimeout(function(){ initiateMatchingGame(); }, 5000); }
          else{
          	// new Audio('/assets/Audio/applausy.mp3').play();
            celebrate();
          }/*IN CASE OF AUTOMATIC CHANGE*/
         

        
}
function initiateMatchingGame(){
	   scory =0;
	    iFlippedTile = null;
	    iTileBeingFlippedId = null;
	    tileImages = new Array(21,2,13,31,12,23);
	    tileImages2 = new Array(21,2,13,31,12,23);
	    tileAllocation = null;
	    iTimer = 0;
	    iInterval = 100;
	    flags = new Array(0,0,0,0,0,0);
	    initTiles();
	    displayScory();
	    setTimeout("revealTiles(function() { onPeekStart(); })",iInterval);
}
 

$(document).ready(function() {
initiateMatchingGame();

	$('#startGameButton').click(function() {
	    //location.reload(true);
	    scory =0;
	    iFlippedTile = null;
	    iTileBeingFlippedId = null;
	    tileImages = new Array(21,2,13,31,12,23);
	    tileImages2 = new Array(21,2,13,31,12,23);
	    tileAllocation = null;
	    iTimer = 0;
	    iInterval = 100;
	    flags = new Array(0,0,0,0,0,0);
	    initTiles();
	    displayScory();
	    setTimeout("revealTiles(function() { onPeekStart(); })",iInterval);
	    //alert(abc[matchletter-1]);

	});
	$('#flipAgainButton').click(function() {
		// yalahwytiti = (b[(tiles[iTileBeingFlippedId].getImageNum())%10]);
		yalahwytiti = iTileBeingFlippedId;
		irequestflip = true;
		iTileBeingFlippedId = null;
		iFlippedTile = null;
			flags[iFlippedTile]=0;
			flags[iTileBeingFlippedId]=0;
		//initTiles();
		displayScory();
		setTimeout("revealTiles(function() { onPeekStart(); })",iInterval);

	});

		$('#level1').click(function() {
		sendStage(1);
	});
		$('#level2').click(function() {
		sendStage(2);
	});
		$('#level3').click(function() {
		sendStage(3);
	});
		$('#level4').click(function() {
		sendStage(4);
	});
		$('#level5').click(function() {
		sendStage(5);
	});
});

 








