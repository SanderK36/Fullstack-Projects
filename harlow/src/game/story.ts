export type StoryEntry =
  | {
      type: "narration";
      text: string;
    }
  | {
      type: "effect";
      stat: "health" | "stamina" | "fear" | "money";
      amount: number;
    }
  | {
      type: "dialogue";
      character: "Ethan";
      dialogueType: "speech" | "thought";
      text: string;
  }