import { Command } from "./command";

export class TotalWordsCommand implements Command {
  execute(str: string): Record<string, number> {
    // typecheck input value
    if (typeof str !== "string") return {};
    // We handle any delimiter and remove empty tokens
    const count = str.split(/[\s]/).filter((token) => !!token).length;
    return { "*": count };
  }
}
