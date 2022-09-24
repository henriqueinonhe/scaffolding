import { isServer } from "../utils/isServer";
import { getPublicConfig } from "./public";
import { getServerConfig } from "./server";

export const getConfig = async () => {
  const [publicConfig, serverConfig] = await Promise.all([
    getPublicConfig(),
    getServerConfig(),
  ]);

  return {
    public: publicConfig,
    get server() {
      if (!isServer) {
        throw Error(
          "You're not supposed to access server configs on the browser!"
        );
      }
      return serverConfig;
    },
  };
};
