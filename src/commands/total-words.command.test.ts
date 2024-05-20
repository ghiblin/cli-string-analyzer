import { Command } from "./command";
import { TotalWordsCommand } from "./total-words.command";

describe("TotalWordsCommand", () => {
  let command: Command;
  beforeEach(() => {
    command = new TotalWordsCommand();
  });

  it("returns the total words in the string", () => {
    const inputs = [
      {
        input: "hello world",
        count: 2,
      },
      {
        input:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis ultricies mattis. Etiam sollicitudin quam id gravida fringilla. Maecenas in pulvinar arcu. Curabitur vel molestie ipsum, et volutpat metus. Ut tincidunt arcu sed augue dignissim, sed maximus neque tincidunt. Cras feugiat diam felis, sit amet suscipit nunc viverra a. Praesent ac fermentum neque. Nullam eu nisi dui. Suspendisse et neque ante. Vestibulum semper ex tellus, laoreet laoreet lectus malesuada non.",
        count: 70,
      },
    ];
    for (let { input, count } of inputs) {
      expect(command.execute(input)["*"]).toBe(count);
    }
  });

  it("handles line feed between words", () => {
    const inputs = [
      {
        input: "hello\nworld",
        count: 2,
      },
      {
        input: `
      this is a multiline
      string
      `,
        count: 5,
      },
    ];
    for (let { input, count } of inputs) {
      expect(command.execute(input)["*"]).toBe(count);
    }
  });

  it("handles empty string", () => {
    expect(command.execute("")["*"]).toBe(0);
  });

  it("handles not string", () => {
    // Note: typescript prevent us from passing a non-string object
    // but that doesn't mean we can cast to anything else or that
    // may happen with javascript
    expect(command.execute(null as unknown as string)).toStrictEqual({});
  });
});
