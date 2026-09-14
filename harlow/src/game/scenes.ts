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

export type SceneCharacter = {
  name: string;
  from?: number;
  until?: number;
  image?: string;
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
  characters?: SceneCharacter[];
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
      label: "Go to your room",
      action: "goEthanRoom",
      nextScene: "ethan-room",
      timeCost: 0,
    },
    {
      label: "Go to Mom's room",
      action: "goMomRoom",
      nextScene: "mom-room",
      timeCost: 0,
    },
    {
      label: "Go to Emily's room",
      action: "goEmilyRoom",
      nextScene: "emily-room",
      timeCost: 0,
    },
    {
      label: "Go to the attic",
      action: "goAttic",
      nextScene: "attic",
      timeCost: 0,
    },
    {
      label: "Go to the basement",
      action: "goBasement",
      nextScene: "basement",
      timeCost: 0,
    },
    {
      label: "Go to the garage",
      action: "goGarage",
      nextScene: "garage",
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
      travel: true,
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
      travel: true,
    },
    {
      label: "Walk to the gas station (30min)",
      action: "walkToGasStation",
      nextScene: "gas-station",
      timeCost: 30,
      travel: true,
    },
    {
      label: "Walk to the police station (30min)",
      action: "walkToPoliceStation",
      nextScene: "police-station",
      timeCost: 30,
      travel: true,
    },
    {
      label: "Take the bus to the police station ($7 & 10min)",
      action: "takeBusToPoliceStation",
      nextScene: "police-station",
      timeCost: 10,
      travel: true,
      effects: {
        money: -7,
      },
      requirements: {
        money: 7,
      }
    },
    {
      label: "Walk to the hospital (35min)",
      action: "walkToHospital",
      nextScene: "hospital",
      timeCost: 35,
      travel: true,
    },
    {
      label: "Take the bus to the hospital (15min)",
      action: "driveToHospital",
      nextScene: "hospital",
      timeCost: 15,
      travel: true,
      effects: {
        money: -7,
      },
      requirements: {
        money: 7,
      }
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
// CONVERSATIONS
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

export const johnnyConversation: Conversation = {
  opening: [
    npc(
      "Johnny",
      "Hey. Looking for something?"
    ),
  ],
  choices: [
    {
      label: "Just browsing.",
      response: [
        ethan("Yeah. Just looking around."),
        npc(
          "Johnny",
          "Take your time."
        ),
      ],
    },
    {
      label: "Do you own this place?",
      response: [
        ethan("You own the shop?"),
        npc(
          "Johnny",
          "Sure do. Been running it for a few years now."
        ),
      ],
    },
    {
      label: "Nevermind.",
      response: [
        ethan("Nevermind."),
        npc(
          "Johnny",
          "Alright."
        ),
      ],
      endsConversation: true,
    },
  ],
};

export const walterConversation: Conversation = {
  opening: [
    npc(
      "Walter",
      "Can I help you?"
    ),
  ],
  choices: [
    {
      label: "I'm looking for some information.",
      response: [
        ethan(
          "I'm looking for some information."
        ),
        npc(
          "Walter",
          "What kind of information?"
        ),
      ],
    },
    {
      label: "Has anything happened around town?",
      response: [
        ethan(
          "Has anything happened around town lately?"
        ),
        npc(
          "Walter",
          "Nothing you need to concern yourself with."
        ),
      ],
    },
    {
      label: "Nevermind.",
      response: [
        ethan("Nevermind."),
        npc(
          "Walter",
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
// OTHER ROOMS
// ----------------------------------------

const returnToHallway = {
  label: "Go back to the hallway",
  action: "goHallway",
  nextScene: "hallway",
  timeCost: 0,
};

export const ethanRoom: Scene = {
  id: "ethan-room",
  story: [
    narration("You step into your room."),
    thought("I should keep this place organized."),
  ],
  location: "Ethan's room",
  image: {
    day: "./images/locations/home/ethanRoomDay.png",
    night: "./images/locations/home/ethanRoomNight.png",
  },
  choices: [returnToHallway],
};

export const momRoom: Scene = {
  id: "mom-room",
  story: [
    narration("You enter Mom's room."),
    thought("It feels strange being in here."),
  ],
  location: "Mom's room",
  image: {
    day: "./images/locations/home/motherRoomDay.png",
    night: "./images/locations/home/MotherRoomNight.png",
  },
  choices: [returnToHallway],
};

export const emilyRoom: Scene = {
  id: "emily-room",
  story: [
    narration("You enter Emily's room."),
    thought("Everything is exactly where she left it."),
  ],
  location: "Emily's room",
  image: {
    day: "./images/locations/home/sisterRoomDay.png",
    night: "./images/locations/home/sisterRoomNight.png",
  },
  choices: [returnToHallway],
};

export const attic: Scene = {
  id: "attic",
  story: [
    narration("You climb up into the attic."),
    thought("The air is stale up here."),
  ],
  location: "Attic",
  image: {
    day: "./images/locations/home/atticDay.png",
    night: "./images/locations/home/AtticNight.png",
  },
  choices: [returnToHallway],
};

export const basement: Scene = {
  id: "basement",
  story: [
    narration("You head down into the basement."),
    thought("It's darker down here than it should be."),
  ],
  location: "Basement",
  image: {
    day: "./images/locations/home/basementDay.png",
    night: "./images/locations/home/basementNight.png",
  },
  choices: [returnToHallway],
};

export const garage: Scene = {
  id: "garage",
  story: [
    narration("You walk into the garage."),
    thought("It smells like oil and old wood."),
  ],
  location: "Garage",
  image: {
    day: "./images/locations/home/garage.png",
    night: "./images/locations/home/garage.png",
  },
  choices: [returnToHallway],
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
    narration("You make your way to Needle & Groove."),
    thought("The record store is just down the street."),
  ],
  location: "Needle & Groove",
  image: {
    day: "./images/locations/NeedleGroove/vinylShopDay.jpg",
    night: "./images/locations/NeedleGroove/vinylShopNight.jpg",
  },
  choices: [
    {
      label: "Go inside",
      action: "enterNeedleAndGroove",
      nextScene: "needle-and-groove-inside",
      timeCost: 2,
    },
    {
      label: "Walk back home",
      action: "walkBackHome",
      nextScene: "front-yard",
      timeCost: 20,
      travel: true,
    },
  ],
};

export const needleAndGrooveInside: Scene = {
  id: "needle-and-groove-inside",
  story: [
    narration("You step inside Needle & Groove."),
    thought("The smell of old records fills the shop."),
  ],
  location: "Needle & Groove",
  image: {
    day: "./images/locations/NeedleGroove/needleGrooveEmpty.png",
    night: "./images/locations/NeedleGroove/needleGrooveEmpty.png",
  },
  characters: [
    {
      name: "Johnny Dalton",
      from: 480,
      until: 840,
      image: "./images/locations/NeedleGroove/johnnyDaltonCounter.png",
    },
  ],
  choices: [
    {
      label: "Talk to Johnny",
      action: "talkToJohnny",
      nextScene: "needle-and-groove-inside",
      timeCost: 0,
    },
    {
      label: "Enter the backroom",
      action: "enterNeedleAndGrooveBackroom",
      nextScene: "needle-and-groove-backroom",
      timeCost: 1,
    },
    {
      label: "Go outside",
      action: "leaveNeedleAndGroove",
      nextScene: "needle-and-groove",
      timeCost: 0,
    },
  ],
  conversation: johnnyConversation,
};

export const needleAndGrooveBackroom: Scene = {
  id: "needle-and-groove-backroom",
  story: [
    narration("You step into the backroom."),
    thought("Boxes of records are stacked against the walls."),
  ],
  location: "Needle & Groove",
  image: {
    day: "./images/locations/NeedleGroove/vinylShopBackroom.png",
    night: "./images/locations/NeedleGroove/vinylShopBackroom.png",
  },
  characters: [
    {
      name: "Johnny Dalton",
      from: 840,
      image: "./images/locations/NeedleGroove/JohnnyBackroom.png",
    },
  ],
  choices: [
    {
      label: "Go back to the shop",
      action: "leaveNeedleAndGrooveBackroom",
      nextScene: "needle-and-groove-inside",
      timeCost: 0,
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
      travel: true,
    },
  ],
};

export const gasStationInside: Scene = {
  id: "gas-station-inside",

  story: [
    narration("You step inside the gas station."),
    thought("Ray is here", { until: 1380 }),
    thought("It's quiet in here.", { from: 540 })
  ],

  location: "Gas Station Inside",

  image: {
    day: "./images/locations/gas_station/GasStationInsideDay.png",
    night: "./images/locations/gas_station/GasStationInsideNight.png",
  },
  
  characters: [
    {
      name: "Ray Mercer",
      from: 540,
      until: 1380,
      image: "./images/locations/gas_station/rayMercerGasStation.png",
    },
  ],

  choices: [
    {
      label: "Go outside",
      action: "leaveGasStation",
      nextScene: "gas-station",
      timeCost: 0,
    },
  ],
};

// ----------------------------------------
// POLICE STATION
// ----------------------------------------

export const policeStation: Scene = {
  id: "police-station",
  story: [
    narration("You arrive at the police station."),
    thought("There are a few cars parked outside."),
  ],
  location: "Police Station",
  image: {
    day: "./images/locations/police_station/police_station_day.jpg",
    night: "./images/locations/police_station/police_station_night.jpg",
  },
  choices: [
    {
      label: "Go inside",
      action: "enterPoliceStation",
      nextScene: "police-station-inside",
      timeCost: 2,
    },
    {
      label: "Walk back home (30min)",
      action: "walkBackHome",
      nextScene: "front-yard",
      timeCost: 30,
      travel: true,
    },
    {
      label: "Take the bus back home (10min)",
      action: "takeBusHome",
      nextScene: "front-yard",
      timeCost: 10,
      travel: true,
      effects: {
        money: -7,
      },
      requirements: {
        money: 7,
      }
    },
  ],
};

export const policeStationInside: Scene = {
  id: "police-station-inside",
  story: [
    narration("You step inside the police station."),
    thought("The station is quieter than you expected."),
  ],
  location: "Police Station Inside",
  image: {
    day: "./images/locations/police_station/policeStationInsideDay.png",
    night: "./images/locations/police_station/policeStationInsideNight.png",
  },
  choices: [
    {
      label: "Go outside",
      action: "leavePoliceStation",
      nextScene: "police-station",
      timeCost: 0,
    },
    {
      label: "Go to the sheriff's office",
      action: "goToSheriffOffice",
      nextScene: "sheriff-office",
      timeCost: 2,
    },
  ],
};

export const sheriffOffice: Scene = {
  id: "sheriff-office",

  story: [
    narration("You step into the sheriff's office."),
    thought("The Sheriff is here.", { from: 460, until: 960 }),
    thought("No one is here at the moment.", { from: 960, until: 1080 }),
    thought("I shouldn't be here this late.", { from: 1080}),
  ],

  location: "Sheriff's office",

  image: {
    day: "./images/locations/police_station/walterOfficeDay.png",
    night: "./images/locations/police_station/walterOfficeNight.png",
  },
  
  characters: [
    {
      name: "Walter Harrington",
      from: 480,
      until: 960,
      image: "./images/locations/police_station/WalterHarringtonOffice.jpg"
    },
    {
      name: "Walter Harrington",
      from: 960,
      until: 1080,
      image: "./images/locations/police_station/walterOfficeDay.png",
    },
    {
      name: "Walter Harrington",
      from: 1080,
      image: "./images/locations/police_station/walterOfficeNight.png",
    },
  ],
  conversation: walterConversation,
  choices: [
    {
      label: "Go back to the station",
      action: "leaveSheriffOffice",
      nextScene: "police-station-inside",
      timeCost: 0,
    },
    {
      label: "Talk to Walter",
      action: "talkToWalter",
      nextScene: "sheriff-office",
      timeCost: 0,
    },
  ],
};

// ----------------------------------------
// HOSPITAL
// ----------------------------------------

export const hospital: Scene = {
  id: "hospital",
  story: [
    narration("You arrive at the hospital."),
    thought("The building is quiet."),
  ],
  location: "Hospital",
  image: {
    day: "./images/locations/hospital/hospitalDay.jpg",
    night: "./images/locations/hospital/hospitalNight.jpg",
  },
  choices: [
    {
      label: "Go inside",
      action: "enterHospital",
      nextScene: "hospital-reception",
      timeCost: 2,
    },
    {
      label: "Walk back home",
      action: "walkBackHome",
      nextScene: "front-yard",
      timeCost: 30,
      travel: true,
    },
  ],
};

export const hospitalReception: Scene = {
  id: "hospital-reception",
  story: [
    narration("You step inside the hospital."),
    thought("The smell of disinfectant hangs in the air."),
  ],
  location: "Hospital",
  image: {
    day: "./images/locations/hospital/hospitalReception.png",
    night: "./images/locations/hospital/hospitalReception.png",
  },
  characters: [
    {
      name: "Marlene",
      image: "./images/locations/hospital/marleneWorking.png",
    },
  ],
  choices: [
    {
      label: "Talk to Marlene",
      action: "talkToMarlene",
      nextScene: "hospital-reception",
      timeCost: 0,
    },
    {
      label: "Go outside",
      action: "leaveHospital",
      nextScene: "hospital",
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
  "ethan-room": ethanRoom,
  "mom-room": momRoom,
  "emily-room": emilyRoom,
  attic,
  basement,
  garage,
  "needle-and-groove": needleAndGroove,
  "needle-and-groove-inside": needleAndGrooveInside,
  "needle-and-groove-backroom": needleAndGrooveBackroom,
  "gas-station": gasStation,
  "gas-station-inside": gasStationInside,
  "police-station": policeStation,
  "police-station-inside": policeStationInside,
  "sheriff-office": sheriffOffice,
  hospital,
  "hospital-reception": hospitalReception,
};
