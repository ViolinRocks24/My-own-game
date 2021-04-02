var PLAY = 1;
var END = 0;
var gameState = PLAY;

var playerCar, playerCarImg;
var obstaclesGroup;
var obstacleCar1Img, obstacleCar2Img, obstacleCar3Img, obstacle4Img;

var reward1Img, reward2Img, reward1Group, reward2Group;

var score;

var streetImg;

var reward1, reward2;

var obstacle1, obstacle2, obstacle3, obstacle4;

function preload() {
    playerCarImg = loadImage("sprites/playerCar.png");

    obstacleCar1Img = loadImage("sprites/obstacleCar1.png");
    obstacleCar2Img = loadImage("sprites/obstacleCar2.png");
    obstacleCar3Img = loadImage("sprites/obstacleCar3.png");
    obstacle4Img = loadImage("sprites/obstacle4.png");

    reward1Img = loadImage("sprites/reward1.png");
    reward2Img = loadImage("sprites/reward2.png");

    streetImg = loadImage("sprites/street.png");

    score = 0;
}
function setup() {
    createCanvas(displayWidth, displayHeight);
    

    playerCar = createSprite(displayWidth/2, displayHeight/2, 50, 50);
    playerCar.addImage(playerCarImg);
    playerCar.scale = 0.5;

    playerCar.setCollider("rectangle", 0, 0, 250, 550)

    obstacle1Group = new Group();
    obstacle2Group = new Group();
    obstacle3Group = new Group();
    reward1Group = new Group();
    reward2Group = new Group();
    speedBreakerGroup = new Group();
}
function draw() {
  background(streetImg);

  textSize(20);
  text("Score: " + score, 50, 50);

  if(gameState === PLAY) {
    if(keyDown(RIGHT_ARROW)) {
      playerCar.x = playerCar.x + 10; 
    }
  
    if(keyDown(LEFT_ARROW)) {
      playerCar.x = playerCar.x - 10;
    }

    if(reward1Group.isTouching(playerCar)) {
      reward1Group.destroyEach();
      score = score + 1;
    }
  
    if(reward2Group.isTouching(playerCar)) {
      reward2Group.destroyEach();
      score = score + 5;
    }

    textSize(20);
    text("Score: " + score, 50, 50);

    spawnObstacles1();
    spawnObstacles2();
    spawnObstacles3();
    spawnReward1();
    spawnReward2();
    speedBreaker();

    if(obstacle1Group.isTouching(playerCar) || obstacle2Group.isTouching(playerCar) || obstacle3Group.isTouching(playerCar) || speedBreakerGroup.isTouching(playerCar)) {
      gameState  = END;
  
    }
  }
  else if(gameState === END) {


    obstacle1Group.setVelocityYEach(0);
    obstacle2Group.setVelocityYEach(0);
    obstacle3Group.setVelocityYEach(0);
    speedBreakerGroup.setVelocityYEach(0);
    reward1Group.setVelocityYEach(0);
    reward2Group.setVelocityYEach(0);

    obstacle1Group.setLifetimeEach(-1);
    obstacle2Group.setLifetimeEach(-1);
    obstacle3Group.setLifetimeEach(-1);
    speedBreakerGroup.setLifetimeEach(-1);
    reward1Group.setLifetimeEach(-1);
    reward2Group.setLifetimeEach(-1);

    if(keyDown("r")) {
      reset();
    }
  }
  

   
    drawSprites();
}

function reset() {
  gameState = PLAY;
  score = 0;

  obstacle1Group.destroyEach();
  obstacle2Group.destroyEach();
  obstacle3Group.destroyEach();
  speedBreakerGroup.destroyEach();
  reward1Group.destroyEach();
  reward2Group.destroyEach();
}

function spawnObstacles1() {
  if(frameCount % 90 === 0) {
    obstacle1 = createSprite(0,1000);
    obstacle1.addImage(obstacleCar1Img);
    obstacle1.velocityY = -15;

    obstacle1.x = Math.round(random(200, 1500));

    obstacle1.scale = 0.5;
    obstacle1.lifetime = 600;

    obstacle1Group.add(obstacle1);

    obstacle1.setCollider("rectangle", 0, 0, 250, 600);
  }
}

function spawnObstacles2() {
  if(frameCount % 160 === 0) {
    obstacle2 = createSprite(0,1000);
    obstacle2.addImage(obstacleCar2Img);
    obstacle2.velocityY = -15;

    obstacle2.x = Math.round(random(200, 1500));

    obstacle2.scale = 0.5;
    obstacle2.lifetime = 600;

    obstacle2Group.add(obstacle2);
    obstacle2.setCollider("rectangle", 0, 0, 250, 600);
  }
}

function spawnObstacles3() {
  if(frameCount % 200 === 0) {
    obstacle3 = createSprite(0,1000);
    obstacle3.addImage(obstacleCar3Img);
    obstacle3.velocityY = -15;

    obstacle3.x = Math.round(random(200, 1500));

    obstacle3.scale = 0.5;
    obstacle3.lifetime = 600;

    obstacle3Group.add(obstacle3);

    obstacle3.setCollider("rectangle", 0, 0, 250, 600);
  }


}

function speedBreaker() {
  if(frameCount % 150 === 0) {
    obstacle4 = createSprite(100, 100);
    obstacle4.addImage(obstacle4Img);
    obstacle4.velocityY = 5;

    obstacle4.x = Math.round(random(200, 1500));

    obstacle4.scale = 0.5;
    obstacle4.lifetime = 600;

    speedBreakerGroup.add(obstacle4);

    obstacle4.setCollider("rectangle", 0, 0, 550, 150);
  }
}

function spawnReward1() {
  if(frameCount % 80 === 0) {
    reward1 = createSprite(300, -15);
    reward1.addImage(reward1Img);
    reward1.velocityY = 5;

    reward1.x = Math.round(random(200, 1500));

    reward1.scale = 0.2;
    reward1.lifetime = 600;

    reward1Group.add(reward1);
  }
}

function spawnReward2() {
  if(frameCount % 350 === 0) {
    reward2 = createSprite(400,-15);
    reward2.addImage(reward2Img);
    reward2.velocityY = 5;

    reward2.x = Math.round(random(300, 1500));

    reward2.scale = 0.2;
    reward2.lifetime = 600;

    reward2Group.add(reward2);

    
  }
}
