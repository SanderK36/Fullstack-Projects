import type { Location } from "./types";
import type { Choice } from "./choices";
import type { StoryEntry } from "./story";

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
    {
      type: "narration",
      text: "The rain taps softly against the windows.",
    },
    {
      type: "dialogue",
      character: "Ethan",
      dialogueType: "thought",
      text: "I should probably get going.",
    },
  ],
  location: "Home",
  image: {day: "./images/locations/home/homeHallway.jpg", night:"./images/locations/home/homeHallway.jpg"},
  choices: [
    {
        label: "Look around the house",
        action: "lookAround",
        nextScene: "looking-around-house",
        timeCost: 25,
    }
  ],
};

export const lookingAroundHouse: Scene = {
  id: "looking-around-house",
  story: [
    {
      type: "narration",
      text: "You look around the house. Everything seems normal.",
    },
    {
      type: "dialogue",
      character: "Ethan",
      dialogueType: "thought",
      text: "A lot of memories in here...",
    },
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
    {
      type: "narration",
      text: "You felt a bit drowsy so you made yourself some coffee",
    },
    {
      type: "dialogue",
      character: "Ethan",
      dialogueType: "thought",
      text: "Just what I needed",
    },
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
    {
      type: "narration",
      text: "You step outside into the rain. The cold air hits your face.",
    },
    {
      type: "dialogue",
      character: "Ethan",
      dialogueType: "thought",
      text: "It's colder than I expected.",
    },
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