import { GetConfig } from "./GetConfig";
import { GetPublicConfig } from "./getPublicConfig";

type Dependencies = {
  getPublicConfig: GetPublicConfig;
};

export const makeClientGetConfig = ({ getPublicConfig }: Dependencies) =>
  (async () => {
    const publicConfig = await getPublicConfig();

    return {
      public: publicConfig,
      get server() {
        // TODO Turn this into a HTML warning
        // so that this cannot be swallowed
        throw Error(
          "You're not supposed to access server configs on the browser!"
        );
      },
    };
  }) as unknown as GetConfig;
