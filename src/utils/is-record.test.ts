import { isEmptyRecord, isRecord } from "./is-record";

describe("isRecord", () => {
  it("returns false for string", () => {
    expect(isRecord("")).toBe(false);
  });

  it("returns false for null", () => {
    expect(isRecord(null)).toBe(false);
  });

  it("returns false for an array", () => {
    expect(isRecord(["a"])).toBe(false);
  });

  it("returns false for a Date", () => {
    expect(isRecord(new Date())).toBe(false);
  });

  it("returns true for a record", () => {
    expect(isRecord({ bar: "foo" })).toBe(true);
  });

  it("returns true for an empty record", () => {
    expect(isRecord({})).toBe(true);
  });
});

describe("isEmptyRecord", () => {
  it("returns true for an empty record", () => {
    expect(isEmptyRecord({})).toBe(true);
  });

  it("returns false for a non-empty record", () => {
    expect(isEmptyRecord({ foo: "bar" })).toBe(false);
  });

  it("returns false for a non record object", () => {
    const values = ["", ["a"], new Date()];
    for (const value of values) {
      expect(isEmptyRecord(value)).toBe(false);
    }
  });
});
