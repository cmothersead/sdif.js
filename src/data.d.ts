import { Stroke } from "./swims";

export type Gender = "m" | "f";
export type CourseChar = "y" | "s" | "m";
export type RoundTypeChar = "p" | "s" | "f" | "o" | "t";

export type MeetData = {
    id: number;
    host: number;
    facility: number;
    name: string;
    startDate: string | Date;
    endDate: string | Date;
    course: string | CourseChar;
};

export type FacilityData = {
    id: number;
    name: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zipCode: string;
};

export type SwimmerData = {
    id: number;
    firstName: string;
    prefName?: string;
    middleName?: string;
    lastName: string;
    gender: Gender;
    birthday: string | Date;
};

export type MembershipData = {
    id: number;
    startDate: Date;
    endDate?: Date;
    team: number;
    swimmer: number;
};

export type TeamData = {
    id: number;
    name: string;
    code: string;
    lsc: string;
};

export type SessionData = {
    id: number;
    meet: number;
    name: string;
    startTime: string | Date;
};

export type EventData = {
    id: number;
    number: number;
    letter?: string;
    distance: number;
    stroke: string | Stroke;
    gender: string | Gender;
    minAge: number;
    maxAge: number;
};

export type RoundData = {
    id: number;
    event: number;
    session: number;
    type: RoundTypeChar;
    startTime?: string | Date;
};

export type EntryData = {
    id: number;
    swimmer: number;
    round: number;
    time: number;

    heat?: number;
    lane?: number;
};

export type ResultData = {
    id: number;
    entry: number;
    time: number;
    place: number;
    points: number;

    improvement?: number;
    dq?: boolean;
};
