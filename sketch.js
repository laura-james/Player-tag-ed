let tagger;

let player1, player2, platforms;

let player1jumps, player2jumps;

let gametimer, player1timer, player2timer, cooldown;

let p1state, runloop, p2state, runloop2;

let zoomstate;

let jumpsfx, playedgo, playedsong;

let slowed;

function preload(){
  go = loadSound("assets/321.mp3")
  jumpsfx = loadSound("assets/jump.mp3")
  impact = loadSound("assets/impact-6291.mp3")
  bgsound = loadSound("assets/bg.mp3")
  bg = loadImage("assets/bg.jpg")
}


function botJump() {
  p2state = 'fall'
  if (cooldown == 0) {
    player2jumps -= 1;
    player2.vel.y = -5;
    cooldown = 15;
  }
}

function setup() {

  slowed = 0;

  playedgo = 0
  playedsong = 0
  
  camera.zoom = 1;
  
    let canvas = {
    w: windowWidth,
    h: windowHeight,
    hw: windowWidth / 2,
    hh: windowHeight / 2
  };
  
  createCanvas(canvas.w, canvas.h);
  p1state = 'fall';
  p2state = 'fall'
  runloop = 4;
  runloop2 = 4;
  cooldown = 0;
  gametimer = 63;
  player1timer = 0;
  player2timer = 0;
  platforms = new Group();
  platforms.color = 'white';
  tagger = Math.floor(random(1.5, 2.5));
  console.log(tagger);
  world.gravity.y = 8;
  while (platforms.length <= 9) {
    let platform = new platforms.Sprite();
  }

  //creating stage
  platforms[0].x = canvas.hw
  platforms[0].y = 0
  platforms[0].w = canvas.w
  platforms[0].h = 10

  platforms[1].x = canvas.hw
  platforms[1].y = canvas.h
  platforms[1].w = canvas.w
  platforms[1].h = 10

  platforms[2].x = 0
  platforms[2].y = canvas.hh
  platforms[2].w = 10
  platforms[2].h = canvas.h

  platforms[3].x = canvas.w
  platforms[3].y = canvas.hh
  platforms[3].w = 10
  platforms[3].h = canvas.h

  platforms[4].x = canvas.hw / 2
  platforms[4].y = canvas.hh + canvas.hh / 2
  platforms[4].w = canvas.w / 16
  platforms[4].h = canvas.h / 4
  platforms[4].rotation = -45

  platforms[5].x = canvas.hw / 2 + canvas.hw
  platforms[5].y = canvas.hh + canvas.hh / 2
  platforms[5].w = canvas.w / 16
  platforms[5].h = canvas.h / 4
  platforms[5].rotation = 45

  platforms[6].x = canvas.hw / 2
  platforms[6].y = canvas.hh / 2
  platforms[6].w = canvas.w / 16
  platforms[6].h = canvas.h / 4
  platforms[6].rotation = 45

  platforms[7].x = canvas.hw / 2 + canvas.hw
  platforms[7].y = canvas.hh / 2
  platforms[7].w = canvas.w / 16
  platforms[7].h = canvas.h / 4
  platforms[7].rotation = -45

  platforms[8].x = canvas.hw
  platforms[8].y = canvas.hh + canvas.hh / 4
  platforms[8].w = canvas.w / 4
  platforms[8].h = canvas.h / 16
  platforms[8].rotationSpeed = 10

  platforms[9].x = canvas.hw
  platforms[9].y = canvas.hh - canvas.hh / 4
  platforms[9].w = canvas.w / 4
  platforms[9].h = canvas.h / 16
  
  platforms.collider = 'static'

  platforms[8].collider = 'kinetic'
  platforms[8].rotationSpeed = 1
  platforms[9].collider = 'kinetic'
  platforms[9].rotationSpeed = 1
  //
  
  player1 = createSprite(canvas.hw / 2, canvas.hh, canvas.w / 32);
  player1.collider = 'none'
  player1.addCollider(0,0,25)
  player1.rotationLock = true
  player1.friction = 0

  player2 = createSprite(canvas.hw + canvas.hw / 2, canvas.hh, canvas.w / 32);
  player2.collider = 'none'
  player2.addCollider(0,0,25)
  player2.rotationLock = true
  player2.friction = 0

  centre = createSprite(canvas.hw, canvas.hh, 0);
  centre.collider = 'none'
  centre.w = 0
  centre.h = 0

  taggertext = createSprite(canvas.hw, canvas.hh - canvas.hh / 2, 0, 0)
  taggertext.collider = 'none'

  intro1 = createSprite(canvas.hw, canvas.h / 3, 0);
  intro1.collider = 'none'
  intro1.w = 0
  intro1.h = 0
  intro1.text = 'Use WASD to move. This game is intended for editor view.'

  intro2 = createSprite(canvas.hw, canvas.h / 3 + 20, 0);
  intro2.collider = 'none'
  intro2.w = 0
  intro2.h = 0
  intro2.text = ' Slo-mo and full screen might be buggy. Good luck! :)'
  
  // might be buggy in full screen :)'
} //end of setup

