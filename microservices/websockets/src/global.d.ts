export const {};

declare global {
  type AppRequest = Request & {
    userId: string;
  };
}
