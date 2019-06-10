const self = this;

// Enemy Class
var Enemy = function (x, y, speed) {    
    this.x = x;
    this.y = y;    
    this.speed = speed;    
    this.sprite = 'images/enemy-bug.png';        
};

Enemy.prototype.update = function (dt) {        
    this.x += this.speed * dt;

    if(this.x > 500){
        this.x = -101;
    }            
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player Class
var Player = function () {
    this.step = 101;
    this.jump = 82;
    this.startX = 201;
    this.startY = 307;
    this.x = this.startX;
    this.y = this.startY;    
    this.sprite = 'images/char-boy.png';    
    this.lifes = 3;
    this.points = 0;
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function (dt) {
    
    for (let enemy of allEnemies) {                 
        if(this.y === enemy.y && (enemy.x >= (this.x - 50) && enemy.x <= (this.x + 50))){                                            
            this.resetHero();
            this.decreaseLive();
            this.checkGameOver();
        }      
    }   
}

Player.prototype.checkGameOver = function(){      
    if(this.lifes === 0){                
        document.querySelector('#modal-text').innerHTML = `You got ${player.points} points`;
        const modal = document.getElementById('myModal');
        modal.style.display = "block";                
    }  
}

Player.prototype.resetHero = function(){      
    this.x = this.startX;
    this.y = this.startY;    
}

 Player.prototype.decreaseLive = function(){
    this.lifes -= 1;
    document.getElementById('lifes').innerHTML = `Lifes  ${player.lifes}`;
 }

 Player.prototype.increaseScore = function(){     
    this.points += 1;
    document.getElementById('points').innerHTML = `Points ${this.points}`;
    self.loadEnemies(player.points);
 }

Player.prototype.handleInput = function (input) {

    if(player.lifes === 0){
        return;
    }

    switch (input) {
        case 'left':
            if (this.x > 0) {
                this.x -= this.step;
            }
            break;
        case 'right':
            if (this.x < this.step * 3) {
                this.x += this.step;
            }
            break;
        case 'up':            
            if (this.y > 0) {
                this.y -= this.jump;
            }
            if (this.y === -21) { 
                let self = this;      
                self.increaseScore();                 
                setTimeout(function(){                
                    self.resetHero();
                }, 100)
            }
            break;
        case 'down':
            if (this.y < this.jump * 3) {
                this.y += this.jump;
            }
            break;
    }
}

//Selector Class
var Selector = function () {    
    this.x = 1;
    this.y = 10;        
    this.step = 100;
    this.sprite = "images/Selector.png",
    this.selectedPlayer = 0;
    this.optionsPlayer = [
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
    ]
};

Selector.prototype.render = function () {    
    ctxMenu.drawImage(Resources.get(this.sprite), this.x, this.y);        
}

Selector.prototype.changeSelection = function(posToRedraw, previousPlayer){
    ctxMenu.clearRect(posToRedraw, this.y, 101, 171);    
    ctxMenu.drawImage(Resources.get('images/grass-block.png'), posToRedraw, this.y);
    ctxMenu.drawImage(Resources.get(this.optionsPlayer[previousPlayer]), posToRedraw, this.y);

    ctxMenu.drawImage(Resources.get(this.sprite), this.x, this.y);  
    ctxMenu.drawImage(Resources.get(this.optionsPlayer[this.selectedPlayer]), this.x, this.y);  
}

Selector.prototype.handleInput = function(input){    

    let posRedraw = 0;    
    let previousPlayer = 0;

    switch (input) {
        case 'left':                                       

            if(this.selectedPlayer === 0){                         
                return;
            }else{
                this.x -= this.step;
            }

            if(this.x === 1){                              
                posRedraw = 101;                    
                this.selectedPlayer = 0;       
                previousPlayer = 1;                         
            }else if(this.x === 101){                              
                posRedraw = 201;                                    
                this.selectedPlayer = 1;       
                previousPlayer = 2;                
            } else if(this.x === 201){                              
                posRedraw = 301;   
                this.selectedPlayer = 2;       
                previousPlayer = 3;                                                 
            } else if(this.x === 301){                              
                posRedraw = 401;                                     
                this.selectedPlayer = 3;   
                previousPlayer = 4;               
            }  else if(this.x === 401){                              
                posRedraw = 301;                    
                this.selectedPlayer = 4;   
                previousPlayer = 5;
            } 
            
            this.changeSelection(posRedraw, previousPlayer);
        
            break;
        case 'right':            
                                             
            if(this.selectedPlayer == 4){                  
                return;
            }else{
                this.x += this.step;   
            }
            
            if(this.x === 101){
                posRedraw = 1;                
                this.selectedPlayer = 1;                    
                previousPlayer = 0;

            }else if(this.x === 201){                
                posRedraw = 101; 
                this.selectedPlayer = 2;                  
                previousPlayer = 1;                
            }
            else if(this.x === 301){                
                posRedraw = 201;                
                this.selectedPlayer = 3;                    
                previousPlayer = 2;                
            }
            else if(this.x === 401){                
                posRedraw = 301;                
                this.selectedPlayer = 4;                    
                previousPlayer = 3;                
            }      
            
            this.changeSelection(posRedraw, previousPlayer);

            break;        
        case 'enter':            
            
            let canvasMenu = document.getElementById("canvas-menu");
            canvasMenu.width = 0;
            canvasMenu.height = 0;

            let canvasGame = document.getElementById("canvas-game");
            canvasGame.width = 505;
            canvasGame.height = 606;
                                                 
            player.sprite = this.optionsPlayer[this.selectedPlayer];
            player.resetHero();

            document.getElementById('menu').className = 'menu-hide';
            document.getElementById('score').className = 'score-show';
            document.getElementById('lifes').innerHTML = 'Lifes ' + player.lifes;
            document.getElementById('points').innerHTML = 'Points ' + 0;
            
            break;
    }    
}

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    selector.handleInput(allowedKeys[e.keyCode]);
});

const btnGameOver = document.querySelector("#btn-game-over");
btnGameOver.addEventListener('click', function(e){            
    self.hideModalGameOver();        
});

const buttonCloseModal = document.querySelector('.button-close');
buttonCloseModal.addEventListener('click', function(){        
    self.hideModalGameOver();        
})

function hideModalGameOver(){        
    player.lifes = 3;
    player.points = 0;
    document.querySelector('#lifes').innerHTML = `Lifes  ${player.lifes}`;
    document.querySelector('#points').innerHTML = `Points ${player.points}`;
    
    const modal = document.getElementById('myModal');
    modal.style.display = "none";

    player.resetHero();    
}

function loadEnemies(level){
    
    self.allEnemies = [];
    
    xOptions = [-100, -200, -300, -400, -500, -600];
    yOptions = [61, 143, 225];
    speed = level * 200;

    for(let i = 0; i<= 4; i++){
        var xPos = Math.floor((Math.random() * 6) + 0);
        var yPos = Math.floor((Math.random() * 3) + 0);
    
        const bug1 = new Enemy(xOptions[xPos], yOptions[yPos], speed);
    
        self.allEnemies.push(bug1);
    }
}


self.allEnemies = [];
loadEnemies(1);

const player = new Player();
const selector = new Selector();

