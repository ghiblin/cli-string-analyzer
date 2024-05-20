import { Command } from "./command";

export class TotalSpacesCommand implements Command {
  execute(str: string): Record<string, number> {
    if (typeof str !== "string") return {};
    const count = str.replace(/[^ ]/g, "").length;
    return {
      " ": count,
    };
  }
}
