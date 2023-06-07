import {
    EntryData,
    EventData,
    FacilityData,
    Gender,
    MeetData,
    ResultData,
    SeedData,
    SessionData,
    SwimmerData,
    TeamData,
} from "./data";
import { Time } from "./time";

const STROKES: {
    [key: string]: { abbr: string; common: string; full: string };
} = {
    BK: {
        abbr: "BK",
        common: "Back",
        full: "Backstroke",
    },
    BR: {
        abbr: "BR",
        common: "Breast",
        full: "Breaststroke",
    },
    FL: {
        abbr: "FL",
        common: "Fly",
        full: "Butterfly",
    },
    FR: {
        abbr: "FR",
        common: "Free",
        full: "Freestyle",
    },
    IM: {
        abbr: "IM",
        common: "IM",
        full: "Individual Medley",
    },
};

export class Stroke {
    abbr: string;
    common: string;
    full: string;

    constructor(value: string | Stroke) {
        if (typeof value === "string") {
            const found = Object.values(STROKES).find((item) => {
                return Object.values(item).some(
                    (subItem) => subItem.toUpperCase() === value.toUpperCase()
                );
            });

            if (found === undefined)
                throw new TypeError(
                    `'${value}' is not a valid stroke identifier.`
                );

            this.abbr = found.abbr;
            this.common = found.common;
            this.full = found.full;
        } else {
            this.abbr = STROKES[value.abbr].abbr;
            this.common = STROKES[value.abbr].common;
            this.full = STROKES[value.abbr].full;
        }
    }

    toString() {
        return this.common;
    }
}

const COURSES = {
    Y: {
        char: "Y",
        common: "SCY",
        full: "Short Course Yards",
    },
    S: {
        char: "S",
        common: "SCM",
        full: "Short Course Meters",
    },
    L: {
        char: "L",
        common: "LCM",
        full: "Long Course Meters",
    },
};

export class Course {
    char: string;
    common: string;
    full: string;

    constructor(value: string | Course) {
        if (typeof value === "string") {
            const found = Object.values(COURSES).find((item) => {
                return Object.values(item).some(
                    (subItem) => subItem.toUpperCase() === value.toUpperCase()
                );
            });

            if (found === undefined)
                throw new TypeError(
                    `'${value}' is not a valid stroke identifier.`
                );

            this.char = found.char;
            this.common = found.common;
            this.full = found.full;
        } else {
            this.char = STROKES[value.char].abbr;
            this.common = STROKES[value.char].common;
            this.full = STROKES[value.char].full;
        }
    }

    toString() {
        return this.common;
    }
}

export class AgeGroup {
    minAge: number;
    maxAge: number;

    constructor(minAge: number, maxAge: number) {
        this.minAge = minAge;
        this.maxAge = maxAge;
    }

    toString() {
        if (this.minAge > 0 && this.maxAge < 100) {
            return `${this.minAge}-${this.maxAge}`;
        } else if (this.minAge <= 0 && this.maxAge < 100) {
            return `${this.maxAge} & Under`;
        } else if (this.minAge > 0 && this.maxAge >= 100) {
            return `${this.minAge} & Over`;
        } else {
            return `Open`;
        }
    }

    abbr() {
        if (this.minAge > 0 && this.maxAge < 100) {
            return `${this.minAge}-${this.maxAge}`;
        } else if (this.minAge <= 0 && this.maxAge < 100) {
            return `${this.maxAge}u`;
        } else if (this.minAge > 0 && this.maxAge >= 100) {
            return `${this.minAge}o`;
        } else {
            return ``;
        }
    }
}

export class Event {
    id: number;
    number: number;
    letter: string;
    distance: number;
    stroke: Stroke;
    gender: Gender;
    ageGroup: AgeGroup;

    constructor({
        id,
        number,
        letter,
        distance,
        stroke,
        gender,
        ageGroup: { minAge: agMinAge, maxAge: agMaxAge } = {
            minAge: undefined,
            maxAge: undefined,
        },
        minAge,
        maxAge,
    }: EventData) {
        if (!Number.isInteger(distance)) {
            throw new Error(`Invalid distance value: "${distance}"`);
        }
        if (gender != "m" && gender != "f") {
            throw new Error(`Invalid gender value: "${gender}"`);
        }
        if (Number.isInteger(id)) this.id = id;
        this.number = number;
        this.letter = letter;
        this.distance = distance;
        this.stroke = new Stroke(stroke);
        this.gender = gender;
        this.ageGroup = new AgeGroup(minAge ?? agMinAge, maxAge ?? agMaxAge);
    }

