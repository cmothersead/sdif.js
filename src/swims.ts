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

    constructor(value: string) {
        const found = Object.values(STROKES).find((item) => {
            return Object.values(item).some(
                (subItem) => subItem.toUpperCase() === value.toUpperCase()
            );
        });

        if (found === undefined)
            throw new TypeError(`'${value}' is not a valid stroke identifier.`);

        this.abbr = found.abbr;
        this.common = found.common;
        this.full = found.full;
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
}

export class Event {
    id: number;
    number: number;
    letter: string;
    distance: number;
    stroke: Stroke;
    gender: Gender;
    ageGroup: AgeGroup;

    constructor(
        number: number,
        letter: string,
        distance: number,
        stroke: string,
        gender: Gender,
        minAge: number,
        maxAge: number,
        id?: number
    ) {
        if (!Number.isInteger(distance)) {
            throw new Error(`Invalid distance value: "${distance}"`);
        }
        if (gender != "m" && gender != "f") {
            throw new Error(`Invalid gender value: "${gender}"`);
        }
        this.number = number;
        this.letter = letter;
        this.distance = distance;
        this.stroke = new Stroke(stroke);
        this.gender = gender;
        this.ageGroup = new AgeGroup(minAge, maxAge);
    }

    toString() {
        return `${this.ageGroup} ${this.gender == "f" ? "Girls" : "Boys"} ${
            this.distance
        } ${this.stroke.common}`;
    }
}

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
        firstName: string,
        prefName: string,
        middleName: string,
        lastName: string,
        birthday: Date,
        gender: Gender,
        id?: number,
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

export class Team {
    id: number;
    name: string;
    code: string;
    lsc: string;

    constructor(name: string, code: string, lsc: string, id?: number) {
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