function draw(){
  if (playedgo == 0){
    playedgo = 1
    go.play()
  }
  
  if (p1state == 'wall'){
    player1.img = 'assets/Wall Slide.svg'
  }
  else if (p1state == 'fall'){
    player1.img = 'assets/Fall3.svg'
  }
  else if (p1state == 'run'){
   player1.img = 'assets/Walk ' + Math.floor(runloop) + '.svg'
  }
  else if (p1state == 'idle'){
    player1.img = 'assets/Stand3.svg'
  }


  
  if (p2state == 'wall'){
    player2.img = 'assets/Wall Slidebot.svg'
  }
  else if (p2state == 'fall'){
    player2.img = 'assets/Fall3bot.svg'
  }
  else if (p2state == 'run'){
   player2.img = 'assets/Walk ' + Math.floor(runloop2) + 'bot.svg'
  }
  else if (p2state == 'idle'){
    player2.img = 'assets/Stand3bot.svg'
  }
  
  if (cooldown > 0){
    cooldown -=  1
  }
  background(bg)
  
  if (gametimer > 60){
    world.timeScale = 0
    camera.zoomTo(1.8)
  }
  else if (player1.x - player2.x < 50 && player1.x - player2.x > -50 && player1.y - player2.y < 50 && player1.y - player2.y > -50){
    if (slowed == 0){
      slowed = 1;
      impact.play();
    }
    world.timeScale = 0.2;
    camera.moveTo(player1, 10)
    camera.zoomTo(1.1, 0.03);
    
  }
  else{
    if (playedsong == 0){
      playedsong = 1
      bgsound.play()
    }
    
    world.timeScale = 1;
    camera.zoomTo(0.8, 0.03);
    camera.moveTo(centre, 10)
    intro1.y -= 20
    intro2.y -= 20
    slowed = 0;
  }

  //timers
  if (frameCount % 60 == 0 && gametimer > 0) {
    gametimer--;
  }

  textSize(30)
  if (gametimer <= 0) {
    text("GAME OVER, PRESS CTRL + R TO RESTART", width/2, height * 0.3);
    textSize(100)
    if (player1timer > player2timer){
      text("BOT WINS!", width/2, height * 0.7);
    }

    else if (player2timer > player1timer){
      text("PLAYER WINS!", width/2, height * 0.7);
    }

    player1.remove()
    player2.remove()
    platforms.remove()
    //ends game
    
  }
  
  textAlign(CENTER, CENTER);
  textSize(100);
  if (gametimer < 60){
  text(gametimer, canvas.hw, canvas.hh);
  }
  else{
    text(gametimer - 60, width/2, height/2);
  }
  textSize(50);
  text(player1timer, width / 2 - 50, height / 32)

  textSize(50);
  text(player2timer, width / 2 + 50, height / 32)

  if (frameCount % 60 == 0 && gametimer > 0 && tagger == 1 && gametimer <= 60) {
    player1timer++;
  }

  if (frameCount % 60 == 0 && gametimer > 0 && tagger == 2 && gametimer <= 60) {
    player2timer++;
  }
  //timers


  
  if (player1.colliding(platforms)){
    player1jumps = 2
  }//resets jumps

  if (player2.colliding(platforms)){
    player2jumps = 4
  }//resets jumps
  
  if (tagger == 1){
    taggertext.text = 'You are the tagger!'
  }

  if (tagger == 2){
    taggertext.text = 'Bot is the tagger!'
  }

  
  if (player1.colliding(player2) || player2.colliding(player1)){
    if (tagger == 1){
      tagger = 2
    }
    else if (tagger == 2){
      tagger = 1
    }//checks who's tagger
    
    player1.x = canvas.hw / 2
    player1.y = canvas.hh
    player2.x = canvas.hw + canvas.hw / 2
    player2.y = canvas.hh
  }
  if (kb.pressing('D')) {
    player1.mirror.x = false;

    p1state = 'run'
    if (runloop < 6){
      runloop += 0.1
    }
    else {
      runloop = 4
    }
    
    if (tagger == 1) {
      player1.vel.x = 6;
    }
    else if (tagger == 2) {
      player1.vel.x = 5;
    }
  }
  else if (kb.pressing('A')){
    player1.mirror.x = true;

    p1state = 'run'
    if (runloop < 6){
      runloop += 0.1
    }
    else {
      runloop = 4
    }

    
    if (tagger == 1) {
      player1.vel.x = -6;
    }
    else if (tagger == 2) {
      player1.vel.x = -5;
    }//checks who's tagger
    
  }
  else{
    player1.vel.x = 0;
  }
  if (kb.presses('W') && player1jumps > 0){
    player1jumps -= 1
    player1.vel.y = -5;
    jumpsfx.play();
  }
  if (kb.presses('S') && !player1.colliding(platforms)){
    player1.vel.y = 8;
  }

  
  if (player1.x > player2.x) {
    
    if (tagger == 1) {
      player2.mirror.x = true
      player2.vel.x = -5;
      if (player1.x == player2.x){
        player2.mirror.x = false
        player2.vel.x = 5
      }
      p2state = 'run'
      if (runloop2 < 6){
        runloop2 += 0.1
      }
      else {
        runloop2 = 4
      }
    }
    else if (tagger == 2) {
      player2.mirror.x = false
      player2.vel.x = 6;
    }//checks who's tagger
    
  }
  else if (player2.x > player1.x){
    p2state = 'run'
    if (runloop2 < 6){
      runloop2 += 0.1
    }
    else {
      runloop2 = 4
    }
    if (tagger == 1) {
      player2.mirror.x = false
      player2.vel.x = 5;
      if (player1.x == player2.x){
        player2.vel.x = 5
      }
    }
    else if (tagger == 2) {
      player2.mirror.x = true
      player2.vel.x = -6;
    }
  }

  else if (player1.x == player2.x){
    if (player1.y < player2.y){
      player2.vel.y = -5
    }
    else if (player2.y > player1.y){
      player2.vel.y = 8
    }
  }
    
  else{
    player2.vel.x = 0;
  }
  
  if (player1.y < player2.y && player2jumps >= 1){
    botJump()
  }
  
  if (player1.y > player2.y && !player2.colliding(platforms) && tagger == 2){
    player2.vel.y = 8;
  }
   else if (player1.y < player2.y && !player2.colliding(platforms) && tagger == 1){
    player2.vel.y = 8;
  }

  if (tagger == 1 && player2.y < player1.y && !player2.colliding(platforms) || player1.y == player2.y && tagger == 1 && !player2.colliding(platforms)){
    player2.vel.y = 8;
  }
  if (player2.colliding(platforms[2]) || player2.colliding(platforms[3])){
    p2state = 'wall'
  }

  
  if (player1.colliding(platforms[2]) || player1.colliding(platforms[3])){
    p1state = 'wall'
  }
  else if (!player1.colliding(platforms)){
    p1state = 'fall'
  } 
  else if (kb.pressing('D') || kb.pressing('A')) {
    p1state = 'run'
  }
  else {
    p1state = 'idle'
  }
}//end of game loop