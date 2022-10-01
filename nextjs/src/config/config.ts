import { GetPublicConfig } from "./public";
import { GetServerConfig } from "./server";

type Dependencies = {
  isServer: boolean;
  getPublicConfig: GetPublicConfig;
  getServerConfig: GetServerConfig;
};

export const makeGetConfig =
  ({ isServer, getPublicConfig, getServerConfig }: Dependencies) =>
  async () => {
    const [publicConfig, serverConfig] = await Promise.all([
      getPublicConfig(),
      getServerConfig(),
    ]);

    return {
      public: publicConfig,
      get server() {
        if (!isServer) {
          // TODO Turn this into a HTML warning
          // so that this cannot be swallowed
          throw Error(
            "You're not supposed to access server configs on the browser!"
          );
        }

        return serverConfig;
      },
    };
  };

export type GetConfig = ReturnType<typeof makeGetConfig>;
