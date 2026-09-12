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

export type SceneThought = {
  from?: number;
  until?: number;
  text: string;
};

export type Scene = {
  id: string;
  story: StoryEntry[];
  thoughts?: SceneThought[];
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
    narration("You step outside into the rain. The cold air hits your face."),
    thought("It's colder than I expected."),
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
    {
      label: "Take the bus to Needle & Groove ($7 & 10min)",
      action: "takeBus",
      nextScene: "needle-and-groove",
      timeCost: 10,
      effects: {
        money: -7,
      },
      requirements: {
        money: 7,
      }
    },
    {
      label: "Walk to Needle & Groove (45min)",
      action: "walkToNeedleAndGroove",
      nextScene: "needle-and-groove",
      timeCost: 45,
    },
    {
      label: "Walk to the gas station (20min)",
      action: "walkToGasStation",
      nextScene: "gas-station",
      timeCost: 20,
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
  ],
  
  thoughts: [
    { until: 1080, text: "",},
    { from: 1080, text: "I always feel like i'm being watched being out here this late...", },
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
    narration("You walk into the living room."),
    thought("Mom is here.", { until: 1080 }),
    thought("It's quiet in here when Mom's at work.", { from: 1080 })
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
// SCENE THOUGHT
// ----------------------------------------


// ----------------------------------------
// NEEDLE & GROOVE
// ----------------------------------------

export const needleAndGroove: Scene = {
  id: "needle-and-groove",
  story: [
    narration("You arrive at Needle & Groove."),
    thought("This place sells the best music in town."),
  ],
  location: "Needle & Groove",
  image: {
    day: "./images/locations/NeedleGroove/vinylShopDay.jpg",
    night: "./images/locations/NeedleGroove/vinylShopNight.jpg",
  },
  choices: [
    {
      label: "Take the back home ($7 & 10min)",
      action: "takeBusHome",
      nextScene: "front-yard",
      timeCost: 10,
      effects: {
        money: -7,
      },
      requirements: {
        money: 7,
      }
    },
    {
      label: "Walk back home (45min)",
      action: "walkBackHome",
      nextScene: "front-yard",
      timeCost: 45,
    },
    {
      label: "Walk to the gas station (1h)",
      action: "walkToGasStation",
      nextScene: "gas-station",
      timeCost: 60,
    },
  ],
};

// ----------------------------------------
// GAS STATION
// ----------------------------------------

export const gasStation: Scene = {
  id: "gas-station",

  story: [
    narration(
      "You make your way to the gas station."
    ),
    thought(
      "The place looks quiet."
    ),
  ],

  location: "Gas Station",

  image: {
    day: "./images/locations/gas_station/GasStationDay.jpg",
    night: "./images/locations/gas_station/GasStationNight.jpg",
  },

  choices: [
    {
      label: "Go inside",
      action: "enterGasStation",
      nextScene: "gas-station-inside",
      timeCost: 2,
    },
    {
      label: "Walk back home",
      action: "walkBackHome",
      nextScene: "front-yard",
      timeCost: 20,
    },
  ],
};

// ----------------------------------------
// GAS STATION INSIDE
// ----------------------------------------

export const gasStationInside: Scene = {
  id: "gas-station-inside",

  story: [
    narration(
      "You step inside the gas station."
    ),
    thought(
      "It's warmer in here."
    ),
  ],

  location: "Gas Station Inside",

  image: {
    day: "./images/locations/gas_station/GasStationInsideDay.png",
    night: "./images/locations/gas_station/GasStationInsideNight.png",
  },

  choices: [
    {
      label: "Go outside",
      action: "leaveGasStation",
      nextScene: "gas-station",
      timeCost: 0,
    },
  ],
};

export function getSceneThought(
  sceneId: string,
  time: number
) {
  const scene =
    scenes[
      sceneId as keyof typeof scenes
    ];

  if (!scene) {
    return null;
  }

  const thoughtEntry =
    scene.story.find(
      (entry) => {
        if (entry.type !== "thought") {
          return false;
        }

        const condition =
          entry.condition;

        if (!condition) {
          return true;
        }

        const afterStart =
          condition.from === undefined ||
          time >= condition.from;

        const beforeEnd =
          condition.until === undefined ||
          time < condition.until;

        return afterStart && beforeEnd;
      }
    );

  return thoughtEntry?.type === "thought"
    ? thoughtEntry.text
    : null;
}

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
  "needle-and-groove": needleAndGroove,
  "gas-station": gasStation,
  "gas-station-inside": gasStationInside,
};
