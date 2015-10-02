//this game will have only 1 state
var word = "خيار";
var preschoolerletter = $('.temp_information').data('temp'); 
//alert(preschoolerletter);
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
var GameState = {
  //initiate game settings
  init: function() {
    //scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //have the game centered horizontally
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    
  },

  //load the game assets before the game starts
  preload: function() {    
    this.load.image('background', '/assets/imagesphaser/p'+preschoolerletter+'/paper3.jpg');
    this.load.image('arrow', '/assets/imagesphaser/p'+preschoolerletter+'/arrow.png');
    this.load.spritesheet('chicken', '/assets/imagesphaser/p'+preschoolerletter+'/chicken_spritesheet.png', 131, 200, 3);
    this.load.spritesheet('horse', '/assets/imagesphaser/p'+preschoolerletter+'/horse_spritesheet.png', 212, 200, 3);
    this.load.spritesheet('pig', '/assets/imagesphaser/p'+preschoolerletter+'/pig_spritesheet.png', 297, 200, 3);
    this.load.spritesheet('sheep', '/assets/imagesphaser/p'+preschoolerletter+'/sheep_spritesheet.png', 244, 200, 3);
    this.load.audio('chickenSound', ['/assets/audiophaser/chicken.ogg', '/assets/audiophaser/assets/audio/chicken.mp3']);
    this.load.audio('horseSound', ['/assets/audiophaser/horse.ogg', '/assets/audiophaser/assets/audio/horse.mp3']);
    this.load.audio('pigSound', ['/assets/audiophaser/pig.ogg', '/assets/audiophaser/assets/audio/pig.mp3']);
    this.load.audio('sheepSound', ['/assets/audiophaser/sheep.ogg', '/assets/audiophaser/assets/audio/sheep.mp3']);
  },

  //executed once after everything is loaded
  create: function() {
    //create a sprite for the background
    this.background = this.game.add.sprite(0, 0, 'background');
    
    //group for animals
    var animalData = [
      {key: 'chicken', text: 'دجاجة', audio: 'chickenSound'},
      {key: 'horse', text: 'حصان', audio: 'horseSound'},
      {key: 'pig', text: 'خنزير', audio: 'pigSound'},
      {key: 'sheep', text: 'خروف', audio: 'sheepSound'}
    ];

    //create a group to store all animals
    this.animals = this.game.add.group();
    
    var self = this;    
    var animal;
    animalData.forEach(function(element){
      //create each animal and save it's properties
      animal = self.animals.create(-1000, self.game.world.centerY, element.key, 0);
      //this.horse = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'horse');
     
      //I'm saving everything that's not Phaser-related in an object
      animal.customParams = {text: element.text, sound: self.game.add.audio(element.audio)};

      //anchor point set to the center of the sprite
      //animal.anchor.setTo(0.5);
      animal.scale.setTo(0.6,0.6);
      animal.anchor.setTo(0.5, 0.2);
       //this.horse.scale.setTo(1,1);


      //create animal animation
      animal.animations.add('animate', [0, 1, 2, 1, 0, 1], 3, false);

      //enable input so we can touch it
      animal.inputEnabled = true;
      animal.input.pixelPerfectClick = true;
      animal.events.onInputDown.add(self.animateAnimal, this);
    });

    //place first animal in the middle
    this.currentAnimal = this.animals.next();
    this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);
    this.showText(this.currentAnimal);
    
    //left arrow
    this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
    this.leftArrow.anchor.setTo(0.5);
    this.leftArrow.scale.x = -0.5;
    this.leftArrow.scale.y = 0.5;
    this.leftArrow.customParams = {direction: -1};

    //left arrow user input
    this.leftArrow.inputEnabled = true;

    this.leftArrow.input.pixelPerfectClick = true;
    this.leftArrow.events.onInputDown.add(this.switchAnimal, this);

    //right arrow
    this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
    this.rightArrow.anchor.setTo(0.5);
    this.rightArrow.scale.x = 0.5;
    this.rightArrow.scale.y = 0.5;
    this.rightArrow.customParams = {direction: 1};

    //right arrow user input
    this.rightArrow.inputEnabled = true;
    this.rightArrow.input.pixelPerfectClick = true;
    this.rightArrow.events.onInputDown.add(this.switchAnimal, this); 

   


    
  },

  //this is executed multiple times per second
  update: function() {    
  },


  
  //play animal animation and sound
  animateAnimal: function(sprite, event) {
    sprite.play('animate');
    sprite.customParams.sound.play();
   // getSpeech(sprite.customParams.text);
   speak(sprite.customParams.text);

  },
  
  //switch animal
  switchAnimal: function(sprite, event) {

    //if an animation is taking place don't do anything
    if(this.isMoving) {
      return false;
    }

    this.isMoving = true;

    //hide text
    this.animalText.visible = false;

    var newAnimal, endX;
    //according to the arrow they pressed, which animal comes in
    if(sprite.customParams.direction > 0) {
      newAnimal = this.animals.next();
      newAnimal.x = -newAnimal.width/2;
      endX = 640 + this.currentAnimal.width/2;
    }
    else {
      newAnimal = this.animals.previous();
      newAnimal.x = 640 + newAnimal.width/2;
      endX = -this.currentAnimal.width/2;
    }

    //tween animations, moving on x
    var newAnimalMovement = game.add.tween(newAnimal);
    newAnimalMovement.to({ x: this.game.world.centerX }, 1000);
    newAnimalMovement.onComplete.add(function()
      {
        this.isMoving = false;

        //show text
        this.showText(newAnimal);
      }, this);
    newAnimalMovement.start();

    var currentAnimalMovement = game.add.tween(this.currentAnimal);
    currentAnimalMovement.to({ x: endX }, 1000);
    currentAnimalMovement.start();

    this.currentAnimal = newAnimal;
  },
  showText: function(animal) {
    //create the text object if it doesn't exist
    if(!this.animalText) {
      var style = {font: "bold 30pt Arial", fill: "#D0171B", align: "center"};
      this.animalText = this.game.add.text(this.game.width/2, this.game.height * 0.85, 'asdfasfd' , style);
      this.animalText.anchor.setTo(0.5);
    }

    this.animalText.setText(animal.customParams.text);
    this.animalText.visible = true;
  }
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

//initiate the Phaser framework
var game = new Phaser.Game(640, 360, Phaser.AUTO);

//add the state to the game object
game.state.add('GameState', GameState);

//launch the state
game.state.start('GameState');