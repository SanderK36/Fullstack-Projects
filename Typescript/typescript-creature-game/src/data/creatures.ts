import type { Creature } from "../types/game";
import { ember, scratch, kick, waterGun, lightningRod, fireball, thunderStrike, vineWhip, taekwondoKick } from "./moves";



export const pyro: Creature = {
    name: "Pyro",
    element: "Fire",
    hp: 100,
    maxHp: 100,
    moves: [ember, scratch, fireball],
}

export const aquava: Creature = {
    name: "Aquava",
    element: "Water",
    hp: 100,
    maxHp: 100,
    moves: [waterGun, kick, vineWhip],
}

export const electro: Creature = {
    name: "Electro",
    element: "Electric",
    hp: 95,
    maxHp: 95,
    moves: [lightningRod, thunderStrike, scratch],
}

export const punchy: Creature = {
    name: "Punchy",
    element: "Normal",
    hp: 115,
    maxHp: 115,
    moves: [kick, scratch, taekwondoKick],
}

export const creatures: Creature[] = [
    pyro,
    aquava,
    electro,
    punchy,
]