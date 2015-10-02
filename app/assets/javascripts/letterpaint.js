(function(){

  /* Get container elements */
  var container = document.querySelector('#container');
  var charscontainer = document.querySelector('#chars');

  /* Get buttons */
  var startbutton = document.querySelector('#intro button');
  var infobutton = document.querySelector('#infos');
  var installbutton = document.querySelector('#install');
  var winbutton = document.querySelector('#win button');
  var reloadbutton = document.querySelector('#reload');
  var soundbutton = document.querySelector('#sound');
  var errorbutton = document.querySelector('#error button');

  /* Get sounds */
  var winsound = document.querySelector('#winsound');
   var applausesound = document.querySelector('#applausesound');
  var errorsound = document.querySelector('#errorsound');

  /* Prepare canvas */
  var c = document.querySelector('canvas');
  var cx = c.getContext('2d');
  var letter = null; //UNCOMMENT THIS TO WORK PROPERLY
  var fontsize = 300;
  var paintcolour = [240, 240, 240];
 // var textcolour = [255, 30, 20]; red
  var textcolour = [153, 0, 102];
  var xoffset = 0;
  var yoffset = 0;
  var linewidth = 20;
  //var linewidth = 2;
  var pixels = 0;
  var letterpixels = 0;

  /* Mouse and touch events */
  var mousedown = false;
  var touched = false;
  var oldx = 0;
  var oldy = 0;

  /* Overall game presets */
  var state = 'intro';
  var sound = true;
  var currentstate;
  var writingletter =2;
var FONTO = 0.9;


 var THICKNESS =15 ; 
var PaintLevel =1 ;
 document.getElementById("paintStage").innerHTML= PaintLevel;
 function UpdatePaintLevel(){
  if (PaintLevel <5 ){
    PaintLevel ++ ;
    FONTO = FONTO+0.3;
    THICKNESS = THICKNESS +5;
  }
  else{
    FONTO = 0.9;
    THICKNESS = 15;
    PaintLevel =1;
  }
  xoffset = 0;
  yoffset = 0;
  linewidth = 20;
  pixels = 0;
  letterpixels = 0;
  mousedown = false;
  touched = false;
  oldx = 0;
  oldy = 0;
  sound = true;
  init();
  document.getElementById("paintStage").innerHTML= PaintLevel;
 }

  function init() {
    xoffset = container.offsetLeft;
    yoffset = container.offsetTop;
    fontsize = container.offsetHeight / FONTO;
    linewidth = container.offsetHeight / THICKNESS;
    paintletter();
    setstate('intro');
    writingletter = $('.temp_information').data('temp'); 
  }

  function togglesound() {
    if (sound) {
      sound = false;
      soundbutton.className = 'navbuttonoff';
    } else {
      sound = true;
      soundbutton.className = 'navbutton';
    }
  }

  function showerror() {
    setstate('error');
    if (sound) {
      errorsound.play();
    }
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  }

  function showinfo() {
    if (state !== 'info') {
      setstate('info');
    } else {
      setstate('play');
    }
  }

  function setstate(newstate) {
    state = newstate;
    container.className = newstate;
    currentsate = state;
  }
  function moreneeded() {
    setstate('play');
    mousedown = false;
  }
  function retry(ev) {
    mousedown = false;
    oldx = 0;
    oldy = 0;
    paintletter(letter);
  }
  function winner() {
    paintletter();
  }
  function start() {
    paintletter(letter);
  }
  function cancel() {
    paintletter();
  }
  function paintletter(retryletter) {
    var chars = charscontainer.innerHTML.split('');
    //letter = retryletter ||
             //chars[parseInt(Math.random() * chars.length,10)];
    letter = chars[writingletter-1];         
    c.width = container.offsetWidth;
    c.height = container.offsetHeight;
    cx.font = 'bold ' + fontsize + 'px Open Sans';
    cx.fillStyle = 'rgb(' + textcolour.join(',') + ')';
    cx.strokeStyle = 'rgb(' + paintcolour.join(',') + ')';
    cx.shadowOffsetX = 2;
    cx.shadowOffsetY = 2;
    cx.shadowBlur = 4;
    cx.shadowColor = '#666';

    cx.textBaseline = 'baseline';
    cx.lineWidth = linewidth;
    cx.lineCap = 'round';
    cx.fillText(
      letter,
      (c.width - cx.measureText(letter).width) / 2,
      (c.height / 1.6)
    ); //PLACE OF THE LETTER POSITION
    pixels = cx.getImageData(0, 0, c.width, c.height);
    letterpixels = getpixelamount(
      textcolour[0],
      textcolour[1],
      textcolour[2]
    );
    cx.shadowOffsetX = 0;
    cx.shadowOffsetY = 0;
    cx.shadowBlur = 0;
    cx.shadowColor = '#333';
    setstate('play');
  }

  function getpixelamount(r, g, b) {
    var pixels = cx.getImageData(0, 0, c.width, c.height);
    var all = pixels.data.length;
    var amount = 0;
    for (i = 0; i < all; i += 4) {
      if (pixels.data[i] === r &&
          pixels.data[i+1] === g &&
          pixels.data[i+2] === b) {
        amount++;
      }
    }
    return amount;
  }
var errorcount=0;
var ERRORS_THRESHOLD = 30;
  function paint(x, y) {
    var rx = x - xoffset;
    var ry = y - yoffset;
    var colour = pixelcolour(x, y);
    if( colour.r === 0 && colour.g === 0 && colour.b === 0) {
      errorcount++;
      if(errorcount > ERRORS_THRESHOLD){
      showerror();
      errorcount=0;}
    } else {
      cx.beginPath();
      if (oldx > 0 && oldy > 0) {
        cx.moveTo(oldx, oldy);
      }
      cx.lineTo(rx, ry);
      cx.stroke();
      cx.closePath();
      oldx = rx;
      oldy = ry;
    }
  }

  function pixelcolour(x, y) {
    var index = ((y * (pixels.width * 4)) + (x * 4));
    return {
      r:pixels.data[index],
      g:pixels.data[index + 1],
      b:pixels.data[index + 2],
      a:pixels.data[index + 3]
    };
  }
var PAINT_THRESHOLD = 0.45;
  function pixelthreshold() {
    if (state !== 'error') {
      if (getpixelamount(
        paintcolour[0],
        paintcolour[1],
        paintcolour[2]
      ) / letterpixels > PAINT_THRESHOLD) {
        // getSpeech(letter);
      speak(letter);
       setstate('win');
if (sound){
  if (PaintLevel === 5 ){
     new Audio('/assets/applause.mp3').play();
  }
     else { 
         winsound.play();
       }
}

    
        UpdatePaintLevel();
      }

    }
  }


  function install() {
    if (navigator.mozApps) {
      var checkIfInstalled = navigator.mozApps.getSelf();
      checkIfInstalled.onsuccess = function () {
        if (checkIfInstalled.result) {
          installbutton.style.display = "none";
        } else {
          manifestURL = location.href.substring(0, location.href.lastIndexOf("/")) + "/manifest.webapp";
          var installApp = navigator.mozApps.install(manifestURL);
          installApp.onsuccess = function(data) {
            installbutton.style.display = "none";
          };
          installApp.onerror = function() {
            alert("Install failed\n\n:" + installApp.error.name);
          };
        }
      };
    }
  }

  /* Mouse event listeners */

  function onmouseup(ev) {
    ev.preventDefault();
    oldx = 0;
    oldy = 0;
    mousedown = false;
    pixelthreshold();
  }
  function onmousedown(ev) {
    ev.preventDefault();
    mousedown = true;
  }
  function onmousemove(ev) {
    ev.preventDefault();
    if (mousedown) {
      paint(ev.clientX, ev.clientY);
      ev.preventDefault();
    }
  }

  /* Touch event listeners */

  function ontouchstart(ev) {
    touched = true;
  }
  function ontouchend(ev) {
    touched = false;
    oldx = 0;
    oldy = 0;
    pixelthreshold();
  }
  function ontouchmove(ev) {
    if (touched) {
      paint(
        ev.changedTouches[0].pageX,
        ev.changedTouches[0].pageY
      );
      ev.preventDefault();
    }
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

  /* Button event handlers */

  errorbutton.addEventListener('click', retry, false);
  infobutton.addEventListener('click', showinfo, false);
  installbutton.addEventListener('click', install, false);
  reloadbutton.addEventListener('click', cancel, false);
  soundbutton.addEventListener('click', togglesound, false);
  winbutton.addEventListener('click', winner, false);
  startbutton.addEventListener('click', start, false);

  /* Canvas event handlers */

  c.addEventListener('mouseup', onmouseup, false);
  c.addEventListener('mousedown', onmousedown, false);
  c.addEventListener('mousemove', onmousemove, false);
  c.addEventListener('touchstart', ontouchstart, false);
  c.addEventListener('touchend', ontouchend, false);
  c.addEventListener('touchmove', ontouchmove, false);

  window.addEventListener('load',init, false);
  window.addEventListener('resize',init, false);

  /* Cache update ready? Reload the page! */
  var cache = window.applicationCache;
  function refresh() {
    if (cache.status === cache.UPDATEREADY) {
     cache.swapCache();
     window.location.reload();
    }
  }
  cache.addEventListener('updateready', refresh, false);

})();