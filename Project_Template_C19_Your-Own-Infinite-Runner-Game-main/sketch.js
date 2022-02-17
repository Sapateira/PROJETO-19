var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gatinho, gatinho_Img;
var chao, InvisbleGround, chao_Img;
var gameOver, restart, game_overImg, restartImg;
var obstaculos_Group, obstaculo_1, obstaculo_2;
var score;

function preload(){

  gatinho = loadImage("Gatinho.png");

  obstaculo_1 = loadImage("obstáculo.png");
  obstaculo_2 = loadImage("obstáculo_2.png");

  chao_Img = loadImage("chao.png");
  game_overImg = loadImage("Game_Over.png");
  restartImg = loadImage("Restart.png");
}

function setup() {
  createCanvas(600, 200);

  gatinho = createSprite(50,160,20,50);
  gatinho.addImage("Gatinho", gatinho_Img);

  gatinho.scale = 0.5;

  chao = createSprite(200,180,400,20);
  chao.addImage("chao", chao_Img);
  chao.x = chao.width /2;

  gameOver = createSprite(300,100);
  gameOver.addImage(game_overImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //criar Grupos de Obstáculos e Nuvens
  obstaculos_Group = createGroup();

  gatinho.setCollider("rectangle",0,0,gatinho.width,gatinho.height);
  //gatinho.debug = true
  
  score = 0;
  

}

function draw() {
   background(180);

  //exibir pontuação
  text("Pontuação: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    chao.velocityX = -(4 + 3* score/100)
    //pontuação
    score = score + Math.round(getFrameRate()/60);
    
    if (chao.x < 0){
      chao.x = chao.width/2;
    }
    
    //pular quando barra de espaço é pressionada
    if(keyDown("space")&& gatinho.y >= 160) {
        gatinho.velocityY = -12;
    }
    
    //adicionar gravidade
    gatinho.velocityY = gatinho.velocityY + 0.8
  
    //gerar obstáculos no chão
    spawnObstacles();
    
    if(obstaculos_Group.isTouching(gatinho)){
        //gatinho.velocityY = -12;
        gameState = END;
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
    
     
     
      chao.velocityX = 0;
      gatinho.velocityY = 0
      
     
      //definir tempo de vida dos objetos do jogo para que eles nunca sejam destruídos
     obstaculos_Group.setLifetimeEach(-1);
     
     obstaculos_Group.setVelocityXEach(0);    
   }
  
 
  //impedir que trex caia
  gatinho.collide(invisibleGround);
  
  if(mousePressedOver(restart)) {
      reset();
    }
  drawSprites();
}

function reset(){
  gameState = PLAY;

  obstaculos_Group.destroyEach();
  
  score = 0;
}

function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstaculo = createSprite(600,165,10,40);
    obstaculo.velocityX = -(6 + score/100);
    
     //gerar obstáculos aleatórios
     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1: obstacle.addImage(obstaculo_1);
               break;
       case 2: obstacle.addImage(obstaculo_2);
               break;
     }
    
     //atribuir dimensão e tempo de vida ao obstáculo           
     obstaculo.scale = 0.5;
     obstaculo.lifetime = 300;
    
    //acrescentar cada obstáculo ao grupo
     obstaculos_Group.add(obstaculo);
  }
 }