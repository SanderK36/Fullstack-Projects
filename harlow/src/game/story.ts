export type StoryEntry =
  | {
      type: "narration";
      text: string;
    }
  | {
      type: "effect";
      stat: "health" | "stamina" | "fear" | "money";
      amount: number;
    };