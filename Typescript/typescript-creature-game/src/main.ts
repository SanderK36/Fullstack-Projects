import "./style.css";
import { creatures } from "./data/creatures";
import type { Creature, Move } from "./types/game"
const appElement = document.querySelector<HTMLDivElement>("#app");

if(!appElement) {
  throw new Error("App element not found");
}
const app = appElement;

let battleMessage = "choose a move to attack!"

function createCreatureHtml(creature: Creature): string {
  return /*HTML*/`
  <section>
      <h2>${creature.name}</h2>
      <p>HP: ${creature.hp} / ${creature.maxHp}</p>
      <p>Element: ${creature.element}</p>

      <p>Moves: ${creature.moves.map((move) =>/*HTML*/`
        <button data-creature="${creature.name}" data-move="${move.name}">
          ${move.name} - ${move.power} DMG
        </button> `).join("")}</p>
    </section>
  `
}

function attack(attacker: Creature, defender: Creature, move:Move): void {
  defender.hp = Math.max(0, defender.hp - move.power);
}

function render(): void {
  app.innerHTML = /*HTML*/`
  <main>
    <h1>Creature Battle</h1>
    <p>${battleMessage}</p>
    ${creatures.map((creature) => createCreatureHtml(creature)).join("")}
  </main>
`;
}

render();

app.addEventListener("click", (event) => {
  if(!(event.target instanceof HTMLButtonElement)) {
    return;
  }

  const creatureName = event.target.dataset.creature;
  const moveName = event.target.dataset.move;

  if(!creatureName || !moveName) {
    return;
  }

  const attacker = creatures.find(
    (creature) => creature.name === creatureName
  );

  if (!attacker) {
    return;
  }

  const attackMove = attacker.moves.find(
    (move) => move.name === moveName
  );

  if(!attackMove) {
    return;
  }

  const attackerIndex = creatures.indexOf(attacker);

  const defenderIndex = (attackerIndex + 1) % creatures.length;

  const defender = creatures[defenderIndex];

  attack(attacker, defender, attackMove);

  if(defender.hp === 0) {
    battleMessage = /*HTML*/`${defender.name} has been defeated by ${attacker.name}!`
  } else {
    battleMessage =/*HTML*/
    `${attacker.name} used ${attackMove.name} on ${defender.name} for ${attackMove.power} damage!`;
  }
  render()
});