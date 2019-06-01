// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y + 55;
    this.step = 101;
    this.boundry = this.step * 5;
    this.resetPos = -this.step;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.    
    if (this.x < this.boundry) {
        this.x += this.speed * dt;
    }
    else {
        this.x = this.resetPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player Class
var Player = function () {
    this.step = 101;
    this.jump = 83;
    this.startX = this.step * 2;
    this.startY = (this.jump * 4) + 55;
    this.x = this.startX;
    this.y = this.startY;
    this.victory = false;
    this.sprite = 'images/char-boy.png';
    this.live = 5;
    this.score = 0;
    this.gameOver = false;
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function (dt) {
    for (let enemy of allEnemies) {
        if (this.y === enemy.y && (enemy.x + enemy.step / 2 > this.x
            && enemy.x < this.x + this.step / 2)) {
            this.checkGameOver();
            this.resetHero();
            this.decreaseLive();
        }

        if (this.y === -28) {
            this.increaseScore();
            this.resetHero();
        }
    }
}

Player.prototype.handleInput = function (input) {
    switch (input) {
        case 'left':
            if (this.x > 0) {
                this.x -= this.step;
            }
            break;
        case 'right':
            if (this.x < this.step * 4) {
                this.x += this.step;
            }
            break;
        case 'up':
            if (this.y > 0) {
                this.y -= this.jump;
            }
            break;
        case 'down':
            if (this.y < this.jump * 4) {
                this.y += this.jump;
            }
            break;
    }
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const bug1 = new Enemy(-101, 0, 200);
const bug2 = new Enemy(-101, 83, 300);
const bug3 = new Enemy(252, 83, 300);
const bug4 = new Enemy(151, 166, 400);
const allEnemies = [];
allEnemies.push(bug1, bug2, bug3, bug4);

// Place the player object in a variable called player
const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
