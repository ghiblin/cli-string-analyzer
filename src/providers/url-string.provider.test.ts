// Note: this is the only test case using MSW, so we set it here.
// In case we are implementing other URL fetch, we should move it
// to Jest setup file
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { URLStringProvider } from "./url-string.provider";
const server = setupServer();

const LOREM = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  In tempus dictum nulla, non pellentesque nisi malesuada vitae.
  Duis ipsum nunc, laoreet ut felis eget, sodales dapibus augue.
`;

describe("URLStringProvider", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should fetch a remote file", async () => {
    // Arrange
    const url = "http://127.0.0.1/text.txt";
    server.use(
      http.get(url, () => {
        return HttpResponse.text(LOREM);
      })
    );
    const result = URLStringProvider.parse(url);
    expect(result.isOk()).toBe(true);
    const provider = result.unwrap();
    // Act

    const content = await provider.provide();

    // Assert
    expect(content.isOk()).toBe(true);
    expect(content.unwrap()).toBe(LOREM);
  });

  it("should fail if a wrong url is passed", () => {
    const urls = ["http", "/text.txt"];
    for (const url of urls) {
      const result = URLStringProvider.parse(url);
      expect(result.isErr()).toBe(true);
    }
  });

  it("should fail if file is not found", async () => {
    const url = "http://127.0.0.1/text.txt";
    server.use(
      http.get(url, () => {
        return new HttpResponse(null, { status: 404 });
      })
    );

    const result = URLStringProvider.parse(url);
    expect(result.isOk()).toBe(true);
    const provider = result.unwrap();
    // Act

    const content = await provider.provide();

    // Assert
    expect(content.isErr()).toBe(true);
  });
});
