import type { Location } from "./types";
import type { Choice } from "./choices";

export type Scene = {
  id: string;
  text: string;
  location: Location;
  image: {day: string; night: string;}
  choices: Choice[];
};

export const morningAtHome: Scene = {
  id: "morning-at-home",
  text: "The rain taps softly against the windows.",
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
  text: "You look around the house. Everything seems normal.",
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
  text: "The coffee is hot. You stand by the kitchen window and watch the rain." ,
  choices: [],
  location: "Home",
  image: {day: "./images/locations/home/homeHallway.jpg", night:"./images/locations/home/homeHallway.jpg"},
};

export const leftHouse: Scene = {
  id: "left-house",
  text: "You step outside into the rain. The cold air hits your face.",
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