$(document).ready(main);

var numCorrectas=0;
var numIncorrectas=0;
function main(){
  	establecerPropiedades();
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


