import { describe, test, expect } from "vitest";
import { AgeGroup, Event } from "../src/swims";

describe("AgeGroup.toString()", () => {
    test("10 & Under", () => {
        expect(new AgeGroup(0, 10).toString()).toBe("10 & Under");
    });

    test("11-12", () => {
        expect(new AgeGroup(11, 12).toString()).toBe("11-12");
    });

    test("15 & Over", () => {
        expect(new AgeGroup(15, 200).toString()).toBe("15 & Over");
    });

    test("Open", () => {
        expect(new AgeGroup(0, 100).toString()).toBe("Open");
    });
});

describe("Event.toString()", () => {
    test("Boys 10 & Under 100 Free", () => {
        expect(
            new Event({
                number: 1,
                letter: "",
                distance: 100,
                stroke: "Free",
                gender: "m",
                minAge: 0,
                maxAge: 10,
                isRelay: false,
            }).toString()
        ).toBe("Boys 10 & Under 100 Free");
    });

    test("Girls 11-12 200 IM", () => {
        expect(
            new Event({
                number: 2,
                letter: "",
                distance: 200,
                stroke: "IM",
                gender: "f",
                minAge: 11,
                maxAge: 12,
                isRelay: false,
            }).toString()
        ).toBe("Girls 11-12 200 IM");
    });

    test("Girls 11-12 200 Medley Relay", () => {
        expect(
            new Event({
                number: 2,
                letter: "",
                distance: 200,
                stroke: "MD",
                gender: "f",
                minAge: 11,
                maxAge: 12,
                isRelay: true,
            }).toString()
        ).toBe("Girls 11-12 200 Medley Relay");
    });

    test("Invalid stroke identifier", () => {
        expect(() =>
            new Event({
                number: 2,
                letter: "",
                distance: 200,
                stroke: "ID",
                gender: "f",
                minAge: 11,
                maxAge: 12,
                isRelay: true,
            }).toString()
        ).toThrowError("'ID' is not a valid stroke identifier.");
    });

    test("Relay marked as IM", () => {
        expect(() =>
            new Event({
                number: 2,
                letter: "",
                distance: 200,
                stroke: "IM",
                gender: "f",
                minAge: 11,
                maxAge: 12,
                isRelay: true,
            }).toString()
        ).toThrowError(
            "'IM' is not a valid stroke identifier for an event marked as a RELAY event."
        );
    });

    test("Boys 15 & Over 100 Breast", () => {
        expect(
            new Event({
                number: 3,
                letter: "",
                distance: 100,
                stroke: "Breast",
                gender: "m",
                minAge: 15,
                maxAge: 100,
                isRelay: false,
            }).toString()
        ).toBe("Boys 15 & Over 100 Breast");
    });

    test("Mixed 15 & Over 1650 Free", () => {
        expect(
            new Event({
                number: 3,
                letter: "",
                distance: 1650,
                stroke: "Fr",
                gender: "x",
                minAge: 15,
                maxAge: 100,
                isRelay: false,
            }).toString()
        ).toBe("Mixed 15 & Over 1650 Free");
    });

    test("Boys 15o 1650 Free", () => {
        expect(
            new Event({
                number: 3,
                letter: "",
                distance: 1650,
                stroke: "Fr",
                gender: "m",
                minAge: 15,
                maxAge: 100,
                isRelay: false,
            }).toString({ ageGroup: "abbr" })
        ).toBe("Boys 15o 1650 Free");
    });

    test("Girls 10u 100 Backstroke", () => {
        expect(
            new Event({
                number: 3,
                letter: "",
                distance: 100,
                stroke: "bk",
                gender: "f",
                minAge: 0,
                maxAge: 10,
                isRelay: false,
            }).toString({ ageGroup: "abbr", stroke: "full" })
        ).toBe("Girls 10u 100 Backstroke");
    });
});

describe("Event constructor", () => {
    test("minAge/maxAge parameter", () => {
        const event = {
            number: 1,
            letter: "",
            distance: 100,
            stroke: "Free",
            gender: "m",
            minAge: 0,
            maxAge: 12,
            isRelay: false,
        };
        expect(new Event(event).ageGroup).toEqual(new AgeGroup(0, 12));
    });

    test("ageGroup parameter simple object", () => {
        const event = {
            number: 1,
            letter: "",
            distance: 100,
            stroke: "Free",
            gender: "m",
            minAge: 0,
            maxAge: 12,
            isRelay: false,
        };
        expect(new Event(event).ageGroup).toEqual(new AgeGroup(0, 12));
    });
});
