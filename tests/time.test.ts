import Time from "../src/time";

describe("Test Time valid input", () => {
    const expectedMinutes = [0, 1, 2, 20, 59];
    const expectedSeconds = [29, 0, 12, 59, 59];
    const expectedHundredths = [37, 21, 0, 59, 99];
    const intInput = [2937, 6021, 13200, 125959, 359999];
    const strInput = ["29.37", "1:00.21", "2:12.00", "20:59.59", "59:59.99"];
    const floatInput = [29.37, 60.207, 132.001, 1259.593, 3599.99];

    test("Minutes int initialization is valid", () => {
        expect(intInput.map((val) => new Time(val).minutes)).toEqual(
            expectedMinutes
        );
    });

    test("Seconds int initialization is valid", () => {
        expect(intInput.map((val) => new Time(val).seconds)).toEqual(
            expectedSeconds
        );
    });

    test("Hundredths int initialization is valid", () => {
        expect(intInput.map((val) => new Time(val).hundredths)).toEqual(
            expectedHundredths
        );
    });

    test("Minutes string initialization is valid", () => {
        expect(strInput.map((val) => new Time(val).minutes)).toEqual(
            expectedMinutes
        );
    });

    test("Seconds string initialization is valid", () => {
        expect(strInput.map((val) => new Time(val).seconds)).toEqual(
            expectedSeconds
        );
    });

    test("Hundredths string initialization is valid", () => {
        expect(strInput.map((val) => new Time(val).hundredths)).toEqual(
            expectedHundredths
        );
    });

    test("Minutes float initialization is valid", () => {
        expect(floatInput.map((val) => new Time(val).minutes)).toEqual(
            expectedMinutes
        );
    });

    test("Seconds float initialization is valid", () => {
        expect(floatInput.map((val) => new Time(val).seconds)).toEqual(
            expectedSeconds
        );
    });

    test("Hundredths float initialization is valid", () => {
        expect(floatInput.map((val) => new Time(val).hundredths)).toEqual(
            expectedHundredths
        );
    });
});

describe("Test Time semi-valid input", () => {
    test("No semicolon", () => {
        let time = new Time("100.67");
        expect(time.minutes).toBe(1);
        expect(time.seconds).toBe(0);
        expect(time.hundredths).toBe(67);
    });

    test("No dot", () => {
        let time = new Time("2:4345");
        expect(time.minutes).toBe(2);
        expect(time.seconds).toBe(43);
        expect(time.hundredths).toBe(45);
    });

    test("Shorthand hundredths", () => {
        let time = new Time("30.6");
        expect(time.minutes).toBe(0);
        expect(time.seconds).toBe(30);
        expect(time.hundredths).toBe(60);
    });

    test("No hundredths", () => {
        let time = new Time("22");
        expect(time.minutes).toBe(0);
        expect(time.seconds).toBe(22);
        expect(time.hundredths).toBe(0);
    });

    test("Semicolon instead of dot", () => {
        let time = new Time("1:03:65");
        expect(time.minutes).toBe(1);
        expect(time.seconds).toBe(3);
        expect(time.hundredths).toBe(65);
    });
});

describe("Test Time invalid input", () => {
    test("Not enough digits", () => {
        expect(() => {
            new Time("3:3");
        }).toThrowError(TypeError);
    });

    test("Too many digits after dot", () => {
        expect(() => {
            new Time("1:22.123");
        }).toThrowError(TypeError);
    });

    test("Too many digits between semicolon and dot", () => {
        expect(() => {
            new Time("1:222.00");
        }).toThrowError(TypeError);
    });

    test("Extra dot", () => {
        expect(() => {
            new Time("1.22.00");
        }).toThrowError(TypeError);
    });
});

describe("Test Time toString()", () => {
    const expected = ["30.60", "1:00.00", "2:15.11", "NT", "NT"];
    const intInput = [3060, 6000, 13511, 0, 0];
    const stringInput = ["30.6", "100", "2:15.11", "0", "NT"];
    const floatInput = [30.6, 60.001, 135.111, 0.0, 0];

    test("Int input toString()", () => {
        expect(intInput.map((val) => new Time(val).toString())).toEqual(
            expected
        );
    });

    test("String input toString()", () => {
        expect(stringInput.map((val) => new Time(val).toString())).toEqual(
            expected
        );
    });

    test("Float input toString()", () => {
        expect(floatInput.map((val) => new Time(val).toString())).toEqual(
            expected
        );
    });
});
