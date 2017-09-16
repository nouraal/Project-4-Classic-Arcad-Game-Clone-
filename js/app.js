var bugSpeed = 10;
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    // Reset the enemy with a new speed after it goes off screen
    if (this.x >= 505) {
        this.x = -105;
        //Math.floor is Round a number downward to its nearest integer & Math.random number between 0  to 1 
        // Speed result it's from 1 to 12
        this.speed = bugSpeed * Math.floor(Math.random() * 12 + 1);
    }
    this.checkCollision();
};

// checkCollision() Used to check if two objects collision together
Enemy.prototype.checkCollision = function() {
    //  Set the object that will be checked (player & nemy )
    var playerObj = {
        x: player.x,
        y: player.y,
        width: 50,
        height: 40
    };
    var enemyObj = {
        x: this.x,
        y: this.y,
        width: 60,
        height: 70
    };
    // Check if there is a collision or not
    if (playerObj.x < enemyObj.x + enemyObj.width &&
        playerObj.x + playerObj.width > enemyObj.x &&
        playerObj.y < enemyObj.y + enemyObj.height &&
        playerObj.height + playerObj.y > enemyObj.y) {
        //           ----------- if we have one ------------
        // we will  decrement playerLives and reset the player position

        player.playerLives -= 1;
        player.characterReset();
    }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = '#b6390a';
    ctx.beginPath();
    ctx.font = "20px OCR A, Extended";
    ctx.fillText("Score:" + player.playerScore, 102, 570);
    ctx.fillText("Lives:" + player.playerLives, 305, 570);
    ctx.beginPath();
    ctx.font = "30px OCR A, Extended";
    ctx.fillText("WELCOME TO THE ARCADE GAME", 20, 35);
    ctx.closePath();
};

//------------  player class  ---------------------------
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//Player info like (position & img & playerScore & playerLives).
var Player = function() {
    this.x = 200;
    this.y = 400;
    this.playerScore = 0;
    this.playerLives = 5;
    this.sprite = 'images/char-princess-girl.png';
};

// Reset the player position for new game
Player.prototype.characterReset = function() {
    this.x = 200;
    this.y = 400;
};

// Check if the playerLives is 0, if true we will call reset.
Player.prototype.update = function() {
    if (this.playerLives === 0) {
        // popup Message for game over useing alert.
        alert("GAME OVER " + ".... Your score is " + player.playerScore);
        reset();
    }
};


// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Movement of the player according to keys pressed
// we only have 4 keys (left & right & up & down)
Player.prototype.handleInput = function(allowedKeys) {
    //Check if it's equal to the left & if the x is greater than 0
    if (allowedKeys === "left" && this.x > 0) {
        this.x -= 101;
    }
    //Check if it's equal to the right & if the x is less than 402
    if (allowedKeys === "right" && this.x < 402) {
        this.x += 101;
    }
    //check if player reached top of water to call success function
    // if not move to the up
    if (allowedKeys === "up") {
        if (this.y < 0) {
            this.success();
        } else {
            this.y -= 83;
        }
    }
    //Check if it's equal to the down & if the x is less than 400
    if (allowedKeys === "down" && this.y < 400) {
        this.y += 83;
    }
};


// when the player reache to the top of the water we will (Increase score & difficulty of the game)
Player.prototype.success = function() {

    this.playerScore += 10;
    bugSpeed += 5;
    this.characterReset();
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//instantiate the player
var player = new Player();

// Empty allEnemies array
var allEnemies = [];

// Instantiate enemies, set to 3, push in to allEnemies array
for (var e = 0; e < 3; e++) {
    //startSpeed is a random number from from 1 to 12
    var startSpeed = bugSpeed * Math.floor(Math.random() * 12 + 1);
    allEnemies.push(new Enemy(-100 , 60 + (85 * e) , startSpeed));
    //+ (e * 50)
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});