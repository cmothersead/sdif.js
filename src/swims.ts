export type Gender = "m" | "f";

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
    stroke: string;
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
        this.stroke = stroke;
        this.gender = gender;
        this.ageGroup = new AgeGroup(minAge, maxAge);
    }

    toString() {
        return `${this.ageGroup} ${this.gender == "f" ? "Girls" : "Boys"} ${
            this.distance
        } ${this.stroke}`;
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

    constructor(
        firstName: string,
        prefName: string,
        middleName: string,
        lastName: string,
        birthday: Date,
        gender: Gender,
        id?: number
    ) {
        this.firstName = firstName;
        this.prefName = prefName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.gender = gender;
        if (id) this.id = id;
    }

    toString() {
        return `${this.prefName ? this.prefName : this.firstName} ${
            this.lastName
        }`;
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
