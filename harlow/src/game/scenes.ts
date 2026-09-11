import type { Location } from "./types";
import type { Choice } from "./choices";

import {
  type StoryEntry,
  type Conversation,
  npc,
  ethan,
  narration,
  thought,
} from "./story";

export type Scene = {
  id: string;
  story: StoryEntry[];
  location: Location;
  image: {
    day: string;
    night: string;
  };
  choices: Choice[];
  conversation?: Conversation;
};

// ----------------------------------------
// HALLWAY
// ----------------------------------------

export const hallway: Scene = {
  id: "hallway",

  story: [
    narration(
      "The rain taps softly against the windows."
    ),
    thought(
      "I should probably get going."
    ),
  ],

  location: "Home",

  image: {
    day: "./images/locations/home/homeHallway.jpg",
    night: "./images/locations/home/homeHallway.jpg",
  },

  choices: [
    {
      label: "Go to the living room",
      action: "goLivingRoom",
      nextScene: "living-room",
      timeCost: 0,
    },
    {
      label: "Go to the kitchen",
      action: "goKitchen",
      nextScene: "kitchen",
      timeCost: 0,
    },
    {
      label: "Go to the bathroom",
      action: "goBathroom",
      nextScene: "bathroom",
      timeCost: 0,
    },
    {
      label: "Go outside",
      action: "leaveHouse",
      nextScene: "front-yard",
      timeCost: 5,
    },
  ],
};

// ----------------------------------------
// LOOKING AROUND THE HOUSE
// ----------------------------------------

export const lookingAroundHouse: Scene = {
  id: "looking-around-house",

  story: [
    narration(
      "You spend some time looking around the house. Everything seems normal."
    ),
    thought(
      "A lot of memories in here..."
    ),
  ],

  location: "Home",

  image: {
    day: "./images/locations/home/homeHallway.jpg",
    night: "./images/locations/home/homeHallway.jpg",
  },

  choices: [
    {
      label: "Make some coffee",
      action: "makeCoffee",
      nextScene: "made-coffee",
      timeCost: 10,

      effects: {
        stamina: 5,
      },
    },
    {
      label: "Go back to the hallway",
      action: "goHome",
      nextScene: "hallway",
      timeCost: 0,
    },
  ],
};

// ----------------------------------------
// MADE COFFEE
// ----------------------------------------

export const madeCoffee: Scene = {
  id: "made-coffee",

  story: [
    narration(
      "You felt a bit drowsy, so you made yourself some coffee."
    ),
    thought(
      "Just what I needed."
    ),
  ],

  choices: [
    {
      label: "Go back to the hallway",
      action: "goHome",
      nextScene: "hallway",
      timeCost: 0,
    },
  ],

  location: "Home",

  image: {
    day: "./images/locations/home/homeHallway.jpg",
    night: "./images/locations/home/homeHallway.jpg",
  },
};

// ----------------------------------------
// FRONT YARD
// ----------------------------------------

export const frontYard: Scene = {
  id: "front-yard",

  story: [
    narration(
      "You step outside into the rain. The cold air hits your face."
    ),
    thought(
      "It's colder than I expected."
    ),
  ],

  location: "Home front yard",

  image: {
    day: "./images/locations/home/homeDayTime.jpg",
    night: "./images/locations/home/homeNightTime.jpg",
  },
  
  choices: [
    {
      label: "Go to the backyard",
      action: "goBackYard",
      nextScene: "back-yard",
      timeCost: 2,
    },
    {
      label: "Go back inside",
      action: "goHome",
      nextScene: "hallway",
      timeCost: 5,
    },
  ],
};

// ----------------------------------------
// BACK YARD
// ----------------------------------------

export const backYard: Scene = {
  id: "back-yard",

  story: [
    narration(
      "You walk around to the backyard."
    ),
    thought(
      "The rain has turned the grass into mud."
    ),
  ],

  location: "Home back yard",

  image: {
    day: "./images/locations/home/homeBackyardDaytime.jpg",
    night: "./images/locations/home/homeBackyardNightTime.jpg",
  },

  choices: [
    {
      label: "Go to the front yard",
      action: "goFrontYard",
      nextScene: "front-yard",
      timeCost: 2,
    },
    {
      label: "Go back inside",
      action: "goHome",
      nextScene: "hallway",
      timeCost: 5,
    },
  ],
};


// ----------------------------------------
// MOM CONVERSATION
// ----------------------------------------

