export type Gender = "m" | "f";

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

export type EventLike = {
    id?: number;
    number: number;
    letter: string;
    distance: number;
    stroke: string | Stroke;
    gender: Gender;
    ageGroup?: AgeGroup | { minAge: number; maxAge: number };
    minAge?: number;
    maxAge?: number;
};

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
    }: EventLike) {
        if (!Number.isInteger(distance)) {
            throw new Error(`Invalid distance value: "${distance}"`);
        }
        if (gender != "m" && gender != "f") {
            throw new Error(`Invalid gender value: "${gender}"`);
        }
        if (id) this.id = id;
        this.number = number;
        this.letter = letter;
        this.distance = distance;
        this.stroke = new Stroke(stroke);
        this.gender = gender;
        this.ageGroup = new AgeGroup(minAge ?? agMinAge, maxAge ?? agMaxAge);
    }

    toString() {
        return `${this.ageGroup} ${this.gender == "f" ? "Girls" : "Boys"} ${
            this.distance
        } ${this.stroke.common}`;
    }
}

export type SwimmerLike = {
    id?: number;
    firstName: string;
    prefName?: string;
    middleName: string;
    lastName: string;
    birthday: Date;
    gender: Gender;
    teamId?: number;
};

export class Swimmer {
    id: number;
    firstName: string;
    prefName: string;
    middleName: string;
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
        }: SwimmerLike,
        ageDate?: Date
    ) {
        this.firstName = firstName;
        this.prefName = prefName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.birthday = new Date(birthday);
        this.gender = gender;
        if (id) this.id = id;
        if (ageDate) this.age = this.ageOn(ageDate);
        else this.age = this.ageOn(new Date());
    }

    toString() {
        return `${this.prefName ? this.prefName : this.firstName} ${
            this.lastName
        }`;
    }

    ageOn(date: Date) {
        const dif = new Date(date).getTime() - this.birthday.getTime();
        return Math.abs(new Date(dif).getUTCFullYear() - 1970);
    }
}

export type TeamLike = {
    id?: number;
    name: string;
    code: string;
    lsc: string;
};

export class Team {
    id: number;
    name: string;
    code: string;
    lsc: string;

    constructor({ id, name, code, lsc }: TeamLike) {
        this.name = name;
        this.code = code;
        this.lsc = lsc;
        if (id) this.id = id;
    }
}

export class Meet {
    id: number;
    name: string;
    class: string;
    idFormat: string;
    startDate: Date;
    endDate: Date;
    facility: Facility;
    swimmers?: Swimmer[];
    teams?: Team[];
}

export class Facility {
    id: number;
    name: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
}
