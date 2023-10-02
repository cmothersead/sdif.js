export class Time {
  minutes: number;
  seconds: number;
  hundredths: number;
  isNegative: boolean = false;

  constructor(value: number | string) {
    if (typeof value === "number") {
      if (!Number.isSafeInteger(value)) {
        value *= 100;
        value = Math.round(value);
      }

      if (value < 0) {
        this.isNegative = true;
        value *= -1;
      }

      this.minutes = Math.floor(value / 6000);
      this.seconds = Math.floor((value % 6000) / 100);
      this.hundredths = value % 100;
    } else if (typeof value === "string") {
      let match = value.match(this.regex());

      if (match === null) {
        if (value === "NT" || parseInt(value) === 0) {
          this.minutes = 0;
          this.seconds = 0;
          this.hundredths = 0;
          return;
        } else {
          throw new TypeError(
            `Invalid value provided to Time object: ${value}`
          );
        }
      }

      let negative = match.groups?.negative;
      if (negative === "-") {
        this.isNegative = true;
      }

      let minutes = match.groups?.minutes;
      if (minutes === undefined || minutes === "") {
        this.minutes = 0;
      } else {
        this.minutes = parseInt(minutes);
      }

      let seconds = match.groups?.seconds;
      if (seconds === undefined || seconds === "") {
        this.seconds = 0;
      } else {
        this.seconds = parseInt(seconds);
      }

      let hundredths = match.groups?.hundredths;
      if (hundredths === undefined || hundredths === "") {
        this.hundredths = 0;
      } else if (hundredths.length === 1) {
        this.hundredths = parseInt(hundredths) * 10;
      } else {
        this.hundredths = parseInt(hundredths);
      }
    } else {
      throw new TypeError(
        `Invalid value provided to Time object: ${value}`
      );
    }

  }

  regex() {
    return /^(?<negative>-)?(?<minutes>\d*(?=:|\d{2}\.|\d{2}$))?:?(?<seconds>\d{1,2})[\.:]?(?<hundredths>\d{1,2})?$/;
  }

  value() {
    return this.minutes * 6000 + this.seconds * 100 + this.hundredths;
  }

  sortValue() {
    if (this.value === undefined || this?.value() === 0) {
      return Number.MAX_SAFE_INTEGER;
    }
    return this.value();
  }

  toString() {
    if (this?.value === undefined || this.value() === 0) {
      return "NT";
    } else {
      const minutes = this.minutes > 0 ? `${this.minutes}:` : "";
      const seconds =
        minutes != ""
          ? String(this.seconds).padStart(2, "0")
          : String(this.seconds);
      return `${this.isNegative ? "-" : ""}${minutes}${seconds}.${String(
        this.hundredths
      ).padStart(2, "0")}`;
    }
  }
}

export class Score {
  value: number;

  constructor(value: number | string) {
    if (typeof value === 'number') {

      if (!Number.isSafeInteger(value)) {
        value *= 100;
        value = Math.round(value);
      }

      this.value = value;
    } else if (typeof value === 'string') {
      const match = value.match(this.regex());

      if (match === null) {
        if (parseInt(value) === 0) {
          this.value = 0;
          return;
        } else {
          throw new TypeError(`Invalid value provided to Score object: ${value}`);
        }
      }

      let whole = match.groups?.whole;
      if (whole === undefined || whole === "") {
        this.value = 0;
      } else {
        this.value = parseInt(whole);
      }

      let hundredths = match.groups?.hundredths;
      if (hundredths === undefined || hundredths === "") {
        return;
      } else if (hundredths.length === 1) {
        this.value += parseInt(hundredths) * 10;
      } else {
        this.value += parseInt(hundredths);
      }

    } else {
      throw new TypeError(`Invalid value provided to Score object: ${value}`);
    }
  }

  regex() {
    return /^(?<whole>\d{2,3})[\.]?(?<hundredths>\d{1,2})?$/;
  }

  toString() {
    if (this.value === undefined || this.value === 0) {
      return "NS"
    } else {
      `${this.value.toString().slice(0, -2)}.${this.value.toString().slice(-2)}`
    }
  }
}
