// Global variables

var canvas = document.getElementById('stage'),
word = document.getElementById('word'),
letters = document.getElementById('letters'),
wordToGuess,
wordLength,
badGuesses,
randWord,
correctGuesses;
   var hints = new Array(1,2,3);
     var textq;
     var hangletter = $('.temp_information').data('temp'); 

function init() {
	var helptext = $('#helptext'),
	w = screen.availWidth <= 800 ? screen.availWidth : 800;
	
    // Hide the loading message and display the control buttons
    $('#loading').hide();
    $('#play').css('display', 'inline-block').click(newGame);
    $('#listen2').css('display', 'inline-block').click(listen);
    $('#clear').css('display', 'inline-block').click(resetScore);
    $('#help').click(function(e) {
    	$('body').append('<div id="mask"></div>');
    	helptext.show().css('margin-left', (w-300)/2 + 'px');
    });
    $('#close').click(function(e) {
    	$('#mask').remove();
    	helptext.hide();
    });
    // Rescale the canvas if the screen is wider than 700px
    if (screen.innerWidth >= 700) {
    	canvas.getContext('2d').scale(1.5, 1.5);
    }
    // Initialize the scores and store locally if not already stored
    if (localStorage.getItem('hangmanWin') == null) {
    	localStorage.setItem('hangmanWin', '0');
    } 
    if (localStorage.getItem('hangmanLose') == null) {
    	localStorage.setItem('hangmanLose', '0');
    }
    newGame();
    showScore();


}
var index =1 ;
function getRandomImageHint() {

  /*var index = Math.floor((Math.random() * hints.length)),
   index=randWord;    (WHEN WE WERE RANDOM)*/

 
    // iRandomImage = hints[index];
     
    var imgName ;
switch(wholeStage){
  case 1:
  case 4:
  imgName = index+".jpg";
  break;
    case 2:  
  imgName = index+"w.jpg";
  break;
    case 3:
    case 5:
  imgName = index+"p.jpg";
  break;

}
    $("#hint").attr("src","/assets/hangman/l"+hangletter+"/"+imgName);

    //index++;
    // tileImages2.splice(index,1);
    // return iRandomImage;
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


    var abc1 = ['أَ','بَ','تَ','ثَ','جَ','حَ','خَ','دَ','ذَ','رَ','زَ','سَ','شَ','صَ','ضَ','طَ'
  ,'ظَ','عَ','غَ','فَ','قَ','كَ','لَ','مَ','نَ','هَ','وَ','يَ'];
  
var abc2 = ['أِ','بِ','تِ','ثِ','جِ','حِ','خِ','دِ','ذِ','رِ','زِ','سِ','شِ','صِ','ضِ','طِ'
  ,'ظِ','عِ','غِ','فِ','قِ','كِ','لِ','مِ','نِ','هِ','وِ','يِ'];

  var abc3 =['أُ','بُ','تُ','ثُ','جُ','حُ','خُ','دُ','ذُ','رُ','زُ','سُ','شُ','صُ','ضُ','طُ'
  ,'ظُ','عُ','غُ','فُ','قُ','كُ','لُ','مُ','نُ','هُ','وُ','يُ'];

var placeholders;
function newGame() {
placeholders = '',
	frag = document.createDocumentFragment(),
  //   abc = ['خ','ح','ج','ث','ت','ب','أ','ص','ش','س','ز','ر','ذ',
  // 'د','ق','ف','غ','ع','ظ','ط','ض','ي','و','ه','ن','م','ل','ك','ا','ة']; 
  //THE OLD ONE WITH TEH MARBOOTA AND ALEF MADD

    hints = new Array(1,2,3); 
	badGuesses = 0;
	correctGuesses = 0;
	wordToGuess = getWord();
    getRandomImageHint();
	wordLength = wordToGuess.length;
  placeholders +='_';
  var abc;

if (wholeStage < 4){
  abc = ['خ','ح','ج','ث','ت','ب','أ','ص','ش','س','ز','ر','ذ',
  'د','ق','ف','غ','ع','ظ','ط','ض','ي','و','ه','ن','م','ل','ك'];
}
else{
      var v = hangletter-1;
     abc = [abc1[v],abc2[v],abc3[v]];


}
    /*  var abc = ['خ','ح','ج','ث','ت','ب','أ','ص','ش','س','ز','ر','ذ',
  'د','ق','ف','غ','ع','ظ','ط','ض','ي','و','ه','ن','م','ل','ك'];
*/

		// create row of underscores the same length as letters to guess
		for (var i = 1; i < wordLength; i++) {
			placeholders += wordToGuess[i];
		}
    // fill the whole word except for the first letter

		word.innerHTML = placeholders;
// create an alphabet pad to select letters
letters.innerHTML = '';
for (i = 0; i < abc.length; i++) {
	var div = document.createElement('div');
	div.style.cursor = 'pointer';
	div.innerHTML = abc[i];
	div.onclick = getLetter;
	frag.appendChild(div);
}
letters.appendChild(frag);
window.scrollBy(0, 200);
}

// Get selected letter and remove it from the alphabet pad
function getLetter() {
	checkLetter(this.innerHTML);
	this.innerHTML = '&nbsp;';
	this.style.cursor = 'default';
	this.onclick = null;
}

// Check whether selected letter is in the word to be guessed
function checkLetter(letter) {
	var placeholders = word.innerHTML,
	wrongGuess = true;
   // split the placeholders into an array
   placeholders = placeholders.split('');
   // loop through the array
  
      // if the selected letter matches one in the word to guess,
      // replace the underscore and increase the number of correct guesses
      if(wholeStage < 4){
         for (var i = 0; i < wordLength; i++) {
      if (wordToGuess.charAt(i) == letter.toLowerCase()) {
      	placeholders[i] = letter;
      	wrongGuess = false;
       new Audio('/assets/applause.mp3').play();
      
      	correctGuesses++;
         // redraw the canvas only if all letters have been guessed
         if (correctGuesses == 1) {
           
         	drawCanvas();
          setTimeout(upgradeLevel, 2000);

         }
     }
   }
   }

     else {


        switch (index){
          case 1:
        if (letter === abc1[hangletter-1])  {
        placeholders[0] = letter;
        wrongGuess = false;
        new Audio('/assets/applause.mp3').play();
         correctGuesses++;
         if (correctGuesses == 1) {
          drawCanvas();
          setTimeout(upgradeLevel, 2000);}
     }
          break;
          case 2:
        if (letter === abc2[hangletter-1])  {
        placeholders[0] = letter;
        wrongGuess = false;
        new Audio('/assets/applause.mp3').play();
         correctGuesses++;
         if (correctGuesses == 1) {
          drawCanvas();
          setTimeout(upgradeLevel, 2000);}
     }
          break;
          case 3:
                if (letter === abc3[hangletter-1])  {
        placeholders[0] = letter;
        wrongGuess = false;
        new Audio('/assets/applause.mp3').play();
         correctGuesses++;
         if (correctGuesses == 1) {
          drawCanvas();
          setTimeout(upgradeLevel, 2000);}
     }
          break;                    
        }



     }

   // if the guess was incorrect, increment the number of bad
   // guesses and redraw the canvas
   if (wrongGuess) {
   	badGuesses++;
   new Audio('/assets/boing.wav').play();
   	drawCanvas();
   }
   // convert the array to a string and display it again
   word.innerHTML = placeholders.join('');
}
wholeStage=1;

function upgradeLevel(n){
 if(index < 3){
    index ++;
    lettoindex++;
        newGame();}
        else{
          if(wholeStage < 5){
          wholeStage ++; }
          else{
            wholeStage =1;
          }/*IN CASE OF AUTOMATIC CHANGE*/
            index =1;
    lettoindex=0;
        newGame();
        }
}
// Draw the canvas
function drawCanvas() {
	var c = canvas.getContext('2d');
    // reset the canvas and set basic styles
    canvas.width = canvas.width;
    c.lineWidth = 10;
    c.strokeStyle = '#006';
    c.font = 'bold 24px Optimer, Arial, Helvetica, sans-serif';
    c.fillStyle = 'red';
    // draw the ground
    drawLine(c, [20,190], [180,190]);
    // start building the gallows if there's been a bad guess
    if (badGuesses > 0) {
        // create the upright
        //c.strokeStyle = '#A52A2A';dark RED
          c.strokeStyle ='#8F006B';
        drawLine(c, [30,185], [30,10]);
        if (badGuesses > 1) {
            // create the arm of the gallows
            c.lineTo(150,10);
            c.stroke();
        }
        if (badGuesses > 2) {
        	c.strokeStyle = 'black';
        	c.lineWidth = 3;
            // draw rope
            drawLine(c, [145,15], [145,30]);
            // draw head
            c.beginPath();
            c.moveTo(160, 45);
            c.arc(145, 45, 15, 0, (Math.PI/180)*360);
            c.stroke(); 
        }
        if (badGuesses > 3) {
            // draw body
            drawLine(c, [145,60], [145,130]);
        }
        if (badGuesses > 4) {
            // draw left arm
            drawLine(c, [145,80], [110,90]);
        }
        if (badGuesses > 5) {
            // draw right arm
            drawLine(c, [145,80], [180,90]);
        }
        if (badGuesses > 6) {
            // draw left leg
            drawLine(c, [145,130], [130,170]);
        }
        if (badGuesses > 7) {
            // draw right leg and end game
            drawLine(c, [145,130], [160,170]);
            c.fillText('Game over', 45, 110);
            // remove the alphabet pad
            letters.innerHTML = '';
            // display the correct answer
            // need to use setTimeout to prevent race condition
            setTimeout(showResult, 200);

     // increase score of lost games
// display the score after two seconds
localStorage.setItem('hangmanLose', 1 + parseInt(localStorage.getItem('hangmanLose')));
setTimeout(showScore, 2000);
}
}
    // if the word has been guessed correctly, display message,
    // update score of games won, and then show score after 2 seconds
    if (correctGuesses == wordLength) {
         textq=wordToGuess;
     getSpeech(textq);

    	letters.innerHTML = '';
        c.fillStyle='#24px Optimer, Arial, Helvetica, sans-serif';
        c.fillStyle = '#8F006B';
    	c.fillText('HORRAY!!', 45,80);
        c.fillText('You Won ! =)', 45,110);
        // increase score of won games
        // display score
        // code to be added later
    }
}
// When the game is over, display missing letters in red
function showResult() {
	var placeholders = word.innerHTML;
	placeholders = placeholders.split('');
	for (i = 0; i < wordLength; i++) {
		if (placeholders[i] == '_') {
			//placeholders[i] = '<span style="color:red">' + wordToGuess.charAt(i).toUpperCase() + '</span>';
            var letterzo=wordToGuess.charAt(i);
            //letterzo='<span style="color:red">'+""+'</span>';
            placeholders[i] =letterzo;
		}
	}
	word.innerHTML = placeholders.join('');
    
}
function drawLine(context, from, to) {
	context.beginPath();
	context.moveTo(from[0], from[1]);
	context.lineTo(to[0], to[1]);
	context.stroke();
}
// Display the score in the canvas
function showScore() {
    var won = localStorage.getItem('hangmanWin'),
        lost = localStorage.getItem('hangmanLose'),
        c = canvas.getContext('2d');
    // clear the canvas
    canvas.width = canvas.width;
    c.font = 'bold 24px Optimer, Arial, Helvetica, sans-serif';
    c.fillStyle = '#8F006B';/*Fuschia Dark*/
    c.textAlign = 'center';
    c.fillText('YOUR SCORE', 100, 50);
    c.font = 'bold 18px Optimer, Arial, Helvetica, sans-serif';
    c.fillStyle = '#006';/*Fuschia*/
    c.fillText('Won: ' + won + ' Lost: ' + lost, 100, 80);
}
function listen(){
      textq=wordToGuess;
     //getSpeech(textq);
     speak(textq);

     //new Audio('/assets/lalazo.mp3').play();
}

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




// Reset stored scores to zero
function resetScore() {
    localStorage.setItem('hangmanWin', '0');
    localStorage.setItem('hangmanLose', '0');
    showScore();
}

function sendHangStage(n){

wholeStage =n;
index =1;
lettoindex=0;
newGame();
}


    $('#level1').click(function() {
    sendHangStage(1);
  });
    $('#level2').click(function() {
    sendHangStage(2);
  });
    $('#level3').click(function() {
    sendHangStage(3);
  });
    $('#level4').click(function() {
    sendHangStage(4);
  });
    $('#level5').click(function() {
    sendHangStage(5);
  });


// Select random word to guess
var lettoindex=0;
function getWord() {
  //var abjad = var game = $('.temp_information').data('temp'); 
  // abjad = $('.temp_information').data('temp'); 
  // HERE , WE CHECK ON THE LETTER AND ACCORDINGLY DECIDE THE WORDS !
  // we handle pictures in line 56 (HANGLETTER)
  var a = new Array ("أسد");
          switch (hangletter) {
    case 1:
        a = new Array("أسد");
        break;
    case 2:
        a = new Array("بطة","بنت","برتقالة");
        break;
    case 3:
        a = new Array("تمساح");
        break;
                 
}
	//var a = new Array('abate','aberrant','abscond','accolade','acerbic','acumen','adulation','adulterate','aesthetic','aggrandize','alacrity','alchemy','amalgamate','ameliorate','amenable','anachronism','anomaly','approbation','archaic','arduous','ascetic','assuage','astringent','audacious','austere','avarice','aver','axiom','bolster','bombast','bombastic','bucolic','burgeon','cacophony','canon','canonical','capricious','castigation','catalyst','caustic','censure','chary','chicanery','cogent','complaisance','connoisseur','contentious','contrite','convention','convoluted','credulous','culpable','cynicism','dearth','decorum','demur','derision','desiccate','diatribe','didactic','dilettante','disabuse','discordant','discretion','disinterested','disparage','disparate','dissemble','divulge','dogmatic','ebullience','eccentric','eclectic','effrontery','elegy','eloquent','emollient','empirical','endemic','enervate','enigmatic','ennui','ephemeral','equivocate','erudite','esoteric','eulogy','evanescent','exacerbate','exculpate','exigent','exonerate','extemporaneous','facetious','fallacy','fawn','fervent','filibuster','flout','fortuitous','fulminate','furtive','garrulous','germane','glib','grandiloquence','gregarious','hackneyed','halcyon','harangue','hedonism','hegemony','heretical','hubris','hyperbole','iconoclast','idolatrous','imminent','immutable','impassive','impecunious','imperturbable','impetuous','implacable','impunity','inchoate','incipient','indifferent','inert','infelicitous','ingenuous','inimical','innocuous','insipid','intractable','intransigent','intrepid','inured','inveigle','irascible','laconic','laud','loquacious','lucid','luminous','magnanimity','malevolent','malleable','martial','maverick','mendacity','mercurial','meticulous','misanthrope','mitigate','mollify','morose','mundane','nebulous','neologism','neophyte','noxious','obdurate','obfuscate','obsequious','obstinate','obtuse','obviate','occlude','odious','onerous','opaque','opprobrium','oscillation','ostentatious','paean','parody','pedagogy','pedantic','penurious','penury','perennial','perfidy','perfunctory','pernicious','perspicacious','peruse','pervade','pervasive','phlegmatic','pine','pious','pirate','pith','pithy','placate','platitude','plethora','plummet','polemical','pragmatic','prattle','precipitate','precursor','predilection','preen','prescience','presumptuous','prevaricate','pristine','probity','proclivity','prodigal','prodigious','profligate','profuse','proliferate','prolific','propensity','prosaic','pungent','putrefy','quaff','qualm','querulous','query','quiescence','quixotic','quotidian','rancorous','rarefy','recalcitrant','recant','recondite','redoubtable','refulgent','refute','relegate','renege','repudiate','rescind','reticent','reverent','rhetoric','salubrious','sanction','satire','sedulous','shard','solicitous','solvent','soporific','sordid','sparse','specious','spendthrift','sporadic','spurious','squalid','squander','static','stoic','stupefy','stymie','subpoena','subtle','succinct','superfluous','supplant','surfeit','synthesis','tacit','tenacity','terse','tirade','torpid','torque','tortuous','tout','transient','trenchant','truculent','ubiquitous','unfeigned','untenable','urbane','vacillate','variegated','veracity','vexation','vigilant','vilify','virulent','viscous','vituperate','volatile','voracious','waver','zealous');
    //var a = new Array("حمار","أسبوع","سنة","شهر","يوم","قطة","كلب","دب","تمساح","تفاح","تمر","أسد","عصفور","منضدة","كرسي","سيارة","طفل","حصان","نمر","ساعة","موز","يوسفي","برتقال");
   //THIS IS THE ONE 
   // var a = new Array("فيل","قطة","كلب","دب","تمساح","تُفّاح","قرد","أسد","عصفور","سمكة","كرسي","شجرة","حصان","زرافة","ساعة","موز","أناناس","برتقال");

//randWord=parseInt(Math.random()* a.length);
//lettoindex++;
	return a[lettoindex];
}