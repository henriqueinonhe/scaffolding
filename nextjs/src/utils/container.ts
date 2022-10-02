import { isServer } from "./isServer";

export const make = () => {
  return {
    isServer,
  };
};

export type Container = ReturnType<typeof make>;
