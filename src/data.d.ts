import { AgeGroup, Stroke } from "./swims";

export type Gender = "m" | "f";
export type CourseChar = "y" | "s" | "m";

export type MeetData = {
    id: number;
    host: number;
    name: string;
    startDate: string | Date;
    endDate: string | Date;
    course: string | CourseChar;

    facility?: number;
    sessions?: number[];
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

export type SessionData = {
    id: number;
    meet: number;
    name: string;
    startTime: string | Date;

    events?: number[];
};

export type EventData = {
    id?: number;
    number: number;
    letter?: string;
    distance: number;
    stroke: string | Stroke;
    gender: string | Gender;
    ageGroup?: AgeGroup | { minAge: number; maxAge: number };
    minAge?: number;
    maxAge?: number;
};

export type SwimmerData = {
    id: number;
    firstName: string;
    prefName?: string;
    middleName?: string;
    lastName: string;
    gender: Gender;
    birthday: string | Date;
    memberships?: MembershipData[];
};

export type MembershipData = {
    id: number;
    startDate: Date;
    endDate?: Date;

    team: number;
    swimmer: number;
};

export type TeamData = {
    id?: number;
    name: string;
    code: string;
    lsc: string;
};

export type EntryData = {
    id: number;

    swimmer: number;
    event: number;
    seeds: number[];
};

export type SeedData = {
    id: number;
    round: string;
    time: number;
    heat: number;
    lane: number;

    entry: number;
    result: number;
};

export type ResultData = {
    id: number;
    round: string;
    time: number;
    place: number;
    points: number;
    improvement: number;
    dq: boolean;

    event: number;
    seed: number;
};
