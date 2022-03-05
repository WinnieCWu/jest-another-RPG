const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

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
            this.startNewBattle();
            //console.log(this.currentEnemy, this.player);
        })
    };

    Game.prototype.startNewBattle = function() {
        if(this.player.agility > this.currentEnemy.agility) {
            this.isPlayerTurn = true;
        } else {
            this.isPlayerTurn = false;
        }
        //display Player stats from previous method 
        console.log('Your stats are as follows:');
        console.table(this.player.getStats());
        //use existing Enemy method that's tested
        console.log(this.currentEnemy.getDescription());
        
        this.battle();
    };

    Game.prototype.battle = function() {
        if (this.isPlayerTurn) {
            //player prompts 
            inquirer
            .prompt ({
                type:'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: ['Attack', 'Use potion']
            })
            .then(({action}) => {
                if (action === 'Use potion') {
                    //f/u prompt will go here
                    if (!this.player.getInventory()) {
                        console.log("You don't have any potions!");
                        return;
                    }
                    inquirer
                        .prompt({
                            type: 'list',
                            message: 'Which potion would you like to use?',
                            name: 'action',
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                        })
                        .then(({action}) => {
                            //split to get an array with # and Potion name
                            const potionDetails = action.split(': ');
                            //subtracting 1 from # puts us back at original array index
                            this.player.usePotion(potionDetails[0] - 1);
                            console.log(`You used a ${potionDetails[1]} potion.`);
                        });
                } else {
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);
                    
                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth)
            
                }
            });

        } else {
            const damage = this.currentEnemy.getAttackValue();
            this.player.reduceHealth(damage);

            console.log(`You were attacked by the ${this.currentEnemy.name}`);
            console.log(this.player.getHealth());
        }
    };


module.exports = Game;