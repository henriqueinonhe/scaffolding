import { isServer } from "utils/isServer";
import { createContainer } from "./container";

const defaultContainer = createContainer({
  isServer,
});

export const { getConfig } = defaultContainer;
export { createContainer };

// Types

export type { GetConfig } from "./config";
export * from "./types";
