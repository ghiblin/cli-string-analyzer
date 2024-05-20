import { shuffle } from "../utils/shuffle";
import { Command } from "./command";
import { WordCommand } from "./word.command";

function generateArrayWithWord(word: string, count: number): string[] {
  return new Array(count).fill(null).map(() => word);
}

function generareString(
  input: Record<string, number>,
  separator = " "
): string {
  const words = Object.entries(input).flatMap(([word, count]) =>
    generateArrayWithWord(word, count)
  );
  return shuffle(words).join(" ");
}

describe("WordCommand", () => {
  let command: Command;
  beforeEach(() => {
    command = new WordCommand(10);
  });

  it("returns all the words that appear more then minimum times", () => {
    const inputs = [
      {
        input: generateArrayWithWord("world", 10).join(" "),
        expected: {},
      },
      {
        input: generateArrayWithWord("world", 11).join(" "),
        expected: { world: 11 },
      },
    ];
    for (const { input, expected } of inputs) {
      expect(command.execute(input)).toEqual(expected);
    }
  });

  it("ignores the case", () => {
    const inputs = [
      {
        input: generareString({ word: 5, Word: 5 }),
        expected: {},
      },
      {
        input: generareString({ word: 3, Word: 3, woRd: 3, worD: 3 }),
        expected: { word: 12 },
      },
    ];
    for (const { input, expected } of inputs) {
      expect(command.execute(input)).toEqual(expected);
    }
  });

  it("handles multiple words", () => {
    const inputs = [
      {
        input: generareString({ hello: 12, world: 13 }),
        expected: { hello: 12, world: 13 },
      },
    ];
    for (const { input, expected } of inputs) {
      expect(command.execute(input)).toEqual(expected);
    }
  });

  it("handles puntuaction", () => {
    const inputs = [
      {
        input: generareString({ hello: 12, world: 13 }, ","),
        expected: { hello: 12, world: 13 },
      },
    ];
    for (const { input, expected } of inputs) {
      expect(command.execute(input)).toEqual(expected);
    }
  });

  it("handles empty string", () => {
    expect(command.execute("")).toEqual({});
  });

  it("handles not string", () => {
    // Note: typescript prevent us from passing a non-string object
    // but that doesn't mean we can cast to anything else or that
    // may happen with javascript
    expect(command.execute(null as unknown as string)).toStrictEqual({});
  });
});
