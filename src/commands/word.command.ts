import { Command } from "./command";

export class WordCommand implements Command {
  // Set the min bound
  constructor(private readonly min: number) {}

  execute(str: string): Record<string, number> {
    if (typeof str !== "string") return {};

    // Compute a dictionary with all the occurrency of a word
    const dict = str
      // ignore case
      .toLowerCase()
      .split(/[\s]/)
      // remove empty token
      .filter((token) => !!token)
      // count each word
      .reduce((acc, el) => {
        if (acc.hasOwnProperty(el)) {
          acc[el] += 1;
        } else {
          acc = {
            ...acc,
            [el]: 1,
          };
        }
        return acc;
      }, {} as Record<string, number>);

    // filter the word appearing less the 10 times
    return Object.entries(dict)
      .filter(([_, count]) => count > this.min)
      .reduce(
        (acc, [word, count]) => ({
          ...acc,
          [word]: count,
        }),
        {}
      );
  }
}
