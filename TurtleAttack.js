let life = 3;
let ctx = document.getElementById('canvas');
let pincel = ctx.getContext('2d');
let bottlesSet = [];
let strawSet = [];
let tireSet = [];
let score = 0;
let trashBagSet = []
let lettuceSet = [];
let backgroundSound = new Audio("Soundtracks/editedSound.mp3");
backgroundSound.loop = true;
window.onload = function() {
    document.getElementById("start-button").onclick = function() { 
      ocean.clear();
      ocean.start();
      };
}

let ocean = {
  frames: 0,
  start: function() {
    this.interval = setInterval(updateGameArea, 20);
    this.points = 0;
    this.width = 800;
    this.height = 600;
    backgroundSound.play();
  },
  clearEnd: function() {
    clearInterval(this.interval);
    this.frames = 0;
    this.points = 0; 
    pincel.clearRect(0, 0, 800, 600);
    backgroundSound.pause();
  },
  clear: function() {
    pincel.clearRect(0, 0, this.width, this.height);
  },

  score: function() {
    pincel.font = "18px arial";
    pincel.fillStyle = "black";
    pincel.fillText("Score: " + score, 10, 20);
  },

  life: function() {
    pincel.font = "18px arial";
    pincel.fillStyle = "black";
    pincel.fillText("Life: " + life, 720, 20);  
  },

  stop: function () {
  clearInterval(this.interval);
  pincel.clearRect(0, 0, 800, 600);
  pincel.fillStyle = 'black';
  pincel.fillRect(0, 0, 800, 600);
  pincel.fill();
  pincel.fillStyle = 'red';
  pincel.fillText('Game Over!', 150, 100);
  pincel.fillStyle = 'white';
  pincel.fillText(`The ocean still polluted, but you avoid it to be worst; 
  your score ${score}`, 100, 150);
  }
}

