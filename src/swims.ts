import {
    EntryData,
    EventData,
    FacilityData,
    GenderChar,
    MeetData,
    ResultData,
    RoundData,
    RoundTypeChar,
    SessionData,
    SwimmerData,
    TeamData,
} from "./data";
import { Time } from "./time.js";

const STROKES = {
    BK: {
        individual: {
            abbr: "BK",
            common: "Back",
            full: "Backstroke",
        },
        relay: {
            abbr: "BK-R",
            common: "Back Relay",
            full: "Backstroke Relay",
        },
    },
    BR: {
        individual: {
            abbr: "BR",
            common: "Breast",
            full: "Breaststroke",
        },
        relay: {
            abbr: "BR-R",
            common: "Breast Relay",
            full: "Breaststroke Relay",
        },
    },
    FL: {
        individual: {
            abbr: "FL",
            common: "Fly",
            full: "Butterfly",
        },
        relay: {
            abbr: "FL-R",
            common: "Fly Relay",
            full: "Butterfly Relay",
        },
    },
    FR: {
        individual: {
            abbr: "FR",
            common: "Free",
            full: "Freestyle",
        },
        relay: {
            abbr: "FR-R",
            common: "Free Relay",
            full: "Freestyle Relay",
        },
    },
    MD: {
        individual: {
            abbr: "IM",
            common: "IM",
            full: "Individual Medley",
        },
        relay: {
            abbr: "MD-R",
            common: "Medley Relay",
            full: "Medley Relay",
        },
    },
} as const;
export type StrokeOptions =
    keyof (typeof STROKES)[keyof typeof STROKES][keyof (typeof STROKES)[keyof typeof STROKES]];

export class Stroke {
    abbr: string;
    common: string;
    full: string;

    constructor(value: string | Stroke, isRelay?: boolean) {
        if (typeof value === "string") {
            const found = Object.hasOwn(STROKES, value.toUpperCase())
                ? STROKES[value.toUpperCase()][isRelay ? "relay" : "individual"]
                : Object.values(STROKES).find((item) =>
                      Object.values(
                          isRelay ? item.relay : item.individual
                      ).some(
                          (subItem) =>
                              subItem.toUpperCase() === value.toUpperCase()
                      )
                  )?.[isRelay ? "relay" : "individual"];

            if (found === undefined) {
                if (
                    Object.values(STROKES).find((item) =>
                        Object.values(
                            isRelay ? item.individual : item.relay
                        ).some(
                            (subItem) =>
                                subItem.toUpperCase() === value.toUpperCase()
                        )
                    )
                ) {
                    throw new TypeError(
                        `'${value}' is not a valid stroke identifier for an event marked as a${
                            isRelay ? "" : "n"
                        } ${isRelay ? "RELAY" : "INDIVIDUAL"} event.`
                    );
                }

                throw new TypeError(
                    `'${value}' is not a valid stroke identifier.`
                );
            }

            this.abbr = found.abbr;
            this.common = found.common;
            this.full = found.full;
        } else {
            this.abbr =
                STROKES[value.abbr][isRelay ? "relay" : "individual"].abbr;
            this.common =
                STROKES[value.abbr][isRelay ? "relay" : "individual"].common;
            this.full =
                STROKES[value.abbr][isRelay ? "relay" : "individual"].full;
        }
    }

