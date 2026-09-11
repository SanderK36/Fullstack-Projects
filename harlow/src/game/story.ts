export type StoryEntry =
  | {
      type: "narration";
      text: string;
    }
  | {
      type: "thought";
      text: string;
    }
  | {
      type: "conversation";
      character: string;
      text: string;
    }
  | {
      type: "effect";
      stat: "health" | "stamina" | "fear" | "money";
      amount: number;
    };