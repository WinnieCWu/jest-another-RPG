const Player = require('../lib/Player.js');
const Potion = require('../lib/Potion.js');

jest.mock('../lib/Potion.js');


test('creates a player object', () => {
    const player = new Player('Dave');

    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
});

test("gets player's stats as an object", () => {
    const player = new Player('Dave');

    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

test('gets inventory from player or returns false', () => {
    const player = new Player('Dave');

    expect(player.getInventory()).toEqual(expect.any(Array));
    //simulate an empty array before the next expect() runs
    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});

//test to get player's health info
test("gets player's health value", () => {
    const player = new Player('Dave');
    //this also helps declutter logic in the Game, which can focus on displaying game logic
    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

//check if player is alive
test('checks if player is alive or not', () => {
    const player = new Player('Dave');
    //check for both conditions: if alive or not
    expect(player.isAlive()).toBeTruthy();
    player.health = 0;
    expect(player.isAlive()).toBeFalsy();
});

test("subtracts from player's health", () => {
    const player = new Player ('Dave');
    const oldHealth = player.health;

    player.reduceHealth(5);
    expect(player.health).toBe(oldHealth - 5);
    //call twice to make sure it never goes negative
    player.reduceHealth(9999);
    expect(player.health).toBe(0);
});