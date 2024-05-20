import { resolve } from "path/posix";
import { PathStringProvider } from "./path-string.provider";

describe("PathStringProvider", () => {
  it("should fail for wrong paths", () => {
    const paths = [
      "../path/../my-file.txt",
      "././my-file.txt",
      "file.txt,another-file.txt",
    ];
    for (const path of paths) {
      const result = PathStringProvider.parse(path);
      expect(result.isErr()).toBe(true);
    }
  });

  it("should retrieve the content of the file", async () => {
    const result = PathStringProvider.parse(resolve(__dirname, "text.txt"));
    expect(result.isOk()).toBe(true);
    const provider = result.unwrap();
    const content = await provider.provide();
    expect(content.isOk()).toBe(true);
    expect(content.unwrap()).not.toBe("");
  });

  it("should return an error for a missing file", async () => {
    const result = PathStringProvider.parse(
      resolve(__dirname, "missing-file.txt")
    );
    expect(result.isOk()).toBe(true);
    const provider = result.unwrap();
    const content = await provider.provide();
    expect(content.isErr()).toBe(true);
  });
});