class Player {
  constructor() {
    this.x = 350;
    this.y = 500;
    this.img = document.getElementById('turtle')
    this.width = 80;
    this.height = 100;
    this.speedX = 10;
  }
  drawTurtle() {
    pincel.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
const turtle = new Player();

class Bottle {
  constructor(x, y) {
    this.x = Math.floor(Math.random() * 580);
    this.y = 0; 
    this.img = document.getElementById('plasticBottle')
    this.width = 100;
    this.height = 80;
    this.speedY = 1;
  }
  draw() {
    
    pincel.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.update();
  }
  update() {
    this.y += this.speedY; 
  }
}

class Straw {
  constructor(x, y) {
    this.x = Math.floor(Math.random() * 580);
    this.y = 0; 
    this.img = document.getElementById('straw')
    this.width = 60;
    this.height = 40;
    this.speedY = 1;
  }
  draw() {
    pincel.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  update() {
    this.y += this.speedY; 
  }
}

class Trash {
  constructor(x, y) {
    this.x = Math.floor(Math.random() * 580);
    this.y = 0; 
    this.img = document.getElementById('trashBag')
    this.width = 60;
    this.height = 80;
    this.speedY = 1;
  }
  draw() {
    pincel.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  update() {
    this.y += this.speedY; 
  }
}


class Tire {
  constructor(x, y) {
    this.x = Math.floor(Math.random() * 580);
    this.y = 0; 
    this.img = document.getElementById('tire')
    this.width = 80;
    this.height = 80;
    this.speedY = 5;
  }
  draw() {
    pincel.drawImage(this.img, this.x, this.y, this.width, this.height)
  }

  update() {
    this.y += this.speedY; 
  }
}

class Lettuce {
  constructor(x, y) {
    this.x = Math.floor(Math.random() * 580);
    this.y = 0; 
    this.img = document.getElementById('lettuce')
    this.width = 80;
    this.height = 80;
    this.speedY = 5;
  }
  draw() {
    pincel.drawImage(this.img, this.x, this.y, this.width, this.height)
  }

  update() {
    this.y += this.speedY; 
  }
}


document.onkeydown = function(e) {
  if (e.keyCode >= 38 && e.keyCode <= 40)
    e.preventDefault()

  switch (e.keyCode) {
    case 38: // up arrow
    if(turtle.y >= 20) {
      turtle.y -= 20;
    };
    break;
    case 40: // down arrow
    if(turtle.y < 500) {
      turtle.y += 20;
    }  
    break;
    case 37: // left arrow
    if(turtle.x >= 15 && score > 200) {
      turtle.img = document.getElementById('blastoise2')
      turtle.x -= 20;
    } else if(turtle.x >= 15 && score > 100) {
      turtle.img = document.getElementById('wartotle')
      turtle.x -= 20;
    }  else if(turtle.x >= 15) {
      turtle.img = document.getElementById('turtle2')
      turtle.x -= 20;
    }  
    break;
    case 39: // right arrow
    if(turtle.x <= 700 && score > 200) {
      turtle.img = document.getElementById('blastoise')
      turtle.x += 20;  
    } else if(turtle.x <= 700 && score > 100) {
        turtle.img = document.getElementById('wartotle2')
        turtle.x += 20;
      } else if(turtle.x <= 700) {
      turtle.img = document.getElementById('turtle')
      turtle.x += 20;
      }
      break;
    }
};

document.onkeyup = function(e) {
  turtle.speedX = 0;
  turtle.speedY = 0;
}


const updateGameArea = () => {
  ocean.frames += 1;
  ocean.clear();
  updateBottle();
  updateStraw();
  updateTire();
  crashTirePoints();
  turtle.drawTurtle();
  crashBottlePoints();
  crashStrawPoints();
  ocean.score();
  ocean.life();
  updateTrashBag();
  crashBagPoints();
  updateLettuce();
  crashLettuce();
  checkGameOver();
}

function updateBottle() {
  if(ocean.frames % 100 === 0 && bottlesSet.length < 5) {
    const plasticBottle = new Bottle;
    bottlesSet.push(plasticBottle) 
  }
  if(bottlesSet.length > 0) {
    for (let i = 0; i < bottlesSet.length; i += 1) {
      bottlesSet[i].draw();
      bottlesSet[i].update();
    if(bottlesSet[i].y > 580){
          bottlesSet.shift();
          life -= 1;
    }
  }
  }
}

function updateStraw() {
  if(ocean.frames % 80 === 0 && strawSet.length < 3) {
    const straw = new Straw;
    strawSet.push(straw) 
  }
  if(strawSet.length > 0) {
    for (let i = 0; i < strawSet.length; i += 1) {
      strawSet[i].draw();
      strawSet[i].update();
    if(strawSet[i].y > 580){
          strawSet.shift();
          life -= 1;
    }
  }
  }
}

function updateTrashBag() {
  if(ocean.frames % 150 === 0 && trashBagSet.length < 3) {
    const trash = new Trash;
    trashBagSet.push(trash) 
  }
  if(trashBagSet.length > 0) {
    for (let i = 0; i < trashBagSet.length; i += 1) {
      trashBagSet[i].draw();
      trashBagSet[i].update();
    if(trashBagSet[i].y > 580){
          trashBagSet.shift();
          life -= 1;
    }
  }
  }
}

function updateTire() {
    if(ocean.frames % 1000 === 0 && tireSet.length < 2 && score > 2000) {
      const tire = new Tire;
      tireSet.push(tire) 
  }
  if(tireSet.length > 0) {
    for (let i = 0; i < tireSet.length; i += 1) {
      tireSet[i].draw();
      tireSet[i].update();
    if(tireSet[i].y > 580){
          tireSet.shift();
          life -= 1;
    }
  }
  }
}

function updateLettuce() {
  if(ocean.frames % 1200 === 0 && lettuceSet.length < 2) {
    const lettuce = new Lettuce;
    lettuceSet.push(lettuce) 
    }
  if(lettuceSet.length > 0) {
    for (let i = 0; i < lettuceSet.length; i += 1) {
      lettuceSet[i].draw();
      lettuceSet[i].update();
      if(lettuceSet[i].y > 580){
            lettuceSet.shift();
      }
    }
  }
}



function crashBottlePoints() {
  for(let i = 0; i < bottlesSet.length; i++) {
  if(turtle.x < bottlesSet[i].x + bottlesSet[i].width &&
    turtle.x + turtle.width > bottlesSet[i].x &&
    turtle.y < bottlesSet[i].y + bottlesSet[i].height &&
    turtle.y + turtle.height > bottlesSet[i].y) {
    score += 50;
    bottlesSet.splice(bottlesSet[i], 1)
    }
  }
}

function crashStrawPoints() {
  for(let i = 0; i < strawSet.length; i++) {
  if(turtle.x < strawSet[i].x + strawSet[i].width &&
    turtle.x + turtle.width > strawSet[i].x &&
    turtle.y < strawSet[i].y + strawSet[i].height &&
    turtle.y + turtle.height > strawSet[i].y) {
    score += 20;
    strawSet.splice(strawSet[i], 1)
    }
  }
}

function crashTirePoints() {
  for(let i = 0; i < tireSet.length; i++) {
    
  if(turtle.x < tireSet[i].x + tireSet[i].width &&
    turtle.x + turtle.width > tireSet[i].x &&
    turtle.y < tireSet[i].y + tireSet[i].height &&
    turtle.y + turtle.height > tireSet[i].y) {
    score += 20;
    tireSet.splice(tireSet[i], 1)
    }
  }
}

function crashBagPoints() {
  for(let i = 0; i < trashBagSet.length; i++) {
    
  if(turtle.x < trashBagSet[i].x + trashBagSet[i].width &&
    turtle.x + turtle.width > trashBagSet[i].x &&
    turtle.y < trashBagSet[i].y + trashBagSet[i].height &&
    turtle.y + turtle.height > trashBagSet[i].y) {
    score += 20;
    trashBagSet.splice(trashBagSet[i], 1)
    }
  }
}

function crashLettuce() {
  for(let i = 0; i < lettuceSet.length; i++) {
    
  if(turtle.x < lettuceSet[i].x + lettuceSet[i].width &&
    turtle.x + turtle.width > lettuceSet[i].x &&
    turtle.y < lettuceSet[i].y + lettuceSet[i].height &&
    turtle.y + turtle.height > lettuceSet[i].y
    // turtle.top() === tireSet[i].bottom() && turtle.right() >= tireSet[i].left() || turtle.top() === tireSet[i].bottom() && turtle.left() >= tireSet[i].right() || turtle.bottom() <= tireSet[i].top && turtle.right() >= tireSet[i].left() || turtle.bottom() <= tireSet[i].top && turtle.left() >= tireSet[i].right()
    ) {
    life += 1;
    lettuceSet.splice(lettuceSet[i], 1)
    }
  }
}

function checkGameOver() {
  if(life === 0) {
    backgroundSound.pause();
    ocean.stop()
    return ocean.clearEnd(); 
  }
}  
