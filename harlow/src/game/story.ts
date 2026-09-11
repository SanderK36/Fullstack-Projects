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

    export type ConversationChoice = {
      label: string;
      response: StoryEntry[];
    };
    
    export type Conversation = {
      opening: StoryEntry[];
      choices: ConversationChoice[];
    };
    
    export function narration(text: string): StoryEntry {
      return {
        type: "narration",
        text,
      };
    }
    
    export function thought(text: string): StoryEntry {
      return {
        type: "thought",
        text,
      };
    }

export function ethan(text: string): StoryEntry {
  return {
    type: "conversation",
    character: "Ethan",
    text,
  };
}

export function npc(character: string, text: string): StoryEntry {
  return {
    type: "conversation",
    character,
    text,
  };
}