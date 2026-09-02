export type Element = "Fire" | "Water" | "Grass" | "Normal" | "Electric";

export interface Move {
    name: string;
    power: number;
    element: Element;
}

export interface Creature {
    name: string;
    element: Element;
    hp: number;
    maxHp: number;
    moves: Move[];
}