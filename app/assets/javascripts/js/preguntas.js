$(document).ready(main);
//var dragletter = $('.temp_information').data('temp');
var numCorrectas=0;
var numIncorrectas=0;
    var dragstage=1;
function main(){
    //var dragletter = $('.temp_information').data('temp'); 
    //alert("babooo "+dragletter);
    var dragletter=2;

    establecerPropiedades();
if (dragstage === 1){ 
   document.getElementById("img3").src= "/assets/img/level1/d"+dragletter+"/1.jpg" ;
   document.getElementById("img4").src= "/assets/img/level1/d"+dragletter+"/2.jpg" ;
   document.getElementById("img5").src= "/assets/img/level1/d"+dragletter+"/3.jpg" ;}

   if (dragstage === 3 || dragstage === 5 ){
   document.getElementById("img3").src= "/assets/img/level1/d"+dragletter+"/1p.jpg" ;
   document.getElementById("img4").src= "/assets/img/level1/d"+dragletter+"/2p.jpg" ;
   document.getElementById("img5").src= "/assets/img/level1/d"+dragletter+"/3p.jpg" ;
}
    if (dragstage === 2 || dragstage === 4 ){
   document.getElementById("img3").src= "/assets/img/level1/d"+dragletter+"/1w.jpg" ;
   document.getElementById("img4").src= "/assets/img/level1/d"+dragletter+"/2w.jpg" ;
   document.getElementById("img5").src= "/assets/img/level1/d"+dragletter+"/3w.jpg" ;}

   if (dragstage === 1){
   document.getElementById("opc1").src= "/assets/img/level1/d"+dragletter+"/opac1.png" ;
   document.getElementById("opc2").src= "/assets/img/level1/d"+dragletter+"/opac2.png" ;
   document.getElementById("opc3").src= "/assets/img/level1/d"+dragletter+"/opac3.png" ;
 }


if(dragstage ===2 || dragstage ===3){

   document.getElementById("opc1").src= "/assets/img/level1/d"+dragletter+"/opac1w.png" ;
   document.getElementById("opc2").src= "/assets/img/level1/d"+dragletter+"/opac2w.png" ;
   document.getElementById("opc3").src= "/assets/img/level1/d"+dragletter+"/opac3w.png" ;}


if(dragstage ===4 || dragstage ===5){
   document.getElementById("opc1").src= "/assets/img/level1/d"+dragletter+"/opac1d.png" ;
   document.getElementById("opc2").src= "/assets/img/level1/d"+dragletter+"/opac2d.png" ;
   document.getElementById("opc3").src= "/assets/img/level1/d"+dragletter+"/opac3d.png" ;}


    //$('#listen2').css('display', 'inline-block').click(listen);

    var bod=$("body").css("background-image","url('/assets/img/paper.jpg')");
    //var imoo = $("preguntas");
        bod.css("background-repeat","no-repeat");
    bod.css("background-position","center");
}

function establecerPropiedades(){
    var res =$(".respuesta");
    res.draggable();
    res.mousedown(downRespuesta);
    $(".preg, .pregMonumento").droppable({drop:dropPregunta});
    

}


function listen(word){
      textq=word;
     //getSpeech(textq);
     speak(textq);
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

function dropPregunta(event,ui){
    var contPregunta =$(this);
    var respuesta = ui.draggable;

    var correcta = contPregunta.text().toLowerCase();
    correcta = correcta.trim();
    var pos = contPregunta.position();
    contPregunta.css("background","#BBB");
    contPregunta.css("box-shadow",".2px .2px .2em #000");
    contPregunta.css("border","1px dashed #333")
    respuesta.css("cursor","default");

    if(correcta==respuesta.attr("alt")){
        contPregunta.children("img").remove();
        contPregunta.addClass("resCorrecta");
        contPregunta.append("<img src='/assets/img/correcta.png' class='ok' />" +"<img src='"+respuesta.attr("src")+"' class='rDrop' />" );
        numCorrectas++;
    respuesta.draggable("destroy");
    contPregunta.droppable("destroy");
    comprobarFinal();
    comprobarResultados();
    respuesta.remove();
      new Audio('/assets/applause.mp3').play();

    }else{
        
        numIncorrectas++;
        contPregunta.addClass("resIncorrecta");
        contPregunta.append("<img src='/assets/img/incorrecta.png' class='inco' />"+"<img src='"+respuesta.attr("src")+" ' class='rDrop'/>");
        contPregunta.children("img").remove();
        contPregunta.append("<img src='/assets/img/incorrecta.png' class='inco' />");

    comprobarFinal();
    comprobarResultados();
      new Audio('/assets/boing.wav').play();

    }
    
}

function comprobarResultados(){
    $(".ok,.inco").fadeIn("slow");
    $("#resultados").html("Correct answers:     "+numCorrectas+"<br />"+"Incorrect answers:    "+numIncorrectas);

}

function comprobarFinal(){
    resul = numCorrectas+numIncorrectas;
    if(resul ==12){
        
        comprobarResultados();
    }
}

function downRespuesta(){
    $(".respuesta").css("z-index","0");
    $(this).css("z-index","100");
}

function changeDragStage(n){
  dragstage = n;

}


$(document).ready(function() {
    $('#level1').click(function() {
    changeDragStage(1);
    alert(dragstage);
  });
    $('#level2').click(function() {
    changeDragStage(2);
  });
    $('#level3').click(function() {
    changeDragStage(3);
  });
    $('#level4').click(function() {
    changeDragStage(4);
  });
    $('#level5').click(function() {
    changeDragStage(5);
  });
});


