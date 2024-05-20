import { z } from "zod";
import { Result } from "../utils/result";
import { StringProvider } from "./string.provider";
import axios from "axios";

const schema = z.string().url();

export class URLStringProvider implements StringProvider {
  private constructor(private readonly url: string) {}

  static parse(url: string): Result<URLStringProvider, Error> {
    const check = schema.safeParse(url);
    let result: Result<URLStringProvider, Error> = check.success
      ? new Result(new URLStringProvider(url), null)
      : new Result<URLStringProvider, Error>(null, Error(check.error.message));
    return result;
  }

  async provide(): Promise<Result<string, Error>> {
    try {
      const response = await axios.get<string>(this.url, {
        responseType: "text",
      });
      const content = await response.data;
      return new Result<string, Error>(content, null);
    } catch (error) {
      return new Result<string, Error>(null, error as Error);
    }
  }
}
