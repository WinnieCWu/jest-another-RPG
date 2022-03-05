const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;

    //initialize game with enemies array
    Game.prototype.initializeGame = function() {
        this.enemies.push(new Enemy('monster', 'sword'));
        this.enemies.push(new Enemy('orc', 'baseball bat'));
        this.enemies.push(new Enemy('skeleton', 'axe'));

        //capture which Enemy obj is currently fighting the Player; the 1st in array
        this.currentEnemy = this.enemies[0];

        inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
        //destructure name from the prompt object
        .then(({name}) => {
            this.player = new Player(name);
            //test the object creation
            console.log(/*this.currentEnemy, this.player*/ this.startNewBattle());
        })
    };
}

module.exports = Game;