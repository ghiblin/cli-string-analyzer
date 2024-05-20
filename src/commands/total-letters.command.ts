import { Command } from "./command";

export class TotalLettersCommand implements Command {
  execute(str: string): Record<string, number> {
    if (typeof str !== "string") return {};
    const count = str
      // Remove all the separators
      .replace(/[\s]/g, "")
      // remove all non-word characters
      .replace(/[\W]/g, "").length;
    return { letter: count };
  }
}
