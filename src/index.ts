import figlet from "figlet";
import { Command } from "commander";
import { Engine } from "./engine";
import { p } from "msw/lib/core/GraphQLHandler-COiPfZ8k";

const program = new Command();

// Using some ASCII Art
console.log(figlet.textSync("CLI Script"));

program
  .version("1.0.0")
  .description("A smal CLI to fetch a file and parse it")
  .requiredOption(
    "-a, --address <value>",
    "The address of the file to retrieve. It can be a path or an URL"
  )
  .parse(process.argv);

async function parseFile(address: string) {
  const result = await Engine.init(address);
  if (result.isErr()) {
    console.error(result.getErr().message);
    return;
  }

  const engine = result.unwrap();
  engine.compute();
}

async function main() {
  const options = program.opts();
  if (options.address) {
    await parseFile(options.address as string);
  }
}
main();
