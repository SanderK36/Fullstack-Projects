export type Player = {
    name: string;

    courage: number;
    intelligence: number;
    charisma: number;
    athletics: number;
    strength: number;

    health: number;
    maxHealth: number;
    stamina: number;
    maxStamina: number;

    fear: number;

    money: number;

    inventory: string[];
};

export type GameState = {
    dayNumber: number;
    dayOfWeek: DayOfWeek;
    currentMonth: Month;
    time: number;
    location: Location;
    weather: Weather;


}

export type DayOfWeek =
"Monday" |
"Tuesday" |
"Wednesday" |
"Thursday" |
"Friday" |
"Saturday" |
"Sunday";

export type Location =
"Home" |
"Vinyl Shop" |
"Corner store" |
"Bar" |
"Park" |
"Police Station" |
"Hospital";

export type Weather =
"Sunny" |
"Rainy" |
"Cloudy" |
"Thunderstorm" |
"Heavy rain";

export type Month =
"January" |
"February" |
"March" |
"April" |
"May" |
"June" |
"July" |
"August" |
"September" |
"October" |
"November" |
"December"
