import { Command } from "./command";
import { TotalLettersCommand } from "./total-letters.command";

describe("TotalLettersCommand", () => {
  let command: Command;
  beforeEach(() => {
    command = new TotalLettersCommand();
  });

  it("returns the total letters in the string", () => {
    const inputs = [
      {
        input: "hello world",
        count: 10,
      },
      {
        input: "Lorem ipsum dolor sit amet",
        count: 22,
      },
    ];
    for (let { input, count } of inputs) {
      expect(command.execute(input)["letter"]).toBe(count);
    }
  });

  it("ignores any punctuation", () => {
    const inputs = [
      {
        input: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        count: 47,
      },
      {
        input: `
      this is a
      multiline
      string!!
      `,
        count: 22,
      },
    ];
    for (let { input, count } of inputs) {
      expect(command.execute(input)["letter"]).toBe(count);
    }
  });

  it("handles empty string", () => {
    expect(command.execute("")["letter"]).toBe(0);
  });

  it("handles not string", () => {
    // Note: typescript prevent us from passing a non-string object
    // but that doesn't mean we can cast to anything else or that
    // may happen with javascript
    expect(command.execute(null as unknown as string)).toStrictEqual({});
  });
});
