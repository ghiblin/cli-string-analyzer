import { shuffle } from "./shuffle";

describe("shuffle", () => {
  it("returns an array with the same length", () => {
    const arrs = [["a", "b"], ["a", "b", "c"], []];
    for (const arr of arrs) {
      // We deep copy the current array before shuffling it
      expect(shuffle(JSON.parse(JSON.stringify(arr))).length).toBe(arr.length);
    }
  });

  it("returns all the elements of the orginal array", () => {
    const arr = new Array(20).fill(null).map((_, idx) => idx);
    const shuffled = shuffle(JSON.parse(JSON.stringify(arr)));
    for (const el of arr) {
      expect(shuffled.includes(el)).toBe(true);
    }
  });

  it("shuffle the array", () => {
    const arr = new Array(20).fill(null).map((_, idx) => idx);
    // Note: there is a very small probability this test may fail
    expect(shuffle(JSON.parse(JSON.stringify(arr)))).not.toEqual(arr);
  });
});
