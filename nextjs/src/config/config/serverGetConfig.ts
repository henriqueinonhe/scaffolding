import { GetPublicConfig } from "./getPublicConfig";
import { GetServerConfig } from "./getServerConfig";

type Dependencies = {
  getPublicConfig: GetPublicConfig;
  getServerConfig: GetServerConfig;
};

export const makeServerGetConfig =
  ({ getPublicConfig, getServerConfig }: Dependencies) =>
  async () => {
    const [publicConfig, serverConfig] = await Promise.all([
      getPublicConfig(),
      getServerConfig(),
    ]);

    return {
      public: publicConfig,
      server: serverConfig,
    };
  };
