import type { Location } from "./types";
import type { Choice } from "./choices";
import {type StoryEntry, npc, ethan, narration, thought, type Conversation} from "./story";


export type Scene = {
  id: string;
  story: StoryEntry[]
  location: Location;
  image: {day: string; night: string;}
  choices: Choice[];
};

export const morningAtHome: Scene = {
  id: "morning-at-home",
  story: [
    narration("The rain taps softly against the windows."),
    thought("I should probably get going.")
  ],
  location: "Home",
  image: {day: "./images/locations/home/homeHallway.jpg", night:"./images/locations/home/homeHallway.jpg"},
  choices: [
    {
        label: "Look around the house",
        action: "lookAround",
        nextScene: "looking-around-house",
        timeCost: 25,
    },
    {
      label: "Go to the living room",
      action: "goLivingRoom",
      nextScene: "living-room",
      timeCost: 0,
    }
  ],
};

export const lookingAroundHouse: Scene = {
  id: "looking-around-house",
  story: [
    narration("You spent some time looking around the house. Everything seems normal."),
    thought("A lot of memories in here...")
  ],
  location: "Home",
  image: {day: "./images/locations/home/homeHallway.jpg", night:"./images/locations/home/homeHallway.jpg"},
  choices: [
    {
        label: "Make some coffee",
        action: "makeCoffee",
        nextScene: "made-coffee",
        timeCost: 10,
        effects: {
            stamina: 5,
        }
    },
    {
        label: "Leave the house",
        action: "leaveHouse",
        nextScene: "left-house",
        timeCost: 5,
    },
  ],
};

export const madeCoffee: Scene = {
  id: "made-coffee",
  story: [
    narration("You felt a bit drowsy so you made yourself some coffee",),
    thought("Just what i needed")
  ],
  choices: [
    {
      label: "Go outside",
      action: "leftHouse",
      nextScene: "morning-at-home",
      timeCost: 5,
    },
  ],
  location: "Home",
  image: {day: "./images/locations/home/homeHallway.jpg", night:"./images/locations/home/homeHallway.jpg"},
};

export const leftHouse: Scene = {
  id: "left-house",
  story: [
    narration("You step outside into the rain. The cold air hits your face."),
    thought("It's colder than I expected."),
  ],
  location: "Home front yard",
  image: {day: "./images/locations/home/homeDayTime.jpg", night:"./images/locations/home/homeNightTime.jpg"},
  choices: [
    {
        label: "Go back inside",
        action: "goHome",
        nextScene: "morning-at-home",
        timeCost: 5,
    },
  ],
};

export const livingRoom: Scene = {
  id: "living-room",
  
  story: [
    narration("You walk into the living room."),
  ],
  location: "Living room",
  image: {day: "./images/locations/home/LindaParkerHome.jpg", night:"./images/locations/home/livingRoomNight.png"},

  choices: [
    {
      label: "Talk to mom",
      action: "talkToMom",
      nextScene: "talking-to-mom",
      timeCost: 10,
    }
  ],
};

export const momConversation: Conversation = {
  opening: [
    npc("Linda", "Morning, honey."),
  ],

  choices: [
    {
      label: "Morning, Mom.",
      response: [
        ethan("Morning, Mom."),
        npc("Linda", "You look tired. Did you sleep alright?"),
      ],
    },

    {
      label: "Did you sleep well?",
      response: [
        ethan("Did you sleep well?"),
        npc("Linda", "I slept alright. Just a little restless."),
      ],
    },

    {
      label: "I'm heading out.",
      response: [
        ethan("I'm heading out."),
        npc("Linda", "Alright, honey. Be careful out there."),
      ],
    },
  ],
};

export const talkingToMom: Scene = {
  id: "talking-to-mom",

  story: [
    npc("Linda", "Morning, honey."),
  ],

  location: "Living room",

  image: {
    day: "/images/locations/home/LindaParkerHome.jpg",
    night: "/images/locations/home/livingRoomNight.png",
  },

  choices: [
    {
      label: "Morning, Mom.",
      action: "sayMorningToMom",
      nextScene: "mom-said-morning",
      timeCost: 0,
    },
    {
      label: "Did you sleep well?",
      action: "askMomAboutSleep",
      nextScene: "mom-said-morning",
      timeCost: 0,
    },
    {
      label: "I'm heading out.",
      action: "tellMomLeaving",
      nextScene: "mom-said-morning",
      timeCost: 0,
    },
  ],
};

export const momSaidMorning: Scene = {
  id: "mom-said-morning",

  story: [
    {
      type: "conversation",
      character: "Ethan",
      text: "Morning, Mom.",
    },
    {
      type: "conversation",
      character: "Linda",
      text: "You look tired. Did you sleep alright?",
    },
  ],

  location: "Living room",

  image: {
    day: "/images/locations/home/LindaParkerHome.jpg",
    night: "/images/locations/home/livingRoomNight.png",
  },

  choices: [],
};