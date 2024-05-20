import { count } from "console";
import { Command } from "./command";
import { TotalSpacesCommand } from "./total-spaces.command";

describe("TotalSpacesCommand", () => {
  let command: Command;
  beforeEach(() => {
    command = new TotalSpacesCommand();
  });

  it("returns the total spaces in the string", () => {
    const inputs = [
      {
        input: "hello world",
        count: 1,
      },
      {
        input: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        count: 7,
      },
    ];
    for (let { input, count } of inputs) {
      expect(command.execute(input)[" "]).toBe(count);
    }
  });

  it("handles multiline string", () => {
    const inputs = [
      {
        input: `hello\nworld`,
        count: 0,
      },
      {
        input: `
      this is a
      multiline
      string!!
      `,
        count: 26,
      },
    ];
    for (let { input, count } of inputs) {
      expect(command.execute(input)[" "]).toBe(count);
    }
  });

  it("handles empty string", () => {
    expect(command.execute("")[" "]).toBe(0);
  });

  it("handles not string", () => {
    // Note: typescript prevent us from passing a non-string object
    // but that doesn't mean we can cast to anything else or that
    // may happen with javascript
    expect(command.execute(null as unknown as string)).toStrictEqual({});
  });
});
