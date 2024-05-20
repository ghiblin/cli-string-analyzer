import { Command } from "./commands/command";
import { TotalLettersCommand } from "./commands/total-letters.command";
import { TotalSpacesCommand } from "./commands/total-spaces.command";
import { TotalWordsCommand } from "./commands/total-words.command";
import { WordCommand } from "./commands/word.command";
import { PathStringProvider } from "./providers/path-string.provider";
import { StringProvider } from "./providers/string.provider";
import { URLStringProvider } from "./providers/url-string.provider";
import { Nullable } from "./utils/nullable";
import { Result } from "./utils/result";

export class Engine {
  private constructor(private readonly provider: StringProvider) {}

  static init(address: string): Result<Engine, Error> {
    console.log(`address: ${address}`);
    let results: Result<StringProvider, Error>[] = [
      URLStringProvider.parse(address),
      PathStringProvider.parse(address),
    ].filter((r) => r.isOk());

    if (!results.length) {
      // Invalid address
      return new Result<Engine, Error>(null, new Error("Invalid address"));
    }

    return new Result<Engine, Error>(new Engine(results[0].unwrap()), null);
  }

  async compute(): Promise<Result<boolean, Error>> {
    const content = await this.provider.provide();
    if (content.isErr()) {
      console.error(content.getErr().message);
      return new Result<boolean, Error>(
        null,
        new Error("Failed to retrieve content")
      );
    }

    const text = content.unwrap();
    console.log(
      "Total words count:",
      new TotalWordsCommand().execute(text)["*"]
    );
    console.log(
      "Total letters in file:",
      new TotalLettersCommand().execute(text)["letter"]
    );
    console.log(
      "Total spaces in file:",
      new TotalSpacesCommand().execute(text)[" "]
    );
    const dict = new WordCommand(10).execute(text);
    console.log("Words with more then 10 occurances:");
    Object.entries(dict).forEach(([word, count]) => {
      console.log(`- ${word}: ${count}`);
    });

    return new Result<boolean, Error>(true, null);
  }
}