    toString() {
        return `${this.gender == "f" ? "Girls" : "Boys"} ${this.ageGroup} ${
            this.distance
        } ${this.stroke.common}`;
    }
}

export class Session {
    id: number;
    name: string;
    startTime: Date;

    meet: Meet;
    events: Event[];

    constructor(
        { id, name, startTime }: SessionData,
        events?: Event[],
        meet?: Meet
    ) {
        this.id = id;
        this.name = name;
        this.startTime = new Date(startTime);
        if (events) {
            this.events = events;
        } else {
            this.events = [];
        }
        if (meet) this.meet = meet;
    }
}

export class Swimmer {
    id: number;
    firstName: string;
    prefName?: string;
    middleName?: string;
    lastName: string;
    birthday: Date;
    gender: Gender;
    age: number;
    team: Team;

    constructor(
        {
            id,
            firstName,
            prefName,
            middleName,
            lastName,
            birthday,
            gender,
        }: SwimmerData,
        team?: Team,
        ageDate?: Date | string
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = new Date(birthday);
        this.gender = gender;
        if (prefName) this.prefName = prefName;
        if (middleName) this.middleName = middleName;
        if (Number.isSafeInteger(id)) this.id = id;
        if (team) this.team = team;
        if (ageDate) this.age = this.ageOn(ageDate);
        else this.age = this.ageOn(new Date());
    }

    toString() {
        return `${this.prefName ? this.prefName : this.firstName} ${
            this.lastName
        }`;
    }

    ageOn(date: Date | string) {
        const dif = new Date(date).getTime() - this.birthday.getTime();
        return Math.abs(new Date(dif).getUTCFullYear() - 1970);
    }
}

export class Team {
    id: number;
    name: string;
    code: string;
    lsc: string;
    swimmerCount?: number;

    constructor({ id, name, code, lsc }: TeamData) {
        this.name = name;
        this.code = code;
        this.lsc = lsc;
        if (Number.isSafeInteger(id)) this.id = id;
    }

    toString() {
        return `${this.code}-${this.lsc}`;
    }
}

export class Meet {
    id: number;
    name: string;
    class: string;
    idFormat: string;
    startDate: Date;
    endDate: Date;
    course: Course;

    host: Team;
    facility: Facility;
    swimmers?: Swimmer[];
    teams?: Team[];

    constructor(
        { id, name, startDate, endDate, course }: MeetData,
        host: Team,
        facility: Facility,
        swimmers?: Swimmer[],
        teams?: Team[]
    ) {
        this.id = id;
        this.name = name;
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
        this.course = new Course(course);

        this.host = host;
        this.facility = facility;
        this.swimmers = swimmers;
        this.teams = teams;
    }
}

export class Facility {
    id: number;
    name: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zipCode: string;

    constructor({
        id,
        name,
        address1,
        address2,
        city,
        state,
        zipCode,
    }: FacilityData) {
        this.id = id;
        this.name = name;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }
}

export class Entry {
    id: number;
    swimmer: Swimmer;
    event: Event;
    seeds: Seed[];

    constructor(
        { id }: EntryData,
        swimmer: Swimmer,
        event: Event,
        seeds?: Seed[]
    ) {
        this.id = id;
        this.swimmer = swimmer;
        this.event = event;
        if (seeds) this.seeds = seeds;
    }
}

export class Seed {
    id: number;
    event: Event;
    swimmer: Swimmer;
    round: string;
    time: Time;
    heat: number;
    lane: number;
    place: number;

    constructor(
        { id, round, time, heat, lane }: SeedData,
        entry: Entry,
        result?: Result
    ) {
        this.id = id;
        this.event = entry.event;
        this.swimmer = entry.swimmer;
        this.round = round;
        this.time = new Time(time);
        if (heat) this.heat = heat;
        if (lane) this.lane = lane;
        if (result) this.place = result.place;
    }
}

export class Result {
    id: number;
    event: Event;
    swimmer: Swimmer;
    seed: Seed;
    round: string;
    time: Time;
    improvement: Time;
    place: number;
    points: number;
    dq: boolean;

    constructor(
        { id, time, place, points, dq }: ResultData,
        swimmer: Swimmer,
        event: Event,
        seed: Seed
    ) {
        this.id = id;
        this.event = event;
        this.seed = seed;
        this.swimmer = swimmer;
        this.round = seed.round;
        this.time = new Time(time);
        this.improvement = new Time(time - seed.time.value());
        this.place = place;
        this.points = points;
        this.dq = dq;
    }
}
