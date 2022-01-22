var turtle, turtleImage;
var sea, seaImage;


var obstaclesGroup, shark, jellyfish, anglerFish;

var gameOver, gameOverImage;

var gameState ="play";

function preload(){
    seaImage = loadImage("sea.jpg");
    turtleImage = loadImage("turtle.png");
    

    sharkImage = loadImage("shark.png");
    jellyfishImage = loadImage("jellyfish.png");
    anglerFishImage = loadImage("anglerFish.png");

    gameOverImage = loadImage("gameOver.png");
}

function setup() {
 createCanvas(900, 600)

 

 sea = createSprite(450,300);
  sea.addImage("sea",seaImage);
  sea.x = sea.width /2;
 sea.scale = 3.3

 turtle = createSprite(50,160,20,50);
 turtle.addImage("turtle",turtleImage)
 turtle.scale = 0.3

 gameOver = createSprite(300,100);
 gameOver.addImage(gameOverImage);
 gameOver.scale = 0.5;

 obstaclesGroup = createGroup();
 

}

function draw() {
 background(180)


 if(gameState === "play"){

    gameOver.visible = false;
   
    
    
    
    
    
    sea.velocityX = -6
    
    if (sea.x < 0){
      sea.x = sea.width/2;
    
    }
    
    
    if(keyDown(UP_ARROW)) {
        turtle.velocityY = -12;
        
    }
    if(keyDown(DOWN_ARROW)) {
        turtle.velocityY = 12;
        
    }

  
    turtle.velocityY = turtle.velocityY + 0.8
  
   
  
    
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(turtle)){
       gameState = "end";
    }
  }
   else if (gameState === "end") {
      gameOver.visible = true;
      sea.velocityX = 0;
      turtle.velocityY = 0
      
     
      
    obstaclesGroup.setLifetimeEach(-1);
     obstaclesGroup.setVelocityXEach(0);
    
     
   }
  
  
  if(mousePressedOver(gameOver)) {
      reset();
    }

 drawSprites()

}
function reset(){
    gameState="play"
    obstaclesGroup.destroyEach()
    
   
   }
   function spawnObstacles(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(600,Math.round(random(50, 550)),10,40);
      obstacle.velocityX = -6
      
       //generate random obstacles
       var rand = Math.round(random(1,3));
       switch(rand) {
         case 1: obstacle.addImage(sharkImage);
                 break;
         case 2: obstacle.addImage(jellyfishImage);
                 break;
         case 3: obstacle.addImage(anglerFishImage);
                 break;
         default: break; 
       }
    
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
      }
}