    toString(options?: StrokeOptions) {
        return this[options ?? "common"];
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

export type AgeGroupOptions = "abbr" | "full";

export class AgeGroup {
    static MIN = 0;
    static MAX = 100;
    minAge: number;
    maxAge: number;

    constructor(minAge: number, maxAge: number) {
        this.minAge = minAge;
        this.maxAge = maxAge;
    }

    toString(options?: AgeGroupOptions) {
        if (options === "abbr") {
            return this.abbr();
        } else if (this.minAge > AgeGroup.MIN && this.maxAge < AgeGroup.MAX) {
            return `${this.minAge}-${this.maxAge}`;
        } else if (this.minAge <= AgeGroup.MIN && this.maxAge < AgeGroup.MAX) {
            return `${this.maxAge} & Under`;
        } else if (this.minAge > AgeGroup.MIN && this.maxAge >= AgeGroup.MAX) {
            return `${this.minAge} & Over`;
        } else {
            return `Open`;
        }
    }

    abbr() {
        if (this.minAge > AgeGroup.MIN && this.maxAge < AgeGroup.MAX) {
            return `${this.minAge}-${this.maxAge}`;
        } else if (this.minAge <= AgeGroup.MIN && this.maxAge < AgeGroup.MAX) {
            return `${this.maxAge}u`;
        } else if (this.minAge > AgeGroup.MIN && this.maxAge >= AgeGroup.MAX) {
            return `${this.minAge}o`;
        } else {
            return `Open`;
        }
    }
}

const GENDERS = {
    m: {
        char: "m",
        mf: "Male",
        mw: "Mens",
        bg: "Boys",
    },
    f: {
        char: "f",
        mf: "Female",
        mw: "Womens",
        bg: "Girls",
    },
    x: {
        char: "x",
        mf: "Mixed",
        mw: "Mixed",
        bg: "Mixed",
    },
} as const;
export type GenderOptions = keyof (typeof GENDERS)[keyof typeof GENDERS];

export class Gender {
    char: keyof typeof GENDERS;
    mf: (typeof GENDERS)[keyof typeof GENDERS]["mf"];
    mw: (typeof GENDERS)[keyof typeof GENDERS]["mw"];
    bg: (typeof GENDERS)[keyof typeof GENDERS]["bg"];

    constructor(value: keyof typeof GENDERS) {
        this.char = value;
        this.mf = GENDERS[value].mf;
        this.mw = GENDERS[value].mw;
        this.bg = GENDERS[value].bg;
    }

    toString(options?: GenderOptions) {
        return this[options ?? "bg"];
    }
}

export class Event {
    id?: number;
    number: number;
    letter?: string;
    distance: number;
    stroke: Stroke;
    gender: Gender;
    ageGroup: AgeGroup;
    isRelay: boolean;

    constructor({
        id,
        number,
        letter,
        distance,
        stroke,
        gender,
        minAge,
        maxAge,
        isRelay,
    }: EventData) {
        if (!Number.isInteger(distance)) {
            throw new Error(
                `Invalid distance value: "${distance}" for event: ${number}${letter}`
            );
        }
        const genders = ["m", "f", "x"] as const;
        if (!genders.some((val) => gender.toLowerCase() === val)) {
            throw new Error(`Invalid gender value: "${gender}"`);
        }
        if (Number.isInteger(id)) this.id = id;
        this.number = number;
        this.letter = letter;
        this.distance = distance;
        this.stroke = new Stroke(stroke, isRelay);
        this.gender = new Gender(gender);
        this.ageGroup = new AgeGroup(minAge, maxAge);
        this.isRelay = isRelay;
    }

    toString(options?: {
        gender?: GenderOptions;
        ageGroup?: "abbr" | "full";
        stroke?: StrokeOptions;
    }) {
        return `${this.gender.toString(
            options?.gender
        )} ${this.ageGroup.toString(options?.ageGroup)} ${
            this.distance
        } ${this.stroke.toString(options?.stroke)}`;
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
    gender: GenderChar;
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

export class Round {
    id: number;
    type: RoundTypeChar;
    startTime: Date;

    event: Event;
    session: Session;

    constructor(
        { id, type, startTime }: RoundData,
        event: Event,
        session: Session
    ) {
        this.id = id;
        this.type = type;
        this.startTime = new Date(startTime);
        this.event = event;
        this.session = session;
    }
}

export class Entry {
    id: number;
    swimmer: Swimmer;
    round: Round;
    time: Time;

    constructor({ id, time }: EntryData, swimmer: Swimmer, round: Round) {
        this.id = id;
        this.swimmer = swimmer;
        this.round = round;
        this.time = new Time(time);
    }
}

export class Result {
    id: number;
    event: Event;
    entry: Entry;
    swimmer: Swimmer;
    round: RoundTypeChar;
    time: Time;
    improvement: Time;
    place: number;
    points: number;
    dq: boolean;

    constructor(
        { id, time, place, points, dq }: ResultData,
        swimmer: Swimmer,
        event: Event,
        entry: Entry
    ) {
        this.id = id;
        this.event = event;
        this.entry = entry;
        this.swimmer = swimmer;
        this.time = new Time(time);
        this.improvement = new Time(time - entry.time.value());
        this.place = place;
        this.points = points;
        this.dq = dq;
        this.round = entry.round.type;
    }
}
