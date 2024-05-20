import { z } from "zod";
import { Result } from "../utils/result";
import { StringProvider } from "./string.provider";
import { join, resolve } from "path";
import { readFile } from "fs/promises";

const schema = z
  .string()
  .regex(/^(?:\.\/|(?:\.\.\/)+|\/)?(?:[a-zA-Z-_]+\/)*\w[a-zA-Z-_\.]*$/);

export class PathStringProvider implements StringProvider {
  private constructor(private readonly path: string) {}

  static parse(path: string) {
    const check = schema.safeParse(path);
    const result = check.success
      ? new Result(new PathStringProvider(path), null)
      : new Result<PathStringProvider, Error>(
          null,
          new Error(check.error.message)
        );
    return result;
  }

  async provide(): Promise<Result<string, Error>> {
    try {
      let filepath = resolve(this.path);
      const content = await readFile(filepath, { encoding: "utf-8" });
      return new Result<string, Error>(content, null);
    } catch (error) {
      console.error(`failed to retrieve ${this.path}: ${error}`);
      return new Result<string, Error>(null, error as Error);
    }
  }
}
