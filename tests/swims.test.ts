import { AgeGroup, Event } from "../src/swims";

describe("Test AgeGroup.toString()", () => {
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

describe("Test Event.toString()", () => {
    test("10 & Under Boys 100 Free", () => {
        expect(new Event(1, "", 100, "Free", "m", 0, 10).toString()).toBe(
            "10 & Under Boys 100 Free"
        );
    });

    test("11-12 Girls 200 IM", () => {
        expect(new Event(2, "", 200, "IM", "f", 11, 12).toString()).toBe(
            "11-12 Girls 200 IM"
        );
    });

    test("15 & Over Boys 100 Breast", () => {
        expect(new Event(3, "", 100, "Breast", "m", 15, 100).toString()).toBe(
            "15 & Over Boys 100 Breast"
        );
    });
});
