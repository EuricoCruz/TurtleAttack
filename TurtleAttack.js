let life = 3;
let ctx = document.getElementById('canvas');
let pincel = ctx.getContext('2d');
let plasticBottle = [];
let straws = [];
let tires = [];

window.onload = function() {
    document.getElementById("start-button").onclick = function() {
        ocean.clear();// ocean.clearEnd();
        ocean.start();
      };
}

let ocean = {
  frames: 0,
  start: function() {
    this.clear();
    this.interval = setInterval(updateGameArea, 20);
    this.points = 0;
    this.width = 800;
    this.height = 600;
    turtle.drawTurtle();
  },
  clearEnd: function() {
    clearInterval(this.interval);
    this.frames = 0;
    this.points = 0; 
    plasticBottle = [];
    straws = [];
    tires = [];
  },
  clear: function() {
    pincel.clearRect(0, 0, this.width, this.height);
  },
  // stop: function() {
  //   clearInterval(this.interval);
  //   ct.clearRect(0, 0, 400, 600);
  //   ct.fillStyle = 'black';
  //   ct.fillRect(0, 0, 400, 600);
  //   ct.fill();
  //   ct.fillStyle = 'red';
  //   ct.fillText('Game Over!', 150, 100);
  //   ct.fillStyle = 'white';

  // },
// },
} 
class Player {
  constructor() {
    this.x = 350;
    this.y = 500;
    this.img = document.getElementById('turtle')
    this.width = 80;
    this.height = 100;
  }
  drawTurtle() {
    pincel.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

const turtle = new Player();

document.onkeydown = function(e) {
  console.log(turtle)
  switch (e.keyCode) {
  case 38: // up arrow
  if(turtle.y >= 20) {
    turtle.y -= 20;
    console.log(turtle);
  }
  break;
  case 40: // down arrow
  if(turtle.y < 500) {
    turtle.y += 20;
  }  
  break;
  case 37: // left arrow
  if(turtle.x >= 15) {
    turtle.x -= 20;
  }  
  break;
  case 39: // right arrow
  if(turtle.x <= 700) {
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
  ocean.clear();
  ocean.start();
}


