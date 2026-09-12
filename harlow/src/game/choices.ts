import type { ConversationChoice } from "./story";

export type ChoiceEffects = Partial<{
  courage: number;
  intelligence: number;
  charisma: number;
  athletics: number;
  strength: number;
  health: number;
  stamina: number;
  fear: number;
  money: number;
}>;

export type Choice = {
  label: string;
  action: string;
  nextScene: string;
  timeCost: number;
  effects?: ChoiceEffects;
  travel?: boolean;
  requirements?: {
    money?: number;
  }
};

export type GameChoice = Choice | ConversationChoice;