export const momConversation: Conversation = {
  opening: [
    npc(
      "Linda",
      "Morning, honey."
    ),
  ],

  choices: [
    {
      label: "Morning, Mom.",

      response: [
        ethan("Morning, Mom."),
        npc(
          "Linda",
          "You look tired. Did you sleep alright?"
        ),
      ],
    },

    {
      label: "Did you sleep well?",

      response: [
        ethan(
          "Did you sleep well?"
        ),
        npc(
          "Linda",
          "I slept alright. Just a little restless."
        ),
      ],
    },

    {
      label: "I'm heading out.",

      response: [
        ethan(
          "I'm heading out."
        ),
        npc(
          "Linda",
          "Alright, honey. Be careful out there."
        ),
      ],

      endsConversation: true,
    },

    {
      label: "Nevermind.",

      response: [
        ethan(
          "Nevermind. It was nothing."
        ),
        npc(
          "Linda",
          "Alright."
        ),
      ],

      endsConversation: true,
    },
  ],
};

// ----------------------------------------
// LIVING ROOM
// ----------------------------------------

export const livingRoom: Scene = {
  id: "living-room",

  story: [
    narration(
      "You walk into the living room."
    ),
  ],

  location: "Living room",

  image: {
    day: "./images/locations/home/LindaParkerHome.jpg",
    night: "./images/locations/home/livingRoomNight.png",
  },

  choices: [
    {
      label: "Talk to mom",
      action: "talkToMom",
      nextScene: "living-room",
      timeCost: 10,
    },
    {
      label: "Go to the hallway",
      action: "goHome",
      nextScene: "hallway",
      timeCost: 0,
    },
    {
      label: "Go to the kitchen",
      action: "goKitchen",
      nextScene: "kitchen",
      timeCost: 0,
    },
    {
      label: "Go to the bathroom",
      action: "goBathroom",
      nextScene: "bathroom",
      timeCost: 0,
    },
    {
      label: "Go outside",
      action: "leaveHouse",
      nextScene: "front-yard",
      timeCost: 5,
    },
  ],

  conversation: momConversation,
};

// ----------------------------------------
// KITCHEN
// ----------------------------------------

export const kitchen: Scene = {
  id: "kitchen",

  story: [
    narration(
      "You step into the kitchen."
    ),
    thought(
      "The house is quiet."
    ),
  ],

  location: "Home",

  image: {
    day: "./images/locations/home/kitchenDay.png",
    night: "./images/locations/home/kitchenNight.png",
  },

  choices: [
    {
      label: "Go to the hallway",
      action: "goHome",
      nextScene: "hallway",
      timeCost: 0,
    },
    {
      label: "Go to the living room",
      action: "goLivingRoom",
      nextScene: "living-room",
      timeCost: 0,
    },
    {
      label: "Go to the bathroom",
      action: "goBathroom",
      nextScene: "bathroom",
      timeCost: 0,
    },
    {
      label: "Go outside",
      action: "leaveHouse",
      nextScene: "front-yard",
      timeCost: 5,
    },
  ],
};

// ----------------------------------------
// BATHROOM
// ----------------------------------------

export const bathroom: Scene = {
  id: "bathroom",

  story: [
    narration(
      "You step into the bathroom."
    ),
    thought(
      "Nothing unusual."
    ),
  ],

  location: "Home",

  image: {
    day: "./images/locations/home/bathroomDay.png",
    night: "./images/locations/home/bathroomNight.png",
  },

  choices: [
    {
      label: "Go to the hallway",
      action: "goHome",
      nextScene: "hallway",
      timeCost: 0,
    },
    {
      label: "Go to the living room",
      action: "goLivingRoom",
      nextScene: "living-room",
      timeCost: 0,
    },
    {
      label: "Go to the kitchen",
      action: "goKitchen",
      nextScene: "kitchen",
      timeCost: 0,
    },
    {
      label: "Go outside",
      action: "leaveHouse",
      nextScene: "front-yard",
      timeCost: 5,
    },
  ],
};

// ----------------------------------------
// SCENE LIST
// ----------------------------------------

export const scenes = {
  hallway,
  "looking-around-house": lookingAroundHouse,
  "made-coffee": madeCoffee,
  "front-yard": frontYard,
  "back-yard": backYard,
  "living-room": livingRoom,
  kitchen,
  bathroom,
};

// ----------------------------------------
// SCENE THOUGHT
// ----------------------------------------

export function getSceneThought(
  sceneId: string,
  time: number
) {
  if (sceneId === "living-room") {
    if (time < 1080) {
      return "Mom is here.";
    }

    return "It's quiet in here when Mom's at work.";
  }

  const scene =
    scenes[
      sceneId as keyof typeof scenes
    ];

  if (!scene) {
    return null;
  }

  return (
    scene.story.find(
      (entry) =>
        entry.type === "thought"
    )?.text ?? null
  );
}