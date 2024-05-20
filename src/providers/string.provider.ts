import { Result } from "../utils/result";

export type StringProvider = {
  provide(): Promise<Result<string, Error>>;
};
