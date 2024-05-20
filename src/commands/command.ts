export type Command = {
  execute(str: string): Record<string, number>;
};
