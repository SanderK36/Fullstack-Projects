import type { Player } from './types'

const player: Player = {
    name: "Ethan Parker", //Placeholder, kan endres senere

    courage: 1,
    intelligence: 1,
    charisma: 1,
    athletics: 1,
    strength: 1,

    health: 100,
    maxHealth: 100,
    stamina: 150,
    maxStamina: 150,

    fear: 0,

    money: 10,

    inventory: [
        "House key",
        "Cigarettes",
        "Flashlight",
        "Knife",
        "Beer"
    ],
};

export default player