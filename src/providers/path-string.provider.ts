import { z } from "zod";
import { Result } from "../utils/result";
import { StringProvider } from "./string.provider";
import { join, resolve } from "path";
import { readFile } from "fs/promises";

const schema = z
  .string()
  .regex(/^(?:\.\/|(?:\.\.\/)+|\/)?(?:\w+\/)*\w[a-zA-Z-_\.]*$/);

export class PathStringProvider implements StringProvider {
  private constructor(private readonly path: string) {}

  static parse(path: string) {
    const check = schema.safeParse(path);
    return check.success
      ? new Result(new PathStringProvider(path), null)
      : new Result<PathStringProvider, Error>(
          null,
          new Error(check.error.message)
        );
  }

  async provide(): Promise<Result<string, Error>> {
    try {
      let filepath = this.path.startsWith("/")
        ? // it's an absolute path
          this.path
        : resolve(join(__dirname, this.path));
      const content = await readFile(filepath, { encoding: "utf-8" });
      return new Result<string, Error>(content, null);
    } catch (error) {
      console.error(`failed to retrieve ${this.path}: ${error}`);
      return new Result<string, Error>(null, error as Error);
    }
  }
}
